import { useEffect, useState } from 'react';

const STORAGE_KEY = 'kanbanspace-theme';

function getInitialTheme() {
  // index.html already set data-theme before React loaded, so read it back.
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage can be blocked (private mode); the theme still works */
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}
