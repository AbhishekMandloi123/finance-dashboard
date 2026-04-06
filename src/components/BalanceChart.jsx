import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAppContext } from '../context/AppContext'
import { formatCompactIndianCurrency } from '../utils/helpers'

function TrendTooltip({ active, payload, label, darkMode }) {
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

  const income = payload.find((entry) => entry.dataKey === 'income')?.value ?? 0
  const expense = payload.find((entry) => entry.dataKey === 'expense')?.value ?? 0

  return (
    <div style={tooltipStyle} className="px-4 py-3 shadow-2xl backdrop-blur">
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        {label}
      </p>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-6">
          <span className="text-emerald-300">Income</span>
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {formatCompactIndianCurrency(income)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-rose-300">Expense</span>
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {formatCompactIndianCurrency(expense)}
          </span>
        </div>
      </div>
    </div>
  )
}

const formatAxisValue = (value) => formatCompactIndianCurrency(value)

function BalanceChart({ data }) {
  const { darkMode } = useAppContext()

  const chartGridStroke = darkMode ? 'rgba(148, 163, 184, 0.18)' : '#e2e8f0'
  const axisStroke = darkMode ? '#94a3b8' : '#94a3b8'

  return (
    <article className={`rounded-xl p-4 shadow-sm ${darkMode ? 'border border-slate-700 bg-slate-800' : 'border border-slate-200 bg-white'}`}>
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Monthly Cash Flow</h3>
      <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Income vs Expense trend</p>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 14, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={chartGridStroke} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              stroke={axisStroke}
              fontSize={12}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke={axisStroke}
              fontSize={12}
              tickFormatter={formatAxisValue}
              width={56}
            />
            <Tooltip content={<TrendTooltip darkMode={darkMode} />} cursor={{ stroke: 'rgba(148, 163, 184, 0.18)', strokeWidth: 1 }} />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2.2}
              fill="url(#incomeGradient)"
              fillOpacity={1}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#fb923c"
              strokeWidth={2.2}
              fill="url(#expenseGradient)"
              fillOpacity={1}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={`mt-3 flex items-center justify-center gap-6 text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Income
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          Expenses
        </span>
      </div>
    </article>
  )
}

export default BalanceChart