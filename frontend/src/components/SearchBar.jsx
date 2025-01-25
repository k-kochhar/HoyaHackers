'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition, Popover } from '@headlessui/react'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'

const filterOptions = [
  {
    id: 'score',
    name: 'Score Range',
    options: [
      { value: '9-10', label: '9-10 (Exceptional)' },
      { value: '7-8', label: '7-8 (Strong)' },
      { value: '5-6', label: '5-6 (Average)' },
      { value: '0-4', label: 'Below 5' },
    ],
  },
  {
    id: 'experience',
    name: 'Years of Experience',
    options: [
      { value: '0-1', label: '0-1 years' },
      { value: '1-2', label: '1-2 years' },
      { value: '2-3', label: '2-3 years' },
      { value: '3+', label: '3+ years' },
    ],
  },
  {
    id: 'gpa',
    name: 'GPA Range',
    options: [
      { value: '3.8-4.0', label: '3.8-4.0' },
      { value: '3.5-3.79', label: '3.5-3.79' },
      { value: '3.0-3.49', label: '3.0-3.49' },
      { value: 'below-3.0', label: 'Below 3.0' },
    ],
  },
]

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    onSearch(searchQuery.trim())
    setIsSearching(false)
  }


  return (
    <div className="flex items-center gap-x-4">
      {/* Search input */}
      <div className="flex flex-1 items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search candidates
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search candidates..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />

          </div>
        </form>
      </div>

      {/* Super Search button */}
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <SparklesIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Super Search
      </button>
    </div>
  )
} 