import { useState } from 'react'
import Badge from '../components/ui/Badge'
import { transactions as initialTransactions } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const formatCurrency = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

const CATEGORIES = ['All', 'Income', 'Shopping', 'Food', 'Utilities', 'Entertainment']
const STATUSES = ['All', 'Completed', 'Pending', 'Failed']

export default function Transactions() {
  const { isAdmin } = useAuth()
  const [txList, setTxList] = useState(initialTransactions)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [sortField, setSortField] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const handleDelete = (id) => {
    setTxList(prev => prev.filter(t => t.id !== id))
  }

  const filtered = txList
    .filter(t => category === 'All' || t.category === category)
    .filter(t => status === 'All' || t.status === status)
    .filter(t => t.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let valA = a[sortField]
      let valB = b[sortField]
      if (sortField === 'amount') {
        return sortDir === 'asc' ? valA - valB : valB - valA
      }
      return sortDir === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA))
    })

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>
    return <span className="text-indigo-500 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Showing <span className="font-medium text-gray-800">{filtered.length}</span> transactions
          {isAdmin && <span className="ml-2 text-purple-600 font-medium">• Admin Mode</span>}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th
                  className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('date')}
                >
                  Date <SortIcon field="date" />
                </th>
                <th
                  className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('description')}
                >
                  Description <SortIcon field="description" />
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Category</th>
                <th
                  className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('amount')}
                >
                  Amount <SortIcon field="amount" />
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pl-4">Status</th>
                {isAdmin && (
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-3.5 text-sm text-gray-500">{tx.date}</td>
                  <td className="py-3.5 text-sm font-medium text-gray-800">{tx.description}</td>
                  <td className="py-3.5"><Badge label={tx.category} /></td>
                  <td className={`py-3.5 text-sm font-semibold text-right ${tx.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </td>
                  <td className="py-3.5 pl-4"><Badge label={tx.status} /></td>
                  {isAdmin && (
                    <td className="py-3.5 text-center">
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="py-12 text-center text-gray-400">
                    <div className="text-4xl mb-2">🔍</div>
                    <div>No transactions found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
