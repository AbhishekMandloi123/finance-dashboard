import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/transactions': 'Transactions',
  '/charts': 'Analytics & Charts',
  '/settings': 'Settings',
}

export default function Header() {
  const { role, isAdmin, toggleRole } = useAuth()
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Finance Dashboard'

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
            <span className="text-sm text-gray-600">Role:</span>
            <span className={`text-sm font-semibold ${isAdmin ? 'text-purple-600' : 'text-indigo-600'}`}>
              {isAdmin ? '👑 Admin' : '👤 User'}
            </span>
          </div>

          <button
            onClick={toggleRole}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              isAdmin
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Switch to {isAdmin ? 'User' : 'Admin'}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              {isAdmin ? 'A' : 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
