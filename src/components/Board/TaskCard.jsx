import { formatDate } from '../../utils/dates';

// Pure presentation: everything arrives through props.
function TaskCard({ task }) {
  return (
    <article className="task-card" data-task-id={task.id}>
      <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="task-footer">
        <span className="task-tag">{task.tag}</span>
        {task.dueDate && <span className="due">{formatDate(task.dueDate)}</span>}
      </div>
    </article>
  );
}

export default TaskCard;
