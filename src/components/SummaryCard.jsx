import { formatCurrency } from '../utils/helpers'

const accentMap = {
  balance: {
    shell: 'border border-slate-700 bg-slate-800',
    icon: 'bg-blue-500/20 text-blue-400',
    indicator: 'bg-blue-500/20 text-blue-300',
  },
  income: {
    shell: 'border border-slate-700 bg-slate-800',
    icon: 'bg-emerald-500/20 text-emerald-400',
    indicator: 'bg-emerald-500/20 text-emerald-300',
  },
  expense: {
    shell: 'border border-slate-700 bg-slate-800',
    icon: 'bg-red-500/20 text-red-400',
    indicator: 'bg-red-500/20 text-red-300',
  },
}

const formatPercent = (value) => {
  const rounded = Math.round(value)
  return `${rounded > 0 ? '+' : ''}${rounded}%`
}

function SummaryCard({ title, value, icon: Icon, accent = 'balance', change = 0 }) {
  const styles = accentMap[accent]

  return (
    <article
      className={`group rounded-xl border p-5 text-slate-50 shadow-md transition duration-300 hover:scale-[1.01] sm:p-6 ${styles.shell}`}
    >
      <div className="mb-3 flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {title}
        </p>
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${styles.icon}`}>
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </span>
      </div>
      <p className="font-heading text-3xl font-bold text-white">
        {formatCurrency(value)}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${styles.indicator}`}
        >
          {formatPercent(change)}
        </span>
        <p className="text-xs text-slate-200/80">vs last month</p>
      </div>
    </article>
  )
}

export default SummaryCard
