import './ThemeToggle.css';

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button className="theme-toggle" onClick={onToggle}>
      <span aria-hidden="true">{isDark ? '☼' : '◐'}</span>
      {isDark ? 'Light appearance' : 'Dark appearance'}
    </button>
  );
}

export default ThemeToggle;