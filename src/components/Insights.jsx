import { useAppContext } from '../context/AppContext'
import { formatCurrency, getInsights } from '../utils/helpers'
import { BoltIcon, PieInsightIcon, SparkleIcon } from './icons'

function Insights() {
  const { transactions } = useAppContext()
  const { highestCategory, thisMonthExpense, delta, trendLabel } =
    getInsights(transactions)

  const deltaPercent = thisMonthExpense
    ? Math.round((Math.abs(delta) / thisMonthExpense) * 100)
    : 0

  const spendingMessage =
    trendLabel === 'No change'
      ? 'Spending stayed flat this month'
      : `Spending ${delta > 0 ? 'increased' : 'decreased'} by ${Math.max(deltaPercent, 1)}% this month`

  return (
    <section className="animate-fade-up rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-md sm:p-6">
      <h3 className="font-heading text-lg font-semibold text-white">Insights</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <article className="rounded-lg border border-slate-700 bg-slate-700/50 p-4">
          <div className="mb-3 inline-flex rounded-lg bg-blue-500/20 p-2 text-blue-400">
            <PieInsightIcon className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Top Category
          </p>
          <p className="mt-1 text-xl font-bold text-white">
            {highestCategory ? highestCategory.name : 'N/A'}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {highestCategory
              ? `Top category: ${highestCategory.name} at ${formatCurrency(highestCategory.value)}`
              : 'Top category: No data yet'}
          </p>
        </article>

        <article className="rounded-lg border border-slate-700 bg-slate-700/50 p-4">
          <div className="mb-3 inline-flex rounded-lg bg-orange-500/20 p-2 text-orange-400">
            <BoltIcon className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Expenses This Month
          </p>
          <p className="mt-1 text-xl font-bold text-orange-300">
            {formatCurrency(thisMonthExpense)}
          </p>
          <p className="mt-1 text-sm text-slate-400">{spendingMessage}</p>
        </article>

        <article className="rounded-lg border border-slate-700 bg-slate-700/50 p-4">
          <div className="mb-3 inline-flex rounded-lg bg-purple-500/20 p-2 text-purple-400">
            <SparkleIcon className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Month-over-Month
          </p>
          <p className="mt-1 text-xl font-bold text-white">{trendLabel}</p>
          <p className={`text-sm ${delta > 0 ? 'text-orange-300' : 'text-emerald-300'}`}>
            {delta === 0
              ? 'No month-over-month change'
              : `Difference: ${formatCurrency(Math.abs(delta))}`}
          </p>
        </article>
      </div>
    </section>
  )
}

export default Insights
