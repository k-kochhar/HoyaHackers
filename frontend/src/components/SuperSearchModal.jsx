import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, Combobox } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SuperSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    if (!query.trim()) return

    try {
      setIsSearching(true)
      const response = await fetch('http://localhost:3001/special-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed')
      }

      if (!data.applicants) {
        throw new Error('No applicants data received')
      }

      console.log('Search response:', data) // Debug log
      setResults(Object.values(data.applicants || {}))
    } catch (error) {
      console.error('Search error:', error)
      setResults([]) // Clear results on error
    } finally {
      setIsSearching(false)
    }
  }

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Auto-focus the input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500/20 rounded-xl bg-white/80 shadow-2xl ring-1 ring-black/5 backdrop-blur transition-all">
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 sm:text-sm placeholder:text-gray-500"
                  placeholder="Search for candidates with specific qualifications..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
              </div>

              {/* Results */}
              <div className="max-h-96 scroll-py-2 overflow-y-auto p-2">
                {isSearching ? (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((candidate) => (
                      <div
                        key={candidate.UID}
                        className="group rounded-md p-3 hover:bg-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                              {candidate.name}
                              <span className="ml-2 text-sm font-normal text-gray-500">
                                {candidate.education}
                              </span>
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                              {candidate.justification}
                            </p>
                          </div>
                          <span className="ml-4 text-sm font-medium text-indigo-600">
                            Score: {candidate.initial_score}/10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : query && !isSearching ? (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No candidates found. Try different search terms.
                  </div>
                ) : (
                  <div className="p-4 text-sm text-gray-500">
                    <p className="text-center font-semibold mb-2">Search Examples:</p>
                    <ul className="space-y-2 text-center">
                      <li>"Experienced frontend developers with React"</li>
                      <li>"Recent graduates with machine learning experience"</li>
                      <li>"Strong problem-solving skills and team collaboration"</li>
                    </ul>
                  </div>
                )}
              </div>

              {query && (
                <div className="p-2 flex justify-end bg-gray-50/50">
                  <kbd className="text-xs text-gray-500">
                    press <span className="font-semibold">enter</span> to search
                  </kbd>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 