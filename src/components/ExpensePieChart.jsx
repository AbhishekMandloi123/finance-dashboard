import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useAppContext } from '../context/AppContext'
import { formatCompactIndianCurrency } from '../utils/helpers'

const pieColors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6']

function SpendingTooltip({ active, payload, darkMode }) {
  if (!active || !payload?.length) return null

  const tooltipStyle = darkMode
    ? {
      background: 'rgba(15, 23, 42, 0.96)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '12px',
      color: '#e2e8f0',
    }
    : {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      color: '#0f172a',
    }

  const entry = payload[0]
  const total = entry?.payload?.total ?? 0
  const share = total ? (entry.value / total) * 100 : 0

  return (
    <div style={tooltipStyle} className="px-4 py-3 shadow-2xl backdrop-blur">
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        {entry.name}
      </p>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-6">
          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Amount</span>
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {formatCompactIndianCurrency(entry.value)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Share</span>
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {share.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  )
}

function ExpensePieChart({ data }) {
  const { darkMode } = useAppContext()
  const sortedData = [...data].sort((a, b) => b.value - a.value)
  const totalExpense = sortedData.reduce((sum, item) => sum + item.value, 0)

  return (
    <article className={`rounded-xl p-4 shadow-sm ${darkMode ? 'border border-slate-700 bg-slate-800' : 'border border-slate-200 bg-white'}`}>
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Spending Breakdown</h3>
      <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>By category</p>

      <div className={`mt-4 rounded-lg p-3 ${darkMode ? 'border border-slate-700 bg-slate-900/60' : 'border border-slate-900 bg-white'}`}>
        {sortedData.length === 0 ? (
          <div className="flex h-72 items-center justify-center rounded-lg text-sm text-slate-400">
            No expense data available
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sortedData.map((item) => ({ ...item, total: totalExpense }))}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={64}
                    outerRadius={92}
                    paddingAngle={2}
                    cx="50%"
                    cy="50%"
                    stroke={darkMode ? '#0f172a' : '#ffffff'}
                    strokeWidth={3}
                  >
                    {sortedData.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<SpendingTooltip darkMode={darkMode} />} />
                  <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle">
                    <tspan className={`${darkMode ? 'fill-slate-100' : 'fill-slate-700'} text-base font-semibold`}>
                      {formatCompactIndianCurrency(totalExpense)}
                    </tspan>
                  </text>
                  <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle">
                    <tspan className="fill-slate-400 text-[10px] font-medium uppercase tracking-[0.2em]">
                      Total
                    </tspan>
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <ul className="space-y-2.5">
              {sortedData.map((item, index) => {
                const percent = totalExpense ? (item.value / totalExpense) * 100 : 0

                return (
                  <li key={item.name} className="flex items-center justify-between gap-4 text-sm">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: pieColors[index % pieColors.length] }}
                      />
                      <span className={`truncate ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.name}</span>
                    </div>
                    <div className={`flex items-center gap-4 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className="w-10">{percent.toFixed(0)}%</span>
                      <span className={`w-16 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{formatCompactIndianCurrency(item.value)}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}

export default ExpensePieChart