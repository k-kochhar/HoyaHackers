export function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-white shadow-sm rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-gray-200 rounded-full" />
            <div>
              <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-60 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoadingStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="overflow-hidden rounded-lg bg-white shadow animate-pulse">
          <div className="p-5">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-200 rounded" />
              <div className="ml-5 w-0 flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-12 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function LoadingJob() {
  return (
    <div className="mb-8 border-b border-gray-200 pb-8 animate-pulse">
      <div className="md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 bg-gray-200 rounded-full" />
          </div>
          <div className="pt-1.5">
            <div className="h-8 w-64 bg-gray-200 rounded mb-3" />
            <div className="flex space-x-4">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex md:mt-0">
          <div className="h-10 w-36 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
} 