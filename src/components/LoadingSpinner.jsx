export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-16 h-16">
        <div className="spinner w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
      </div>
      <p className="mt-4 text-gray-600 font-semibold">Processing...</p>
    </div>
  )
}