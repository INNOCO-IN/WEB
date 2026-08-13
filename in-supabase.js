/* IN — Supabase connection.
   Live tables in this project: submissions, stories, workshops,
   workshop_registrations, staff_emails. Anon INSERT policies exist on
   submissions, stories and workshop_registrations.                        */

window.IN_SUPABASE = {
  url: "https://kuwqaajqvwyzygxkiwab.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1d3FhYWpxdnd5enlneGtpd2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4Nzg4MzIsImV4cCI6MjEwMDQ1NDgzMn0.9TbQZtl8wcVnFWNQTM4t6WSu5SK68Hi2iSfgnRssLp8"
};

window.INSubmit = async function (table, row) {
  var cfg = window.IN_SUPABASE || {};
  if (!cfg.url || !cfg.anonKey) throw new Error("Supabase is not configured yet (in-supabase.js).");
  var res = await fetch(cfg.url.replace(/\/$/, "") + "/rest/v1/" + table, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: cfg.anonKey,
      Authorization: "Bearer " + cfg.anonKey,
      Prefer: "return=minimal"
    },
    body: JSON.stringify(row)
  });
  if (!res.ok) throw new Error((await res.text()) || ("Request failed: " + res.status));
  return true;
};
