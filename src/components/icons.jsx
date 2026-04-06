function BaseIcon({ children, className = 'h-5 w-5', strokeWidth = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function WalletIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a3 3 0 0 1 3 3v1H6.5A2.5 2.5 0 0 0 4 11.5V14a2.5 2.5 0 0 0 2.5 2.5H21V18a3 3 0 0 1-3 3H5.5A2.5 2.5 0 0 1 3 18.5z" />
      <path d="M21 9v7.5H8.5A2.5 2.5 0 0 1 6 14v-2.5A2.5 2.5 0 0 1 8.5 9z" />
      <circle cx="15.5" cy="12.75" r="0.9" fill="currentColor" stroke="none" />
    </BaseIcon>
  )
}

export function ArrowUpCircleIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 11.5 3.5-3.5 3.5 3.5" />
      <path d="M12 8v8" />
    </BaseIcon>
  )
}

export function ArrowDownCircleIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 12.5-3.5 3.5-3.5-3.5" />
      <path d="M12 8v8" />
    </BaseIcon>
  )
}

export function ChartPulseIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M3 17h3.5l2.5-5 3 7L15 10l2.5 4H21" />
      <path d="M4 6h16" />
    </BaseIcon>
  )
}

export function PieInsightIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M12 3v9h9" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </BaseIcon>
  )
}

export function BoltIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="m13 2-7 11h5l-1 9 8-12h-5z" />
    </BaseIcon>
  )
}

export function MenuSidebarIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
    </BaseIcon>
  )
}

export function DashboardIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </BaseIcon>
  )
}

export function TableIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M9 10v10" />
      <path d="M15 10v10" />
    </BaseIcon>
  )
}

export function SparkleIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M12 4 13.8 8.2 18 10l-4.2 1.8L12 16l-1.8-4.2L6 10l4.2-1.8z" />
    </BaseIcon>
  )
}

export function SunIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.9 19.1 1.4-1.4" />
      <path d="m17.7 6.3 1.4-1.4" />
    </BaseIcon>
  )
}

export function MoonIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M14.5 3a8.5 8.5 0 1 0 6.5 12.7A7 7 0 1 1 14.5 3z" />
    </BaseIcon>
  )
}

export function PlusIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </BaseIcon>
  )
}

export function SearchIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </BaseIcon>
  )
}
