import { useWorkspace } from './useWorkspace';
import { useUI } from './useUI';
import { useBoardStats } from './useBoardStats';
import { useExport } from './useExport';

// The command list is data: label, optional shortcut hint, and what to run.
export function useCommands({ theme, toggleTheme }) {
  const ui = useUI();
  const { state, dispatch, columns } = useWorkspace();
  const { tagList } = useBoardStats();
  const { exportJSON, exportCSV } = useExport();

  return [
    { id: 'new-task', label: 'New task', hint: 'N', run: () => ui.openTask(columns[0]?.id) },
    { id: 'view-board', label: 'Show board view', run: () => ui.setView('board') },
    { id: 'view-analytics', label: 'Show analytics', hint: 'V', run: () => ui.setView('analytics') },
    { id: 'theme', label: `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`, hint: 'T', run: toggleTheme },
    { id: 'clear', label: 'Clear all filters', run: ui.clearFilters },
    { id: 'export-json', label: 'Export workspace (JSON)', run: exportJSON },
    { id: 'export-csv', label: 'Export tasks (CSV)', run: exportCSV },
    { id: 'import-json', label: 'Import workspace (JSON)', run: () => ui.importRef.current?.click() },
    { id: 'help', label: 'Keyboard shortcuts', hint: '?', run: () => ui.setHelpOpen(true) },
    ...state.boards
      .filter((b) => b.id !== state.activeBoard)
      .map((b) => ({ id: `board-${b.id}`, label: `Go to ${b.name}`, run: () => dispatch({ type: 'SET_ACTIVE_BOARD', boardId: b.id }) })),
    ...tagList.map((t) => ({ id: `tag-${t}`, label: `Filter by tag: ${t}`, run: () => { ui.setView('board'); ui.setTagFilter(t); } })),
  ];
}
