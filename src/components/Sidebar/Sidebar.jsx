import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Sidebar.css';

function Sidebar({ theme, onToggleTheme }) {
  const { state, dispatch } = useWorkspace();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch({ type: 'ADD_BOARD', name: name.trim() });
    setName('');
    setAdding(false);
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">K</span>
        kanban<span className="brand-light">space</span>
      </div>
      <div className="nav-heading">
        <span>Your boards</span>
        <button className="icon-btn" aria-label="Add board" onClick={() => setAdding(!adding)}>+</button>
      </div>
      {adding && (
        <form className="board-create" onSubmit={submit}>
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Board name" aria-label="New board name" />
          <button type="submit">Add</button>
        </form>
      )}
      <nav aria-label="Boards">
        {state.boards.map((b) => (
          <button
            key={b.id}
            className={`board-link ${b.id === state.activeBoard ? 'active' : ''}`}
            aria-current={b.id === state.activeBoard ? 'page' : undefined}
            onClick={() => dispatch({ type: 'SET_ACTIVE_BOARD', boardId: b.id })}
          >
            <span aria-hidden="true">{b.icon}</span>
            {b.name}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </aside>
  );
}

export default Sidebar;
