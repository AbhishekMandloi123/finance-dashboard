export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

export const formatCompactIndianCurrency = (value) => {
  const absoluteValue = Math.abs(value)
  const prefix = value < 0 ? '-' : ''

  if (absoluteValue >= 10000000) {
    return `${prefix}₹${(absoluteValue / 10000000).toFixed(1)}Cr`
  }

  if (absoluteValue >= 100000) {
    return `${prefix}₹${(absoluteValue / 100000).toFixed(1)}L`
  }

  if (absoluteValue >= 1000) {
    return `${prefix}₹${(absoluteValue / 1000).toFixed(1)}K`
  }

  return `${prefix}₹${absoluteValue}`
}

export const formatDate = (value) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))

export const compareBySort = (a, b, sortBy) => {
  if (sortBy === 'amount-asc') return a.amount - b.amount
  if (sortBy === 'amount-desc') return b.amount - a.amount
  if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date)
  return new Date(b.date) - new Date(a.date)
}

export const filterAndSortTransactions = (transactions, filters) => {
  const { search, type, sortBy } = filters
  return transactions
    .filter((tx) => {
      const categoryMatch = tx.category
        .toLowerCase()
        .includes(search.toLowerCase().trim())
      const typeMatch = type === 'all' || tx.type === type
      return categoryMatch && typeMatch
    })
    .sort((a, b) => compareBySort(a, b, sortBy))
}

export const getTotals = (transactions) => {
  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)
  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  return {
    totalIncome,
    totalExpenses,
    totalBalance: totalIncome - totalExpenses,
  }
}

const getMonthTotals = (transactions, targetMonth, targetYear) => {
  const scoped = transactions.filter((tx) => {
    const date = new Date(tx.date)
    return date.getMonth() === targetMonth && date.getFullYear() === targetYear
  })

  const income = scoped
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)
  const expenses = scoped
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

const getChangePercent = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100
  return ((current - previous) / previous) * 100
}

export const getSummaryTrends = (transactions) => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const previousMonthDate = new Date(currentYear, currentMonth - 1, 1)

  const current = getMonthTotals(transactions, currentMonth, currentYear)
  const previous = getMonthTotals(
    transactions,
    previousMonthDate.getMonth(),
    previousMonthDate.getFullYear(),
  )

  return {
    balance: getChangePercent(current.balance, previous.balance),
    income: getChangePercent(current.income, previous.income),
    expense: getChangePercent(current.expenses, previous.expenses),
  }
}

export const getExpenseByCategory = (transactions) => {
  const categoryTotals = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount
      return acc
    }, {})

  return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
}

export const getBalanceTrendData = (transactions) => {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
  let runningBalance = 0

  return sorted.map((tx) => {
    runningBalance += tx.type === 'income' ? tx.amount : -tx.amount
    return {
      date: tx.date,
      balance: runningBalance,
    }
  })
}

export const getIncomeVsExpensesData = (transactions) => {
  const monthlyData = {}

  transactions.forEach((tx) => {
    const date = new Date(tx.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthLabel = date.toLocaleDateString('en-US', { month: 'short' })

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        key: monthKey,
        month: monthLabel,
        income: 0,
        expense: 0,
      }
    }

    if (tx.type === 'income') {
      monthlyData[monthKey].income += tx.amount
    } else {
      monthlyData[monthKey].expense += tx.amount
    }
  })

  return Object.values(monthlyData)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((item) => ({
      month: item.month,
      income: item.income,
      expense: item.expense,
      expenses: item.expense,
    }))
}

export const getInsights = (transactions) => {
  const expenseByCategory = getExpenseByCategory(transactions)
  const highestCategory = expenseByCategory.sort((a, b) => b.value - a.value)[0]

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const previousMonthDate = new Date(currentYear, currentMonth - 1, 1)

  const isInMonth = (value, targetMonth, targetYear) => {
    const date = new Date(value)
    return date.getMonth() === targetMonth && date.getFullYear() === targetYear
  }

  const thisMonthExpense = transactions
    .filter(
      (tx) =>
        tx.type === 'expense' && isInMonth(tx.date, currentMonth, currentYear),
    )
    .reduce((sum, tx) => sum + tx.amount, 0)

  const previousMonthExpense = transactions
    .filter(
      (tx) =>
        tx.type === 'expense' &&
        isInMonth(
          tx.date,
          previousMonthDate.getMonth(),
          previousMonthDate.getFullYear(),
        ),
    )
    .reduce((sum, tx) => sum + tx.amount, 0)

  const delta = thisMonthExpense - previousMonthExpense
  const trendLabel =
    delta === 0 ? 'No change' : delta > 0 ? 'Increased' : 'Decreased'

  return {
    highestCategory,
    thisMonthExpense,
    delta,
    trendLabel,
  }
}
