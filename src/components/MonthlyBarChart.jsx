import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCompactIndianCurrency, formatCurrency } from '../utils/helpers'

const tooltipStyle = {
  background: 'rgba(15, 23, 42, 0.95)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '12px',
  color: '#e2e8f0',
}

function MonthlyBarChart({ data }) {
  return (
    <article className="rounded-xl border border-white/10 bg-slate-800 p-4 shadow-md">
      <h3 className="text-lg font-semibold text-white">Monthly Comparison</h3>
      <p className="mt-1 text-sm text-slate-400">Income vs expense side by side</p>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.22)" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#94a3b8" fontSize={12} />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#94a3b8"
              fontSize={12}
              tickFormatter={formatCompactIndianCurrency}
            />
            <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={tooltipStyle} />
            <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} maxBarSize={36} />
            <Bar dataKey="expense" fill="#f97316" radius={[8, 8, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

export default MonthlyBarChart