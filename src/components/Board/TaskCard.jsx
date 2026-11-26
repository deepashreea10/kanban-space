import { formatDate } from '../../utils/dates';
import { todayISO } from '../../utils/dates';
import './TaskCard.css';

// Presentation only: data and handlers all come from props.
function TaskCard({ task, isDone, isDragging, onEdit, onDragStart, onDragEnd }) {
  const subs = task.subtasks || [];
  const doneCount = subs.filter((s) => s.completed).length;
  const overdue = task.dueDate && task.dueDate < todayISO() && !isDone;

  return (
    <article
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      data-task-id={task.id}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
    >
      <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      <h3>
        <button className="task-title-btn" onClick={() => onEdit(task)}>{task.title}</button>
      </h3>
      {task.description && <p>{task.description}</p>}
      {subs.length > 0 && (
        <div className="subtask-meter">
          <span>☑ {doneCount}/{subs.length} subtasks</span>
          <div className="meter-track"><div style={{ width: `${(doneCount / subs.length) * 100}%` }} /></div>
        </div>
      )}
      <div className="task-footer">
        <span className="task-tag">{task.tag}</span>
        {task.dueDate && (
          <span className={`due ${overdue ? 'overdue' : ''}`}>
            {formatDate(task.dueDate)}{overdue ? ' · Overdue' : ''}
          </span>
        )}
      </div>
    </article>
  );
}

export default TaskCard;
