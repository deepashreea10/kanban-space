import TaskCard from './TaskCard';

function Column({ column }) {
  return (
    <section className="column" aria-label={column.title}>
      <header className="column-header">
        <span className="column-dot" style={{ background: column.color }} />
        <h2>{column.title}</h2>
        <span className="column-count">{column.tasks.length}</span>
      </header>
      <div className="task-list">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {column.tasks.length === 0 && <p className="empty-column">No tasks yet</p>}
      </div>
    </section>
  );
}

export default Column;
