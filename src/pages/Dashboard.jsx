import { useState } from 'react'
import SummaryCard from '../components/SummaryCard'
import ChartSection from '../components/ChartSection'
import TransactionTable from '../components/TransactionTable'
import RoleSwitcher from '../components/RoleSwitcher'
import Insights from '../components/Insights'
import Sidebar from '../components/Sidebar'
import { useAppContext } from '../context/AppContext'
import { Menu } from 'lucide-react'
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  MoonIcon,
  SunIcon,
  WalletIcon,
} from '../components/icons'

function Dashboard() {
  const { totals, role, darkMode, setDarkMode, summaryTrends } = useAppContext()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div
        className={`px-4 py-4 transition-all duration-300 ease-in-out sm:px-6 lg:px-8 lg:py-8 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <header
            className={`animate-fade-up rounded-xl p-5 shadow-lg sm:p-6 ${
              darkMode
                ? 'border-0 bg-gradient-to-r from-blue-600 to-cyan-600'
                : 'border border-slate-200 bg-white'
            }`}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg transition lg:hidden ${
                    darkMode
                      ? 'border border-white/30 bg-white/15 text-white hover:bg-white/25'
                      : 'border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  aria-label="Open sidebar"
                >
                  <Menu size={18} />
                </button>
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                    darkMode ? 'text-white/80' : 'text-slate-500'
                  }`}
                >
                  Fintech Control Center
                </p>
                <h1
                  className={`mt-2 font-heading text-3xl font-bold leading-tight sm:text-4xl ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Finance Dashboard
                </h1>
                <p
                  className={`mt-2 max-w-2xl text-sm sm:text-base ${
                    darkMode ? 'text-white/85' : 'text-slate-600'
                  }`}
                >
                  Track balances, monitor spending trends, and manage every transaction with premium clarity.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <RoleSwitcher />
                <button
                  type="button"
                  onClick={() => setDarkMode((prev) => !prev)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    darkMode
                      ? 'border border-white/30 bg-white/15 text-white hover:bg-white/25'
                      : 'border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {darkMode ? (
                    <SunIcon className="h-[18px] w-[18px] text-amber-300" />
                  ) : (
                    <MoonIcon className="h-[18px] w-[18px] text-cyan-300" />
                  )}
                  {darkMode ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>

            <p
              className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                darkMode
                  ? 'border border-white/30 bg-white/10 text-white'
                  : 'border border-slate-300 bg-slate-100 text-slate-700'
              }`}
            >
              Current access: {role}
            </p>
          </header>

          <section id="overview" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              title="Total Balance"
              value={totals.totalBalance}
              icon={WalletIcon}
              change={summaryTrends.balance}
              accent="balance"
            />
            <SummaryCard
              title="Total Income"
              value={totals.totalIncome}
              icon={ArrowUpCircleIcon}
              change={summaryTrends.income}
              accent="income"
            />
            <SummaryCard
              title="Total Expenses"
              value={totals.totalExpenses}
              icon={ArrowDownCircleIcon}
              change={summaryTrends.expense}
              accent="expense"
            />
          </section>

          <section id="charts" className="mt-6 space-y-6">
            <ChartSection />
            <Insights />
          </section>

          <section id="transactions" className="mt-6 pb-2">
            <TransactionTable />
          </section>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
