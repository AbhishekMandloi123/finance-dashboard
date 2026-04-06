import { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { formatCurrency, formatDate } from '../utils/helpers'
import { PlusIcon, SearchIcon } from './icons'

const defaultForm = {
  date: '',
  amount: '',
  category: '',
  type: 'expense',
  note: '',
}

function TransactionTable() {
  const {
    filteredTransactions,
    filters,
    setFilters,
    role,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    exportAsCSV,
    exportAsJSON,
  } = useAppContext()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formValues, setFormValues] = useState(defaultForm)

  const isAdmin = role === 'admin'

  const categoryOptions = useMemo(
    () => ['Food', 'Salary', 'Travel', 'Shopping', 'Bills', 'Health', 'Other'],
    [],
  )

  const handleFormOpen = (transaction = null) => {
    if (transaction) {
      setEditingId(transaction.id)
      setFormValues({
        date: transaction.date,
        amount: String(transaction.amount),
        category: transaction.category,
        type: transaction.type,
        note: transaction.note || '',
      })
    } else {
      setEditingId(null)
      setFormValues(defaultForm)
    }
    setIsFormOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formValues.date || !formValues.amount || !formValues.category) return

    if (editingId) {
      updateTransaction(editingId, formValues)
    } else {
      addTransaction(formValues)
    }

    setIsFormOpen(false)
    setEditingId(null)
    setFormValues(defaultForm)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  return (
    <section className="animate-fade-up rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold text-white">
            Transactions
          </h3>
          <p className="text-sm text-slate-400">
            Search, filter, and sort your transaction activity
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportAsJSON}
            className="rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={exportAsCSV}
            className="rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
          >
            Export CSV
          </button>
          {isAdmin && (
            <button
              type="button"
              onClick={() => handleFormOpen()}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        <label className="relative block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, search: event.target.value }))
            }
            placeholder="Search category"
            className="w-full rounded-lg border border-slate-700 bg-slate-700/50 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </label>

        <select
          value={filters.type}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, type: event.target.value }))
          }
          className="rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, sortBy: event.target.value }))
          }
          className="rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="date-desc">Date: Newest</option>
          <option value="date-asc">Date: Oldest</option>
          <option value="amount-desc">Amount: High to Low</option>
          <option value="amount-asc">Amount: Low to High</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="mt-5 rounded-lg border border-dashed border-slate-700 bg-slate-700/30 p-8 text-center text-sm text-slate-400">
          No transactions found. Try a different filter.
        </div>
      ) : (
        <div className="mt-4 overflow-y-auto rounded-lg border border-slate-700 bg-slate-700/30 shadow-sm max-h-[460px]">
          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                <th className="sticky top-0 z-10 bg-slate-800 px-3 py-3">Date</th>
                <th className="sticky top-0 z-10 bg-slate-800 px-3 py-3">Category</th>
                <th className="sticky top-0 z-10 bg-slate-800 px-3 py-3">Type</th>
                <th className="sticky top-0 z-10 bg-slate-800 px-3 py-3">Amount</th>
                <th className="sticky top-0 z-10 bg-slate-800 px-3 py-3">Note</th>
                {isAdmin && <th className="sticky top-0 z-10 bg-slate-800 px-3 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-slate-700 text-slate-300 transition hover:bg-slate-700/50"
                >
                  <td className="px-3 py-3">{formatDate(tx.date)}</td>
                  <td className="px-3 py-3">{tx.category}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        tx.type === 'income'
                          ? 'border border-emerald-700 bg-emerald-950 text-emerald-400'
                          : 'border border-red-700 bg-red-950 text-red-400'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td
                    className={`px-3 py-3 font-semibold ${
                      tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-3 py-3 text-slate-500">{tx.note || '-'}</td>
                  {isAdmin && (
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleFormOpen(tx)}
                          className="rounded-md border border-slate-600 bg-slate-700/50 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(tx.id)}
                          className="rounded-md border border-red-700 bg-red-950 px-2.5 py-1 text-xs font-medium text-red-400 transition hover:bg-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && isAdmin && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-lg"
          >
            <div>
              <h4 className="font-heading text-xl font-semibold text-white">
                {editingId ? 'Edit Transaction' : 'Add Transaction'}
              </h4>
              <p className="text-sm text-slate-400">Fill in the details and save.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Date
                </span>
                <input
                  type="date"
                  value={formValues.date}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, date: event.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm text-white"
                  required
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Amount
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formValues.amount}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, amount: event.target.value }))
                  }
                  placeholder="Amount"
                  className="w-full rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm text-white"
                  required
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Category
                </span>
                <select
                  value={formValues.category}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, category: event.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm text-white"
                  required
                >
                  <option value="">Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Type
                </span>
                <select
                  value={formValues.type}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, type: event.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm text-white"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </label>
            </div>

            <label className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Note (optional)
              </span>
              <input
                type="text"
                value={formValues.note}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, note: event.target.value }))
                }
                placeholder="Short note"
                className="w-full rounded-lg border border-slate-700 bg-slate-700/50 px-3 py-2 text-sm text-white"
              />
            </label>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false)
                  setEditingId(null)
                  setFormValues(defaultForm)
                }}
                className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700"
              >
                {editingId ? 'Update Transaction' : 'Save Transaction'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default TransactionTable
