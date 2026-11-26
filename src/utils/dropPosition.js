// Which card should the dragged card be inserted before? null = end of column.
export function getDropBeforeId(columnEl, clientY, dragId) {
  const cards = [...columnEl.querySelectorAll('.task-card')].filter(
    (c) => c.dataset.taskId !== dragId
  );
  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    if (clientY < rect.top + rect.height / 2) return card.dataset.taskId;
  }
  return null;
}
