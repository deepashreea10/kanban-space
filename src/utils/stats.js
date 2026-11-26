import { PRIORITIES, PRIORITY_COLORS } from './constants';
import { addDaysISO, todayISO } from './dates';

// Pure function: columns in, every number the Overview and Analytics need out.
export function computeStats(columns) {
  const today = todayISO();
  const weekEnd = addDaysISO(today, 7);
  const allTasks = columns.flatMap((c) => c.tasks);
  const doneCol = columns.find((c) => c.id === 'done' || c.title.trim().toLowerCase() === 'done');
  const doneIds = new Set(doneCol ? doneCol.tasks.map((t) => t.id) : []);
  const open = allTasks.filter((t) => !doneIds.has(t.id));

  const tagCounts = {};
  allTasks.forEach((t) => {
    if (t.tag) tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1;
  });
  const tagList = Object.keys(tagCounts).sort((a, b) => a.localeCompare(b));
  const completed = doneCol ? doneCol.tasks.length : 0;
  const subs = allTasks.flatMap((t) => t.subtasks || []);

  return {
    allTasks,
    tagList,
    completed,
    progress: allTasks.length ? Math.round((completed / allTasks.length) * 100) : 0,
    openCount: open.length,
    overdue: open.filter((t) => t.dueDate && t.dueDate < today).length,
    dueSoon: open.filter((t) => t.dueDate && t.dueDate >= today && t.dueDate <= weekEnd).length,
    upcoming: open.filter((t) => t.dueDate).sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 5),
    subtaskTotal: subs.length,
    subtaskDone: subs.filter((s) => s.completed).length,
    columnRows: columns.map((c) => ({ label: c.title, count: c.tasks.length, color: c.color })),
    priorityRows: PRIORITIES.map((p) => ({
      label: p,
      count: allTasks.filter((t) => t.priority === p).length,
      color: PRIORITY_COLORS[p],
    })),
    tagRows: tagList
      .map((tag) => ({ label: tag, count: tagCounts[tag], color: 'var(--accent)' }))
      .sort((a, b) => b.count - a.count),
  };
}
