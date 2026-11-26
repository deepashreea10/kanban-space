import { useState } from 'react';
import { useUI } from '../../hooks/useUI';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useExport } from '../../hooks/useExport';
import './TopActions.css';

function TopActions() {
  const ui = useUI();
  const { columns } = useWorkspace();
  const { exportJSON, exportCSV } = useExport();
  const [menuOpen, setMenuOpen] = useState(false);
  const pick = (fn) => () => { setMenuOpen(false); fn(); };

  return (
    <div className="top-actions">
      <button className="top-btn" onClick={() => ui.setPaletteOpen(true)} title="Command palette (Ctrl+K)">⌘ Commands</button>
      <div className="data-menu-wrap">
        <button className="top-btn" aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>⇩ Data</button>
        {menuOpen && (
          <>
            <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
            <div className="data-menu" role="menu">
              <button role="menuitem" onClick={pick(exportJSON)}>Export workspace (JSON)</button>
              <button role="menuitem" onClick={pick(exportCSV)}>Export tasks (CSV)</button>
              <button role="menuitem" onClick={pick(() => ui.importRef.current?.click())}>Import workspace (JSON)</button>
            </div>
          </>
        )}
      </div>
      <button className="top-btn" aria-label="Keyboard shortcuts" title="Keyboard shortcuts (?)" onClick={() => ui.setHelpOpen(true)}>?</button>
      <button className="btn-primary" onClick={() => ui.openTask(columns[0]?.id)}>+ New task</button>
    </div>
  );
}

export default TopActions;
