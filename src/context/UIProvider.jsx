import { useRef, useState } from 'react';
import { UIContext } from './uiContext';

// Temporary view state (never saved): view, filters, dialogs, toast.
export function UIProvider({ children }) {
  const [view, setView] = useState('board');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');
  const [taskModal, setTaskModal] = useState(null); // { columnId, task? }
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [toast, setToast] = useState('');
  const searchRef = useRef(null);
  const importRef = useRef(null);
  const toastTimer = useRef(null);

  const clearFilters = () => {
    setSearch('');
    setPriorityFilter('All');
    setTagFilter('All');
  };
  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3000);
  };
  const openTask = (columnId, task) => setTaskModal({ columnId, task });
  const closeTask = () => setTaskModal(null);

  return (
    <UIContext.Provider
      value={{
        view, setView, search, setSearch, priorityFilter, setPriorityFilter, tagFilter, setTagFilter, clearFilters,
        taskModal, openTask, closeTask, paletteOpen, setPaletteOpen, helpOpen, setHelpOpen,
        toast, showToast, searchRef, importRef,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
