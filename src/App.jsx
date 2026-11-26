import { useTheme } from './hooks/useTheme';
import { WorkspaceProvider } from './context/WorkspaceProvider';
import { UIProvider } from './context/UIProvider';
import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';
import './App.css';

// App only composes: providers + layout. No business logic lives here.
function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <WorkspaceProvider>
      <UIProvider>
        <div className="app">
          <Sidebar theme={theme} onToggleTheme={toggleTheme} />
          <Board />
        </div>
      </UIProvider>
    </WorkspaceProvider>
  );
}

export default App;
