// Quote every cell; a leading = + - @ gets an apostrophe so spreadsheets
// do not run user text as a formula.
const csvCell = (value) => {
  let text = String(value ?? '');
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return `"${text.replace(/"/g, '""')}"`;
};

export function buildJSON({ boards, boardData }) {
  return JSON.stringify(
    { app: 'kanbanspace', version: 1, exportedAt: new Date().toISOString(), boards, boardData },
    null,
    2
  );
}

export function buildCSV({ boards, boardData }) {
  const rows = [['Board', 'Column', 'Title', 'Description', 'Priority', 'Tag', 'Due date', 'Subtasks done', 'Subtasks total']];
  boards.forEach((board) =>
    (boardData[board.id] || []).forEach((column) =>
      column.tasks.forEach((t) => {
        const subs = t.subtasks || [];
        rows.push([board.name, column.title, t.title, t.description, t.priority, t.tag, t.dueDate, subs.filter((s) => s.completed).length, subs.length]);
      })
    )
  );
  // The leading \uFEFF makes Excel read the file as UTF-8.
  return '\uFEFF' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
}
