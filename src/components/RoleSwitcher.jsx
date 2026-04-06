import { useAppContext } from '../context/AppContext'

function RoleSwitcher() {
  const { role, setRole, darkMode } = useAppContext()

  const options = [
    { label: 'Viewer', value: 'viewer' },
    { label: 'Admin', value: 'admin' },
  ]

  const activeIndex = options.findIndex((option) => option.value === role)

  return (
    <div
      className={`rounded-lg p-1 shadow-md ${
        darkMode ? 'border border-slate-700 bg-slate-800' : 'border border-slate-200 bg-slate-100'
      }`}
    >
      <div className="relative grid grid-cols-2 gap-1">
        <span
          className={`pointer-events-none absolute bottom-1 top-1 w-[calc(50%-0.125rem)] rounded-md shadow-sm transition-all duration-300 ease-out ${
            darkMode ? 'bg-blue-600' : 'bg-slate-900'
          }`}
          style={{
            left: activeIndex === 0 ? '0.25rem' : 'calc(50% + 0.125rem)',
          }}
          aria-hidden="true"
        />

        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setRole(option.value)}
            className={`relative z-10 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 sm:text-sm ${
              role === option.value
                ? 'text-white'
                : darkMode
                  ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                  : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RoleSwitcher
