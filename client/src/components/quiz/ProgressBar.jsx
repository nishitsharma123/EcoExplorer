export default function Progressbar({ answeredCount, total }) {
  const percentage = Math.round((answeredCount / total) * 100)

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-600 mb-1">
        Progress: {answeredCount}/{total}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
