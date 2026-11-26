// Horizontal bars from plain elements: no chart library needed.
function BarList({ rows, emptyText }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  if (rows.length === 0) return <p className="analytics-empty">{emptyText}</p>;
  return (
    <ul className="bar-list">
      {rows.map((r) => (
        <li key={r.label}>
          <span className="bar-label">{r.label}</span>
          <span className="bar-track"><span className="bar-fill" style={{ width: `${(r.count / max) * 100}%`, background: r.color }} /></span>
          <span className="bar-value">{r.count}</span>
        </li>
      ))}
    </ul>
  );
}

export default BarList;
