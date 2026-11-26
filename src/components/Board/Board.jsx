import { useWorkspace } from '../../hooks/useWorkspace';
import Column from './Column';
import './Board.css';

function Board() {
  const { columns, activeBoard } = useWorkspace();
  return (
    <main className="board-area">
      <h1 className="board-title">{activeBoard?.name}</h1>
      <div className="columns">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </main>
  );
}

export default Board;
