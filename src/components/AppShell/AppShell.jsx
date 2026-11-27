import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useIsMobile } from '../../hooks/useMediaQuery';
import Sidebar from '../Sidebar/Sidebar';
import MobileSidebar from '../Sidebar/MobileSidebar';
import Board from '../Board/Board';
import MobileBoard from '../MobileBoard/MobileBoard';
import CommandPalette from '../CommandPalette/CommandPalette';
import ShortcutsHelp from '../ShortcutsHelp/ShortcutsHelp';
import ImportExport from '../ImportExport/ImportExport';
import Toast from '../Toast/Toast';

function AppShell({ theme, toggleTheme }) {
  useKeyboardShortcuts({ toggleTheme });
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="app mobile-app">
        <MobileBoard theme={theme} onToggleTheme={toggleTheme} />
        <CommandPalette theme={theme} toggleTheme={toggleTheme} />
        <ShortcutsHelp />
        <ImportExport />
        <Toast />
      </div>
    );
  }

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
