export default function StatCard({ title, value, icon, gradient, change }) {
  return (
    <div className={`rounded-2xl p-6 text-white shadow-lg ${gradient}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium opacity-80">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      {change && (
        <div className="text-sm opacity-75">
          <span className={change >= 0 ? 'text-green-200' : 'text-red-200'}>
            {change >= 0 ? '▲' : '▼'} {Math.abs(change)}%
          </span>
          {' '}vs last month
        </div>
      )}
    </div>
  )
}
