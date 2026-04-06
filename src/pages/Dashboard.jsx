import { Link } from 'react-router-dom'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import { stats, transactions, monthlyData } from '../data/mockData'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const formatCurrency = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export default function Dashboard() {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Balance"
          value={formatCurrency(stats.totalBalance)}
          icon="💰"
          gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
          change={5.2}
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          icon="📈"
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
          change={8.1}
        />
        <StatCard
          title="Monthly Expenses"
          value={formatCurrency(stats.monthlyExpenses)}
          icon="💸"
          gradient="bg-gradient-to-br from-rose-500 to-rose-700"
          change={-2.4}
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(stats.netProfit)}
          icon="✨"
          gradient="bg-gradient-to-br from-violet-500 to-violet-700"
          change={12.3}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sparkline Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
              <p className="text-sm text-gray-500">Last 6 months performance</p>
            </div>
            <Link to="/charts" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Savings Rate</p>
                <p className="text-lg font-bold text-indigo-600">48.1%</p>
              </div>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Total Transactions</p>
                <p className="text-lg font-bold text-emerald-600">{transactions.length}</p>
              </div>
              <span className="text-2xl">📋</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-rose-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Pending Items</p>
                <p className="text-lg font-bold text-rose-600">
                  {transactions.filter(t => t.status === 'Pending').length}
                </p>
              </div>
              <span className="text-2xl">⏳</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-violet-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Income Sources</p>
                <p className="text-lg font-bold text-violet-600">4</p>
              </div>
              <span className="text-2xl">💼</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <p className="text-sm text-gray-500">Your latest financial activity</p>
          </div>
          <Link to="/transactions" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Description</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Category</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Amount</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pl-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-sm text-gray-500">{tx.date}</td>
                  <td className="py-3 text-sm font-medium text-gray-800">{tx.description}</td>
                  <td className="py-3"><Badge label={tx.category} /></td>
                  <td className={`py-3 text-sm font-semibold text-right ${tx.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </td>
                  <td className="py-3 pl-4"><Badge label={tx.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
