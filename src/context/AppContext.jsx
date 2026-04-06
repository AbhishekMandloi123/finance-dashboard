import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { mockTransactions } from '../data/mockData'
import { filterAndSortTransactions, getSummaryTrends, getTotals } from '../utils/helpers'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  transactions: 'finance_dashboard_transactions',
  role: 'finance_dashboard_role',
  darkMode: 'finance_dashboard_dark_mode',
}

const getInitialTransactions = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.transactions)
  return saved ? JSON.parse(saved) : mockTransactions
}

const getInitialRole = () => localStorage.getItem(STORAGE_KEYS.role) || 'viewer'

const getInitialDarkMode = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.darkMode)
  return saved === null ? true : saved === 'true'
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(getInitialTransactions)
  const [role, setRole] = useState(getInitialRole)
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    sortBy: 'date-desc',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, role)
  }, [role])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.darkMode, String(darkMode))
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  const filteredTransactions = useMemo(
    () => filterAndSortTransactions(transactions, filters),
    [transactions, filters],
  )

  const totals = useMemo(() => getTotals(transactions), [transactions])
  const summaryTrends = useMemo(
    () => getSummaryTrends(transactions),
    [transactions],
  )

  const addTransaction = (transaction) => {
    const next = {
      ...transaction,
      id: crypto.randomUUID(),
      amount: Number(transaction.amount),
    }
    setTransactions((prev) => [next, ...prev])
  }

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? { ...tx, ...updatedTransaction, amount: Number(updatedTransaction.amount) }
          : tx,
      ),
    )
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id))
  }

  const resetFilters = () => {
    setFilters({ search: '', type: 'all', sortBy: 'date-desc' })
  }

  const exportAsJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'transactions.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportAsCSV = () => {
    const headers = ['date', 'amount', 'category', 'type', 'note']
    const lines = transactions.map((tx) =>
      [tx.date, tx.amount, tx.category, tx.type, tx.note || '']
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(','),
    )
    const csv = [headers.join(','), ...lines].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'transactions.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AppContext.Provider
      value={{
        transactions,
        filteredTransactions,
        totals,
        summaryTrends,
        filters,
        setFilters,
        resetFilters,
        role,
        setRole,
        darkMode,
        setDarkMode,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        exportAsJSON,
        exportAsCSV,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}
