import { useTheme } from './hooks/useTheme';
import { WorkspaceProvider } from './context/WorkspaceProvider';
import { UIProvider } from './context/UIProvider';
import AppShell from './components/AppShell/AppShell';
import './App.css';

// App only wires theme + providers around the shell.
function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <WorkspaceProvider>
      <UIProvider>
        <AppShell theme={theme} toggleTheme={toggleTheme} />
      </UIProvider>
    </WorkspaceProvider>
  );
}

export default App;
