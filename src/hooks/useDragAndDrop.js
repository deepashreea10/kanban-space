import { useState } from 'react';
import { getDropBeforeId } from '../utils/dropPosition';

export function useDragAndDrop(dispatch) {
  const [dragId, setDragId] = useState(null);
  const [target, setTarget] = useState(null); // { columnId, beforeId }

  const clear = () => {
    setDragId(null);
    setTarget(null);
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
    setDragId(taskId);
  };

  const onDragOver = (e, columnId) => {
    if (!dragId) return;
    e.preventDefault(); // required, otherwise the browser refuses the drop
    e.dataTransfer.dropEffect = 'move';
    const beforeId = getDropBeforeId(e.currentTarget, e.clientY, dragId);
    setTarget((t) =>
      t && t.columnId === columnId && t.beforeId === beforeId ? t : { columnId, beforeId }
    );
  };

  const onDrop = (e, columnId) => {
    e.preventDefault();
    if (dragId) {
      const beforeId = target && target.columnId === columnId ? target.beforeId : null;
      dispatch({ type: 'MOVE_TASK', taskId: dragId, toColumnId: columnId, beforeId });
    }
    clear();
  };

  return { dragId, target, onDragStart, onDragOver, onDrop, onDragEnd: clear };
}
