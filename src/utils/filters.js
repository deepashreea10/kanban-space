// Returns columns whose tasks match the search text, priority and tag.
export function filterColumns(columns, { search, priority, tag }) {
  const q = search.trim().toLowerCase();
  return columns.map((c) => ({
    ...c,
    tasks: c.tasks.filter((t) => {
      const text = `${t.title} ${t.description} ${t.tag}`.toLowerCase();
      return (
        text.includes(q) &&
        (priority === 'All' || t.priority === priority) &&
        (tag === 'All' || t.tag === tag)
      );
    }),
  }));
}
