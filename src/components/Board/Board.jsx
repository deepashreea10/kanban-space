import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useUI } from '../../hooks/useUI';
import { useBoardStats } from '../../hooks/useBoardStats';
import { filterColumns } from '../../utils/filters';
import OverviewRow from '../Overview/OverviewRow';
import Toolbar from '../Toolbar/Toolbar';
import Analytics from '../Analytics/Analytics';
import TaskModal from '../TaskModal/TaskModal';
import Column from './Column';
import './Board.css';

function Board() {
  const { columns, activeBoard, dispatch } = useWorkspace();
  const { view, search, priorityFilter } = useUI();
  const { activeTag } = useBoardStats();
  const drag = useDragAndDrop(dispatch);
  const [modal, setModal] = useState(null); // { columnId, task? }
  const [addingColumn, setAddingColumn] = useState(false);
  const [columnName, setColumnName] = useState('');

  const visibleColumns = filterColumns(columns, { search, priority: priorityFilter, tag: activeTag });

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
        <button className="btn-primary" onClick={() => setModal({ columnId: columns[0]?.id })}>+ New task</button>
      </div>
      <OverviewRow />
      <Toolbar />
      {view === 'analytics' ? (
        <Analytics />
      ) : (
        <div className="columns">
          {visibleColumns.map((column) => (
            <Column
              key={column.id}
              column={column}
              canDelete={columns.length > 1}
              drag={drag}
              onAdd={(columnId) => setModal({ columnId })}
              onEdit={(task, columnId) => setModal({ columnId, task })}
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
      {modal && (
        <TaskModal key={modal.task?.id || 'new'} task={modal.task} columnId={modal.columnId} onClose={() => setModal(null)} />
      )}
    </main>
  );
}

export default Board;
