import { useId, useState } from 'react';

interface FileInputProps {
  accept?: string;
  onFileSelect: (file: File | null) => void;
  placeholder?: string;
}

export function FileInput({ accept, onFileSelect, placeholder }: FileInputProps) {
  const id = useId();
  const [label, setLabel] = useState(placeholder ?? 'Click to choose a file.');

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          minHeight: 160,
          border: 'var(--border-width) dashed var(--color-ink-20)',
          background: 'var(--surface-page-dim)',
          cursor: 'pointer',
          font: 'var(--text-body)',
          color: 'var(--text-muted)',
          padding: 'var(--space-4)',
        }}
      >
        <span>{label}</span>
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setLabel(file ? `Attached: ${file.name}` : (placeholder ?? 'Click to choose a file.'));
          onFileSelect(file);
        }}
      />
    </div>
  );
}
