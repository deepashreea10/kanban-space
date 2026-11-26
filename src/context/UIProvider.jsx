import { useState } from 'react';
import { UIContext } from './uiContext';

// View state that is not saved: current view and the active filters.
export function UIProvider({ children }) {
  const [view, setView] = useState('board');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');

  const clearFilters = () => {
    setSearch('');
    setPriorityFilter('All');
    setTagFilter('All');
  };

  return (
    <UIContext.Provider
      value={{ view, setView, search, setSearch, priorityFilter, setPriorityFilter, tagFilter, setTagFilter, clearFilters }}
    >
      {children}
    </UIContext.Provider>
  );
}
