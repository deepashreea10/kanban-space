import { useUI } from '../../hooks/useUI';
import Modal from '../Modal/Modal';

const SHORTCUTS = [
  ['Ctrl K', 'Open the command palette'],
  ['N', 'New task'],
  ['/', 'Focus search'],
  ['T', 'Switch light / dark theme'],
  ['V', 'Switch between Board and Analytics'],
  ['1 – 9', 'Jump to a board'],
  ['?', 'Show this list'],
  ['Esc', 'Close any dialog'],
];

function ShortcutsHelp() {
  const { helpOpen, setHelpOpen } = useUI();
  if (!helpOpen) return null;
  return (
    <Modal title="Keyboard shortcuts" onClose={() => setHelpOpen(false)}>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
        {SHORTCUTS.map(([keys, label]) => (
          <li key={keys} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span>{label}</span>
            <kbd>{keys}</kbd>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

export default ShortcutsHelp;
