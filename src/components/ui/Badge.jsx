const variants = {
  Completed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Failed: 'bg-red-100 text-red-700',
  Income: 'bg-blue-100 text-blue-700',
  Shopping: 'bg-purple-100 text-purple-700',
  Food: 'bg-orange-100 text-orange-700',
  Utilities: 'bg-gray-100 text-gray-700',
  Entertainment: 'bg-pink-100 text-pink-700',
}

export default function Badge({ label }) {
  const cls = variants[label] || 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {label}
    </span>
  )
}
