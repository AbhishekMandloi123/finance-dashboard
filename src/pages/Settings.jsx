import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { isAdmin } = useAuth()
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('en')

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )

  return (
    <div className="space-y-6 max-w-2xl">
      {/* General Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">General Settings</h2>
        <p className="text-sm text-gray-500 mb-6">Manage your preferences</p>

        <div className="space-y-5">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-800">Push Notifications</p>
              <p className="text-xs text-gray-500">Receive alerts for transactions</p>
            </div>
            <Toggle value={notifications} onChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-800">Email Alerts</p>
              <p className="text-xs text-gray-500">Get weekly summary emails</p>
            </div>
            <Toggle value={emailAlerts} onChange={setEmailAlerts} />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-800">Currency</p>
              <p className="text-xs text-gray-500">Display currency for amounts</p>
            </div>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-800">Language</p>
              <p className="text-xs text-gray-500">Interface language</p>
            </div>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>

      {/* Admin-only section */}
      {isAdmin && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <span>👑</span>
            <h2 className="text-lg font-semibold text-gray-800">Admin: User Management</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">Manage users and permissions (Admin only)</p>

          <div className="space-y-3">
            {[
              { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
              { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
              { name: 'Carol White', email: 'carol@example.com', role: 'User', status: 'Inactive' },
            ].map(user => (
              <div key={user.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>{user.role}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>{user.status}</span>
                  <button className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 hover:bg-gray-200 rounded">Edit</button>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full py-2.5 border-2 border-dashed border-purple-200 text-purple-600 text-sm font-medium rounded-xl hover:bg-purple-50 transition-colors">
            + Add New User
          </button>
        </div>
      )}

      {!isAdmin && (
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🔒</div>
            <p className="font-medium text-gray-600">Admin Access Required</p>
            <p className="text-sm mt-1">Switch to Admin role to access user management features.</p>
          </div>
        </div>
      )}
    </div>
  )
}
