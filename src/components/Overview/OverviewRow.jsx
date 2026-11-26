import { useBoardStats } from '../../hooks/useBoardStats';
import './OverviewRow.css';

function OverviewRow() {
  const { allTasks, completed, progress } = useBoardStats();
  return (
    <div className="overview-row">
      <div className="overview-item"><span>Total tasks</span><strong>{allTasks.length}</strong></div>
      <div className="overview-item"><span>Completed</span><strong>{completed}</strong></div>
      <div className="overview-item">
        <span>Progress</span><strong>{progress}%</strong>
        <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export default OverviewRow;
