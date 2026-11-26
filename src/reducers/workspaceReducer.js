import { makeEmptyColumns } from '../utils/seed';

const uid = (prefix) =>
  `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// Apply a change to the active board's columns only.
const editColumns = (state, fn) => ({
  ...state,
  boardData: {
    ...state.boardData,
    [state.activeBoard]: fn(state.boardData[state.activeBoard] || []),
  },
});

export function workspaceReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_BOARD':
      return { ...state, activeBoard: action.boardId };

    case 'ADD_BOARD': {
      const id = uid('board');
      return {
        ...state,
        activeBoard: id,
        boards: [...state.boards, { id, name: action.name, icon: '▦' }],
        boardData: { ...state.boardData, [id]: makeEmptyColumns() },
      };
    }

    case 'ADD_TASK':
      return editColumns(state, (cols) =>
        cols.map((c) =>
          c.id === action.columnId
            ? { ...c, tasks: [...c.tasks, { id: uid('task'), subtasks: [], ...action.task }] }
            : c
        )
      );

    case 'UPDATE_TASK':
      return editColumns(state, (cols) =>
        cols.map((c) => ({
          ...c,
          tasks: c.tasks.map((t) => (t.id === action.task.id ? { ...t, ...action.task } : t)),
        }))
      );

    case 'DELETE_TASK':
      return editColumns(state, (cols) =>
        cols.map((c) => ({ ...c, tasks: c.tasks.filter((t) => t.id !== action.taskId) }))
      );

    // Remove the task everywhere, then insert it before `beforeId` (or at the end).
    case 'MOVE_TASK':
      return editColumns(state, (cols) => {
        const task = cols.flatMap((c) => c.tasks).find((t) => t.id === action.taskId);
        if (!task) return cols;
        return cols.map((c) => {
          const tasks = c.tasks.filter((t) => t.id !== action.taskId);
          if (c.id !== action.toColumnId) return { ...c, tasks };
          const i = action.beforeId ? tasks.findIndex((t) => t.id === action.beforeId) : -1;
          tasks.splice(i === -1 ? tasks.length : i, 0, task);
          return { ...c, tasks };
        });
      });

    case 'ADD_COLUMN':
      return editColumns(state, (cols) => [
        ...cols,
        { id: uid('col'), title: action.title, color: '#8b7cf6', tasks: [] },
      ]);

    case 'RENAME_COLUMN':
      return editColumns(state, (cols) =>
        cols.map((c) => (c.id === action.columnId ? { ...c, title: action.title } : c))
      );

    // Tasks of a deleted column move to the first remaining column.
    case 'DELETE_COLUMN':
      return editColumns(state, (cols) => {
        if (cols.length <= 1) return cols;
        const gone = cols.find((c) => c.id === action.columnId);
        const rest = cols.filter((c) => c.id !== action.columnId);
        if (!gone) return cols;
        rest[0] = { ...rest[0], tasks: [...rest[0].tasks, ...gone.tasks] };
        return rest;
      });

    default:
      return state;
  }
}
