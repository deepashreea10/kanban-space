import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './MobileSidebar.css';

function MobileSidebar({ theme, onToggleTheme }) {
  const { state, dispatch } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch({ type: 'ADD_BOARD', name: name.trim() });
    setName('');
    setAdding(false);
    setOpen(false);
  };

  const switchBoard = (id) => {
    dispatch({ type: 'SET_ACTIVE_BOARD', boardId: id });
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger button — sits inside MobileBoard's topbar via AppShell */}
      <button className="hamburger" aria-label="Open boards" onClick={() => setOpen(true)}>☰</button>

      {open && (
        <>
          <div className="drawer-overlay" onClick={() => setOpen(false)} />
          <div className="drawer" role="dialog" aria-modal="true" aria-label="Boards">
            <div className="drawer-head">
              <span className="brand">kanban<span className="brand-light">space</span></span>
              <button className="icon-btn" aria-label="Close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="nav-heading">
              <span>Your boards</span>
              <button className="icon-btn" onClick={() => setAdding(!adding)}>+</button>
            </div>
            {adding && (
              <form className="board-create" onSubmit={submit}>
                <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Board name" />
                <button type="submit">Add</button>
              </form>
            )}
            <nav>
              {state.boards.map((b) => (
                <button
                  key={b.id}
                  className={`board-link ${b.id === state.activeBoard ? 'active' : ''}`}
                  onClick={() => switchBoard(b.id)}
                >
                  <span>{b.icon}</span>{b.name}
                </button>
              ))}
            </nav>
            <div className="drawer-bottom">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MobileSidebar;
