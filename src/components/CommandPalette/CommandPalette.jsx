import { useEffect, useState } from 'react';
import { useUI } from '../../hooks/useUI';
import { useCommands } from '../../hooks/useCommands';
import './CommandPalette.css';

// Inner part mounts fresh on every open, so the query always starts empty.
function Palette({ theme, toggleTheme, onClose }) {
  const commands = useCommands({ theme, toggleTheme });
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);

  const list = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));
  const safe = Math.min(index, Math.max(list.length - 1, 0));
  const run = (c) => { onClose(); c.run(); };

  useEffect(() => {
    document.getElementById(`cmd-${safe}`)?.scrollIntoView({ block: 'nearest' });
  }, [safe]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(Math.min(safe + 1, list.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(Math.max(safe - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (list[safe]) run(list[safe]); }
    else if (e.key === 'Escape') onClose();
  };

  return (
    <div className="modal-backdrop palette-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          autoFocus
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={list[safe] ? `cmd-${safe}` : undefined}
          value={query}
          placeholder="Type a command…"
          onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
          onKeyDown={onKeyDown}
        />
        <ul id="palette-list" role="listbox">
          {list.length === 0 && <li className="palette-empty">No matching commands</li>}
          {list.map((c, i) => (
            <li key={c.id} id={`cmd-${i}`} role="option" aria-selected={i === safe} className={i === safe ? 'active' : ''} onMouseEnter={() => setIndex(i)} onClick={() => run(c)}>
              <span>{c.label}</span>
              {c.hint && <kbd>{c.hint}</kbd>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CommandPalette({ theme, toggleTheme }) {
  const { paletteOpen, setPaletteOpen } = useUI();
  if (!paletteOpen) return null;
  return <Palette theme={theme} toggleTheme={toggleTheme} onClose={() => setPaletteOpen(false)} />;
}

export default CommandPalette;
