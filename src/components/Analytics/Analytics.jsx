import { useBoardStats } from '../../hooks/useBoardStats';
import { formatDate } from '../../utils/dates';
import BarList from './BarList';
import StatCard from './StatCard';
import './Analytics.css';

function Analytics() {
  const s = useBoardStats();
  if (s.allTasks.length === 0) {
    return <p className="analytics-empty-state">Add tasks to this board to see analytics.</p>;
  }
  return (
    <div className="analytics">
      <div className="stat-grid">
        <StatCard label="Open tasks" value={s.openCount} />
        <StatCard label="Overdue" value={s.overdue} tone={s.overdue ? 'bad' : ''} />
        <StatCard label="Due in 7 days" value={s.dueSoon} />
        <StatCard label="Subtasks done" value={`${s.subtaskDone}/${s.subtaskTotal}`} />
      </div>
      <div className="analytics-grid">
        <section className="panel"><h3>Tasks by column</h3><BarList rows={s.columnRows} emptyText="No columns." /></section>
        <section className="panel"><h3>Tasks by priority</h3><BarList rows={s.priorityRows} emptyText="No tasks." /></section>
        <section className="panel"><h3>Tasks by tag</h3><BarList rows={s.tagRows} emptyText="No tags yet." /></section>
        <section className="panel">
          <h3>Upcoming deadlines</h3>
          {s.upcoming.length === 0 ? (
            <p className="analytics-empty">No open tasks have a due date.</p>
          ) : (
            <ul className="upcoming">
              {s.upcoming.map((t) => (
                <li key={t.id}><span>{t.title}</span><time dateTime={t.dueDate}>{formatDate(t.dueDate)}</time></li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default Analytics;
