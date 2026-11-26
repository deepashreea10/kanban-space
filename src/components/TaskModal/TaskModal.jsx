import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from '../Modal/Modal';
import './TaskModal.css';

const PRIORITIES = ['Urgent', 'High', 'Medium', 'Low'];

// Everything is edited in a local draft and saved together on submit.
function TaskModal({ task, columnId, onClose }) {
  const { columns, dispatch } = useWorkspace();
  const editing = Boolean(task);
  const [draft, setDraft] = useState(() => ({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'Medium',
    tag: task?.tag || '',
    dueDate: task?.dueDate || '',
    subtasks: task?.subtasks || [],
  }));
  const [col, setCol] = useState(columnId);
  const [sub, setSub] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = (key) => (e) => setDraft((d) => ({ ...d, [key]: e.target.value }));
  const setSubs = (fn) => setDraft((d) => ({ ...d, subtasks: fn(d.subtasks) }));

  const addSub = () => {
    if (!sub.trim()) return;
    setSubs((s) => [...s, { id: `sub-${Date.now()}`, title: sub.trim(), completed: false }]);
    setSub('');
  };

  const save = (e) => {
    e.preventDefault();
    const title = draft.title.trim();
    if (!title) return;
    const data = { ...draft, title, description: draft.description.trim(), tag: draft.tag.trim() || 'General' };
    if (editing) {
      dispatch({ type: 'UPDATE_TASK', task: { id: task.id, ...data } });
      if (col !== columnId) dispatch({ type: 'MOVE_TASK', taskId: task.id, toColumnId: col, beforeId: null });
    } else {
      dispatch({ type: 'ADD_TASK', columnId: col, task: data });
    }
    onClose();
  };

  const remove = () => {
    dispatch({ type: 'DELETE_TASK', taskId: task.id });
    onClose();
  };

  return (
    <Modal title={editing ? 'Edit task' : 'New task'} onClose={onClose}>
      <form className="task-form" onSubmit={save}>
        <label>Title
          <input autoFocus required value={draft.title} onChange={set('title')} />
        </label>
        <label>Description
          <textarea rows="3" value={draft.description} onChange={set('description')} />
        </label>
        <div className="form-row">
          <label>Priority
            <select value={draft.priority} onChange={set('priority')}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label>Column
            <select value={col} onChange={(e) => setCol(e.target.value)}>
              {columns.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>Tag
            <input value={draft.tag} onChange={set('tag')} placeholder="General" />
          </label>
          <label>Due date
            <input type="date" value={draft.dueDate} onChange={set('dueDate')} />
          </label>
        </div>

        <fieldset className="subtasks">
          <legend>Subtasks</legend>
          {draft.subtasks.map((s) => (
            <div className="subtask" key={s.id}>
              <label>
                <input
                  type="checkbox"
                  checked={s.completed}
                  onChange={() => setSubs((list) => list.map((x) => (x.id === s.id ? { ...x, completed: !x.completed } : x)))}
                />
                <span className={s.completed ? 'done' : ''}>{s.title}</span>
              </label>
              <button type="button" className="icon-btn" aria-label={`Remove ${s.title}`} onClick={() => setSubs((list) => list.filter((x) => x.id !== s.id))}>×</button>
            </div>
          ))}
          <div className="subtask-add">
            <input
              value={sub}
              placeholder="Add a subtask"
              aria-label="New subtask"
              onChange={(e) => setSub(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSub(); } }}
            />
            <button type="button" onClick={addSub}>Add</button>
          </div>
        </fieldset>

        <div className="form-actions">
          {editing && (
            confirmDelete ? (
              <button type="button" className="danger" onClick={remove}>Confirm delete</button>
            ) : (
              <button type="button" className="danger-ghost" onClick={() => setConfirmDelete(true)}>Delete task</button>
            )
          )}
          <button type="button" className="ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary">{editing ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskModal;
