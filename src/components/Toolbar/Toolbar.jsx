import { useUI } from '../../hooks/useUI';
import { useBoardStats } from '../../hooks/useBoardStats';
import { PRIORITIES } from '../../utils/constants';
import './Toolbar.css';

function Toolbar() {
  const ui = useUI();
  const { tagList, activeTag, allTasks } = useBoardStats();
  const filtering = ui.search || ui.priorityFilter !== 'All' || activeTag !== 'All';

  return (
    <div className="toolbar">
      <div className="view-tabs" role="group" aria-label="View">
        {['board', 'analytics'].map((v) => (
          <button key={v} className={ui.view === v ? 'active' : ''} aria-pressed={ui.view === v} onClick={() => ui.setView(v)}>
            {v === 'board' ? '▦ Board' : '▤ Analytics'}
          </button>
        ))}
      </div>
      {ui.view === 'board' && (
        <div className="filters">
          <input ref={ui.searchRef} type="search" value={ui.search} onChange={(e) => ui.setSearch(e.target.value)} placeholder="Search tasks…  ( / )" aria-label="Search tasks" />
          <select value={ui.priorityFilter} onChange={(e) => ui.setPriorityFilter(e.target.value)} aria-label="Filter by priority">
            <option value="All">All priorities</option>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select value={activeTag} onChange={(e) => ui.setTagFilter(e.target.value)} aria-label="Filter by tag">
            <option value="All">All tags</option>
            {tagList.map((t) => <option key={t}>{t}</option>)}
          </select>
          {filtering && <button className="clear" onClick={ui.clearFilters}>Clear</button>}
          <span className="task-count">{allTasks.length} tasks</span>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
