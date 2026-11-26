const task = (id, title, description, priority, tag, dueDate = '') => ({
  id, title, description, priority, tag, dueDate, subtasks: [],
});
const col = (id, title, color, tasks = []) => ({ id, title, color, tasks });

export const makeEmptyColumns = () => [
  col('c1', 'To do', '#8b8b98'),
  col('c2', 'In progress', '#8b7cf6'),
  col('c3', 'In review', '#d6a34b'),
  col('c4', 'Done', '#42a887'),
];

export const makeSeed = () => ({
  activeBoard: 'main',
  boards: [
    { id: 'main', name: 'Product workspace', icon: '▦' },
    { id: 'personal', name: 'Personal tasks', icon: '◷' },
    { id: 'ideas', name: 'Ideas & backlog', icon: '◇' },
  ],
  boardData: {
    main: [
      col('todo', 'To do', '#8b8b98', [
        task('t1', 'Define project requirements', 'Finalize the core features and project scope.', 'High', 'Planning', '2026-11-14'),
        task('t2', 'Create wireframes', 'Sketch the main screens and user flow.', 'Medium', 'Design', '2026-11-17'),
        task('t3', 'Review color palette', 'Choose the final light and dark theme colors.', 'Low', 'Design'),
      ]),
      col('progress', 'In progress', '#8b7cf6', [
        task('t4', 'Build the dashboard', 'Create the main workspace layout.', 'Urgent', 'Development', '2026-11-13'),
        task('t5', 'Set up navigation', 'Connect the sidebar and board navigation.', 'Medium', 'Development'),
      ]),
      col('review', 'In review', '#d6a34b', [
        task('t6', 'Check responsive layout', 'Review the layout on smaller screens.', 'Low', 'Testing'),
      ]),
      col('done', 'Done', '#42a887', [
        task('t7', 'Create project plan', 'Outline the project stages and features.', 'High', 'Planning'),
      ]),
    ],
    personal: makeEmptyColumns(),
    ideas: makeEmptyColumns(),
  },
});
