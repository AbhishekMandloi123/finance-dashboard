import {
  BarChart3,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  ReceiptText,
  X,
} from 'lucide-react'

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'charts', label: 'Analytics', icon: BarChart3 },
  { id: 'transactions', label: 'Transactions', icon: ReceiptText },
]

function Sidebar({
  isCollapsed,
  onToggleCollapse,
  activeSection,
  onSectionChange,
  isMobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-700 bg-slate-900 p-3 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} lg:translate-x-0`}
      >
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-300 hover:bg-slate-700"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>

          <button
            type="button"
            onClick={onCloseMobile}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5 px-2">
          {!isCollapsed && (
            <>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 transition-opacity duration-200">
                Workspace
              </p>
              <h2 className="mt-2 font-heading text-lg font-semibold text-white transition-opacity duration-200">
                Fintech Suite
              </h2>
            </>
          )}
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  onSectionChange(item.id)
                  onCloseMobile()
                }}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon size={18} className="shrink-0" />
                {!isCollapsed && <span className="transition-opacity duration-200">{item.label}</span>}

                {isCollapsed && (
                  <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-xs font-medium text-slate-200 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 lg:block">
                    {item.label}
                  </span>
                )}
              </a>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
