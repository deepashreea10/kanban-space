import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useUI } from '../../hooks/useUI';
import { useBoardStats } from '../../hooks/useBoardStats';
import { filterColumns } from '../../utils/filters';
import OverviewRow from '../Overview/OverviewRow';
import Toolbar from '../Toolbar/Toolbar';
import TopActions from '../TopActions/TopActions';
import Analytics from '../Analytics/Analytics';
import TaskModal from '../TaskModal/TaskModal';
import Column from './Column';
import './Board.css';

function Board() {
  const { columns, activeBoard, dispatch } = useWorkspace();
  const ui = useUI();
  const { activeTag } = useBoardStats();
  const drag = useDragAndDrop(dispatch);
  const [addingColumn, setAddingColumn] = useState(false);
  const [columnName, setColumnName] = useState('');

  const visibleColumns = filterColumns(columns, { search: ui.search, priority: ui.priorityFilter, tag: activeTag });

  const addColumn = (e) => {
    e.preventDefault();
    if (!columnName.trim()) return;
    dispatch({ type: 'ADD_COLUMN', title: columnName.trim() });
    setColumnName('');
    setAddingColumn(false);
  };

  return (
    <main className="board-area">
      <div className="board-head">
        <h1 className="board-title">{activeBoard?.name}</h1>
        <TopActions />
      </div>
      <OverviewRow />
      <Toolbar />
      {ui.view === 'analytics' ? (
        <Analytics />
      ) : (
        <div className="columns">
          {visibleColumns.map((column) => (
            <Column
              key={column.id}
              column={column}
              canDelete={columns.length > 1}
              drag={drag}
              onAdd={(columnId) => ui.openTask(columnId)}
              onEdit={(task, columnId) => ui.openTask(columnId, task)}
            />
          ))}
          <div className="add-column">
            {addingColumn ? (
              <form onSubmit={addColumn}>
                <input autoFocus value={columnName} onChange={(e) => setColumnName(e.target.value)} placeholder="Column name" aria-label="New column name" />
                <button type="submit">Add</button>
              </form>
            ) : (
              <button onClick={() => setAddingColumn(true)}>+ Add column</button>
            )}
          </div>
        </div>
      )}
      {ui.taskModal && (
        <TaskModal key={ui.taskModal.task?.id || 'new'} task={ui.taskModal.task} columnId={ui.taskModal.columnId} onClose={ui.closeTask} />
      )}
    </main>
  );
}

export default Board;
