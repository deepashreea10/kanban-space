import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useUI } from '../../hooks/useUI';
import { useBoardStats } from '../../hooks/useBoardStats';
import { filterColumns } from '../../utils/filters';
import TaskCard from '../Board/TaskCard';
import TaskModal from '../TaskModal/TaskModal';
import Analytics from '../Analytics/Analytics';
import OverviewRow from '../Overview/OverviewRow';
import MobileSidebar from '../Sidebar/MobileSidebar';
import './MobileBoard.css';

function MobileBoard({ theme, onToggleTheme }) {
  const { columns, activeBoard, dispatch } = useWorkspace();
  const ui = useUI();
  const { activeTag } = useBoardStats();
  const [activeColIdx, setActiveColIdx] = useState(0);

  const visibleColumns = filterColumns(columns, {
    search: ui.search,
    priority: ui.priorityFilter,
    tag: activeTag,
  });

  const safeIdx = Math.min(activeColIdx, Math.max(visibleColumns.length - 1, 0));
  const currentCol = visibleColumns[safeIdx];
  const realCol = columns.find((c) => c.id === currentCol?.id);

  return (
    <main className="mobile-board">
      {/* ── Top bar ── */}
      <div className="mobile-topbar">
        <MobileSidebar theme={theme} onToggleTheme={onToggleTheme} />
        <span className="mobile-board-name">{activeBoard?.name}</span>
        <div className="mobile-top-actions">
          <button className="m-icon-btn" aria-label="Search"
            onClick={() => { ui.setView('board'); setTimeout(() => ui.searchRef.current?.focus(), 50); }}>⌕</button>
          <button className="m-icon-btn" aria-label="Analytics"
            onClick={() => ui.setView(ui.view === 'analytics' ? 'board' : 'analytics')}>▤</button>
          <button className="m-icon-btn" aria-label="Commands"
            onClick={() => ui.setPaletteOpen(true)}>⌘</button>
          <button className="mobile-new-btn"
            onClick={() => ui.openTask(realCol?.id || columns[0]?.id)}>+ Task</button>
        </div>
      </div>

      {ui.view === 'analytics' ? (
        <div className="mobile-scroll-area"><OverviewRow /><Analytics /></div>
      ) : (
        <>
          {/* ── Column tabs ── */}
          <div className="col-tabs" role="tablist">
            {visibleColumns.map((col, i) => (
              <button key={col.id} role="tab" aria-selected={i === safeIdx}
                className={`col-tab ${i === safeIdx ? 'active' : ''}`}
                onClick={() => setActiveColIdx(i)}>
                <span className="col-tab-dot" style={{ background: col.color }} />
                {col.title}
                <span className="col-tab-count">{col.tasks.length}</span>
              </button>
            ))}
          </div>

          {/* ── Search bar when filters active ── */}
          {(ui.search || ui.priorityFilter !== 'All' || activeTag !== 'All') && (
            <div className="mobile-filter-bar">
              <input ref={ui.searchRef} type="search" value={ui.search}
                placeholder="Search tasks…" aria-label="Search"
                onChange={(e) => ui.setSearch(e.target.value)} />
              <button onClick={ui.clearFilters}>Clear</button>
            </div>
          )}

          {/* ── Task list ── */}
          <div className="mobile-task-list">
            {currentCol && currentCol.tasks.length === 0 && (
              <div className="mobile-empty">
                <p>No tasks in {currentCol.title}</p>
                <button onClick={() => ui.openTask(realCol?.id || columns[0]?.id)}>+ Add a task</button>
              </div>
            )}
            {currentCol && currentCol.tasks.map((task) => (
              <TaskCard key={task.id} task={task}
                isDone={currentCol.title.trim().toLowerCase() === 'done'}
                isDragging={false}
                onEdit={(t) => ui.openTask(realCol?.id || columns[0]?.id, t)}
                onDragStart={() => {}} onDragEnd={() => {}} />
            ))}
          </div>

          {/* ── FAB ── */}
          <button className="mobile-fab" aria-label="New task"
            onClick={() => ui.openTask(realCol?.id || columns[0]?.id)}>+</button>
        </>
      )}

      {ui.taskModal && (
        <TaskModal key={ui.taskModal.task?.id || 'new'}
          task={ui.taskModal.task} columnId={ui.taskModal.columnId} onClose={ui.closeTask} />
      )}
    </main>
  );
}

export default MobileBoard;
