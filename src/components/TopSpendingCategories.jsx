import { useAppContext } from '../context/AppContext'
import { formatCompactIndianCurrency } from '../utils/helpers'

const barColors = ['#ec4899', '#f97316', '#6366f1', '#14b8a6', '#8b5cf6']

function TopSpendingCategories({ data }) {
  const { darkMode } = useAppContext()
  const topCategories = [...data].sort((a, b) => b.value - a.value).slice(0, 5)
  const maxValue = topCategories[0]?.value || 0

  return (
    <article className={`rounded-xl p-4 shadow-sm ${darkMode ? 'border border-slate-700 bg-slate-800' : 'border border-slate-200 bg-white'}`}>
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Top Spending Categories</h3>
      <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Largest cost centers by category</p>

      <div className="mt-5 space-y-4">
        {topCategories.map((item, index) => {
          const width = maxValue ? (item.value / maxValue) * 100 : 0

          return (
            <div key={item.name} className="space-y-1.5">
              <div className={`flex items-center justify-between gap-4 text-sm font-medium ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                <span>{item.name}</span>
                <span>{formatCompactIndianCurrency(item.value)}</span>
              </div>
              <div className={`h-2 rounded-full ${darkMode ? 'bg-slate-700/80' : 'bg-slate-100'}`}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${width}%`,
                    backgroundColor: barColors[index % barColors.length],
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default TopSpendingCategories