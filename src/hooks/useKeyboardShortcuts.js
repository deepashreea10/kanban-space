import { useEffect, useRef } from 'react';
import { useUI } from './useUI';
import { useWorkspace } from './useWorkspace';

// One global listener. It always calls the newest handler (kept in a ref),
// so it never works with stale state.
export function useKeyboardShortcuts({ toggleTheme }) {
  const ui = useUI();
  const { state, dispatch, columns } = useWorkspace();
  const handler = useRef(() => {});

  useEffect(() => {
    handler.current = (e) => {
      const key = e.key;
      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'k') {
        e.preventDefault();
        ui.setPaletteOpen(!ui.paletteOpen);
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      const typing = t && (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable);
      if (typing || ui.paletteOpen || ui.helpOpen || ui.taskModal) return;

      if (key.toLowerCase() === 'n') { e.preventDefault(); ui.openTask(columns[0]?.id); }
      else if (key === '/') { e.preventDefault(); ui.setView('board'); setTimeout(() => ui.searchRef.current?.focus(), 0); }
      else if (key.toLowerCase() === 't') toggleTheme();
      else if (key.toLowerCase() === 'v') ui.setView(ui.view === 'board' ? 'analytics' : 'board');
      else if (key === '?') ui.setHelpOpen(true);
      else if (/^[1-9]$/.test(key)) {
        const board = state.boards[Number(key) - 1];
        if (board) dispatch({ type: 'SET_ACTIVE_BOARD', boardId: board.id });
      }
    };
  });

  useEffect(() => {
    const listener = (e) => handler.current(e);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);
}
