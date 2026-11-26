import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import TaskCard from './TaskCard';
import './Column.css';

const Indicator = () => <div className="drop-indicator" />;

function Column({ column, canDelete, drag, onAdd, onEdit }) {
  const { dispatch } = useWorkspace();
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(column.title);
  const [confirming, setConfirming] = useState(false);

  const isDone = column.title.trim().toLowerCase() === 'done';
  const over = drag.target && drag.target.columnId === column.id;

  const saveName = () => {
    const t = name.trim();
    if (t && t !== column.title) dispatch({ type: 'RENAME_COLUMN', columnId: column.id, title: t });
    else setName(column.title);
    setRenaming(false);
  };

  return (
    <section
      className={`column ${over ? 'over' : ''}`}
      aria-label={column.title}
      onDragOver={(e) => drag.onDragOver(e, column.id)}
      onDrop={(e) => drag.onDrop(e, column.id)}
    >
      <header className="column-header">
        <span className="column-dot" style={{ background: column.color }} />
        {renaming ? (
          <input
            className="rename-input"
            autoFocus
            value={name}
            aria-label="Column name"
            onChange={(e) => setName(e.target.value)}
            onBlur={saveName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveName();
              if (e.key === 'Escape') { setName(column.title); setRenaming(false); }
            }}
          />
        ) : (
          <h2>{column.title}</h2>
        )}
        <span className="column-count">{column.tasks.length}</span>
        {confirming ? (
          <span className="confirm-inline">
            Delete?
            <button onClick={() => dispatch({ type: 'DELETE_COLUMN', columnId: column.id })}>Yes</button>
            <button onClick={() => setConfirming(false)}>No</button>
          </span>
        ) : (
          <span className="column-actions">
            <button className="icon-btn" aria-label="Rename column" onClick={() => setRenaming(true)}>✎</button>
            {canDelete && <button className="icon-btn" aria-label="Delete column" onClick={() => setConfirming(true)}>×</button>}
            <button className="icon-btn" aria-label="Add task to this column" onClick={() => onAdd(column.id)}>+</button>
          </span>
        )}
      </header>
      {confirming && <p className="confirm-note">Its tasks move to the first remaining column.</p>}

      <div className="task-list">
        {column.tasks.map((task) => (
          <div key={task.id} className="task-slot">
            {over && drag.target.beforeId === task.id && <Indicator />}
            <TaskCard
              task={task}
              isDone={isDone}
              isDragging={drag.dragId === task.id}
              onEdit={(t) => onEdit(t, column.id)}
              onDragStart={drag.onDragStart}
              onDragEnd={drag.onDragEnd}
            />
          </div>
        ))}
        {over && drag.target.beforeId === null && <Indicator />}
        {column.tasks.length === 0 && !over && <p className="empty-column">No tasks yet</p>}
      </div>
      <button className="add-task-inline" onClick={() => onAdd(column.id)}>+ Add a task</button>
    </section>
  );
}

export default Column;
