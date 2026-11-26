import { PRIORITIES } from './constants';
import { makeEmptyColumns } from './seed';

const str = (v, fallback = '') => (typeof v === 'string' ? v : fallback);

// Validates an imported file and fills gaps, so a hand-edited or older
// export can never crash the app.
export function sanitizeWorkspace(data) {
  if (!data || !Array.isArray(data.boards) || !data.boardData || typeof data.boardData !== 'object') {
    throw new Error('This file is not a Kanbanspace workspace export.');
  }
  const boards = data.boards
    .filter((b) => b && b.id && b.name)
    .map((b) => ({ id: String(b.id), name: String(b.name), icon: str(b.icon, '▦') || '▦' }));
  if (boards.length === 0) throw new Error('The file does not contain any boards.');

  const boardData = {};
  boards.forEach((b) => {
    const raw = Array.isArray(data.boardData[b.id]) ? data.boardData[b.id].filter((c) => c && c.id) : [];
    boardData[b.id] = raw.length
      ? raw.map((c) => ({
          id: String(c.id),
          title: str(c.title, 'Untitled') || 'Untitled',
          color: str(c.color, '#8b7cf6'),
          tasks: (Array.isArray(c.tasks) ? c.tasks : [])
            .filter((t) => t && t.id && t.title)
            .map((t) => ({
              id: String(t.id),
              title: String(t.title),
              description: str(t.description),
              priority: PRIORITIES.includes(t.priority) ? t.priority : 'Medium',
              tag: str(t.tag, 'General') || 'General',
              dueDate: str(t.dueDate),
              subtasks: (Array.isArray(t.subtasks) ? t.subtasks : [])
                .filter((s) => s && s.id && s.title)
                .map((s) => ({ id: String(s.id), title: String(s.title), completed: Boolean(s.completed) })),
            })),
        }))
      : makeEmptyColumns();
  });
  return { boards, boardData, activeBoard: boards[0].id };
}
