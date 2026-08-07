/* IN Website — live "Just shared" feed.
   Reads published rows from the Supabase `stories` table and keeps the list
   current in real time via Supabase Realtime (Postgres Changes) — a story a
   neighbor just shared (and that's been approved) appears on this page
   without anyone refreshing.

   Requires, in this order, before this script:
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
     <script src="./supabase-config.js"></script>

   Mount point:
     <div data-in-feed="stories" data-in-feed-limit="9"></div>

   Realtime only pushes rows once the `stories` table is added to the
   `supabase_realtime` publication — see the bottom of schema.sql.

   The design-component runtime loads React/Babel from a CDN and mounts its
   tree asynchronously, which can replace this section's DOM (including our
   mount point, with whatever static placeholder was in the source template)
   *after* this script has already painted into it — the same race
   `in-supabase.js` guards against for form wiring. So: fetch/subscribe run
   exactly once (guarded by `state.started`), and a MutationObserver repaints
   the current in-memory state into the mount point every time the page's
   structure changes, however many times that happens.
*/
(function () {
  // The design-component runtime's <helmet> handling re-inserts (clones) the
  // script tags found there into the real document head, so this file's own
  // <script src> can execute more than once — each execution would otherwise
  // build an independent module closure with its own Supabase client and its
  // own MutationObserver, all fighting over the same mount node. Guard with
  // a flag on window so only the first execution does anything.
  if (window.__inStoriesFeedLoaded) return;
  window.__inStoriesFeedLoaded = true;

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fmtWhen(iso) {
    var d = new Date(iso), diff = (Date.now() - d.getTime()) / 1000;
    if (!isFinite(diff)) return '';
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  function emptyState(msg) {
    return '<p style="font-family:\'Newsreader\',serif; font-size:16px; color:rgba(250,244,226,0.55); padding:20px 2px; grid-column: 1 / -1;">' + escapeHtml(msg) + '</p>';
  }

  function card(row) {
    var who = row.credit_name || 'Anonymous';
    var tags = (row.format || []).join(' · ');
    var body = (row.body || '').trim();
    if (body.length > 220) body = body.slice(0, 220).replace(/\s+\S*$/, '') + '…';
    var att = row.attachment_url
      ? '<a href="' + row.attachment_url + '" target="_blank" rel="noopener" style="font-family:\'Archivo\',sans-serif; font-weight:700; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#7BC4F0; text-decoration:none;">View attachment →</a>'
      : '';
    return '<div data-story-id="' + escapeHtml(row.id) + '" style="background:#1E2F38; color:#FAF4E2; padding:22px 24px; display:flex; flex-direction:column; gap:10px; animation: in-fade-in .5s ease;">'
      + '<div style="display:flex; justify-content:space-between; gap:10px; font-family:\'Archivo\',sans-serif; font-weight:700; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(250,244,226,0.55);"><span>' + escapeHtml(tags || 'Story') + '</span><span>' + escapeHtml(fmtWhen(row.created_at)) + '</span></div>'
      + '<p style="font-family:\'Newsreader\',serif; font-size:17px; line-height:1.5; margin:0; color:#FAF4E2;">' + escapeHtml(body) + '</p>'
      + '<div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;"><span style="font-family:\'Newsreader\',serif; font-size:14px; color:rgba(250,244,226,0.6);">— ' + escapeHtml(who) + '</span>' + att + '</div>'
      + '</div>';
  }

  var state = { rows: null, sb: null, limit: 9, error: null, started: false, version: 0 };

  function paintOne(el) {
    // Painting writes to innerHTML, which is itself a DOM mutation the
    // MutationObserver below is watching for (to survive the framework's own
    // re-renders) — without this version-stamp guard, paint → mutation →
    // repaint would loop forever. Skip any mount that already shows the
    // current state.
    var v = String(state.version);
    if (el.getAttribute('data-in-feed-version') === v) return;
    el.setAttribute('data-in-feed-version', v);
    if (state.error) { el.innerHTML = emptyState(state.error); return; }
    if (state.rows === null) { el.innerHTML = emptyState('Loading…'); return; }
    el.innerHTML = state.rows.length ? state.rows.map(card).join('') : emptyState('Nothing shared yet — be the first to add your light.');
  }

  function paintAll() {
    document.querySelectorAll('[data-in-feed="stories"]').forEach(paintOne);
  }

  function refresh() {
    state.sb.from('stories')
      .select('id,created_at,body,format,credit_name,attachment_url')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(state.limit)
      .then(function (res) {
        if (res.error) { setState({ error: 'Could not load stories right now.' }); return; }
        setState({ rows: res.data || [], error: null });
      })
      .catch(function () {
        setState({ error: 'Could not load stories right now.' });
      });
  }

  function setState(patch) {
    Object.keys(patch).forEach(function (k) { state[k] = patch[k]; });
    state.version++;
    paintAll();
  }

  function start(limit) {
    if (state.started) return;
    state.started = true;
    state.limit = limit;

    var CFG = window.IN_SUPABASE || {};
    if (!CFG.url || !CFG.anonKey || !window.supabase) {
      setState({ error: 'Live feed unavailable right now.' });
      return;
    }

    state.sb = window.supabase.createClient(CFG.url, CFG.anonKey);
    refresh();

    // Live: any row landing (or edited into) status=published pushes onto
    // the feed immediately, without a page reload.
    state.sb.channel('public:stories-published-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stories' }, function (payload) {
        var row = payload.new;
        if (!row || row.status !== 'published') return;
        setState({ rows: [row].concat((state.rows || []).filter(function (r) { return r.id !== row.id; })).slice(0, state.limit) });
      })
      .subscribe();
  }

  function boot() {
    var mounts = document.querySelectorAll('[data-in-feed="stories"]');
    if (!mounts.length) return;
    start(parseInt(mounts[0].getAttribute('data-in-feed-limit') || '9', 10));
    paintAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  new MutationObserver(boot).observe(document.documentElement, { childList: true, subtree: true });
})();
