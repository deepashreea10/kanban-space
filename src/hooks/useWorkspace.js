import { useContext } from 'react';
import { WorkspaceContext } from '../context/workspaceContext';

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used inside <WorkspaceProvider>');
  const { state, dispatch } = ctx;
  const columns = state.boardData[state.activeBoard] || [];
  const activeBoard = state.boards.find((b) => b.id === state.activeBoard);
  return { state, dispatch, columns, activeBoard };
}
