import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts'
import { monthlyData, yearlyData, portfolioData } from '../data/mockData'

const formatCurrency = (v) => `$${(v / 1000).toFixed(1)}k`

export default function Charts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar Chart - Revenue vs Expenses */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Revenue vs Expenses</h2>
            <p className="text-sm text-gray-500">Last 6 months comparison</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Portfolio Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Portfolio Breakdown</h2>
            <p className="text-sm text-gray-500">Asset allocation by category</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={280}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, 'Allocation']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {portfolioData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Line Chart - 12 Months */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Income vs Expenses Trend</h2>
          <p className="text-sm text-gray-500">12-month historical overview</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
            <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} />
            <Legend wrapperStyle={{ fontSize: '13px' }} />
            <Line type="monotone" dataKey="income" name="Income" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: '#22c55e' }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4, fill: '#f43f5e' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
