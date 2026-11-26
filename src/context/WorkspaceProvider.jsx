import { useEffect, useReducer } from 'react';
import { WorkspaceContext } from './workspaceContext';
import { workspaceReducer } from '../reducers/workspaceReducer';
import { makeSeed } from '../utils/seed';

const STORAGE_KEY = 'kanbanspace-workspace-v2';

// Importing replaces everything, so it is handled here at the root,
// before the normal reducer sees the action.
const rootReducer = (state, action) =>
  action.type === 'REPLACE_WORKSPACE' ? action.state : workspaceReducer(state, action);

function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.boards) && saved.boardData) return saved;
  } catch {
    /* corrupt or blocked storage: fall back to seed */
  }
  return makeSeed();
}

export function WorkspaceProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  return <WorkspaceContext.Provider value={{ state, dispatch }}>{children}</WorkspaceContext.Provider>;
}
