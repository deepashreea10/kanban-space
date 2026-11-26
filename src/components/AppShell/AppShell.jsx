import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import Sidebar from '../Sidebar/Sidebar';
import Board from '../Board/Board';
import CommandPalette from '../CommandPalette/CommandPalette';
import ShortcutsHelp from '../ShortcutsHelp/ShortcutsHelp';
import ImportExport from '../ImportExport/ImportExport';
import Toast from '../Toast/Toast';

// Lives inside the providers, so hooks that need workspace + UI state work here.
function AppShell({ theme, toggleTheme }) {
  useKeyboardShortcuts({ toggleTheme });
  return (
    <div className="app">
      <Sidebar theme={theme} onToggleTheme={toggleTheme} />
      <Board />
      <CommandPalette theme={theme} toggleTheme={toggleTheme} />
      <ShortcutsHelp />
      <ImportExport />
      <Toast />
    </div>
  );
}

export default AppShell;
