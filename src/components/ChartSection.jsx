import BalanceChart from './BalanceChart'
import ExpensePieChart from './ExpensePieChart'
import TopSpendingCategories from './TopSpendingCategories'

function ChartSection() {
  const monthlyData = [
    { month: 'Jan 25', income: 98000, expense: 34000 },
    { month: 'Feb 25', income: 100000, expense: 36000 },
    { month: 'Mar 25', income: 121000, expense: 35500 },
    { month: 'Apr 25', income: 102000, expense: 37000 },
    { month: 'May 25', income: 116000, expense: 41000 },
    { month: 'Jun 25', income: 116000, expense: 38200 },
    { month: 'Jul 25', income: 123000, expense: 43400 },
    { month: 'Aug 25', income: 127000, expense: 44800 },
    { month: 'Sep 25', income: 124000, expense: 39200 },
    { month: 'Oct 25', income: 131000, expense: 46600 },
    { month: 'Nov 25', income: 136000, expense: 47200 },
    { month: 'Dec 25', income: 146000, expense: 51500 },
  ]

  const spendingData = [
    { name: 'Rent', value: 111000 },
    { name: 'Investments', value: 60000 },
    { name: 'Shopping', value: 31000 },
    { name: 'Food & Dining', value: 29400 },
    { name: 'Health', value: 10000 },
    { name: 'Travel', value: 24200 },
    { name: 'Utilities', value: 18600 },
  ]

  return (
    <section className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <BalanceChart data={monthlyData} />
        <ExpensePieChart data={spendingData} />
      </div>
      <TopSpendingCategories data={spendingData} />
    </section>
  )
}

export default ChartSection
