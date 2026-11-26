function StatCard({ label, value, tone }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong className={tone}>{value}</strong>
    </div>
  );
}

export default StatCard;
