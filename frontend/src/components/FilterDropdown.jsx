import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FilterDropdown({ onFilterChange }) {
  const [filters, setFilters] = useState({
    status: '',
    min_score: '',
    min_gpa: '',
    phone_screen: ''
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      status: '',
      min_score: '',
      min_gpa: '',
      phone_screen: ''
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <FunnelIcon className="-ml-0.5 h-5 w-5 text-indigo-500" aria-hidden="true" />
          <span className="text-indigo-600">Filters</span>
          {Object.values(filters).some(Boolean) && (
            <span className="ml-2 inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
              Active
            </span>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4">
            <div className="space-y-4">
              {/* Status Filter */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-indigo-900">
                  Status
                </label>
                <select
                  id="status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="mt-1 block w-full rounded-md border-2 border-gray-200 py-2 pl-3 pr-10 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 hover:border-gray-300"
                >
                  <option value="">All</option>
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Minimum Score Filter */}
              <div>
                <label htmlFor="min_score" className="block text-sm font-medium text-indigo-900">
                  Minimum Score
                </label>
                <select
                  id="min_score"
                  value={filters.min_score}
                  onChange={(e) => handleFilterChange('min_score', e.target.value)}
                  className="mt-1 block w-full rounded-md border-2 border-gray-200 py-2 pl-3 pr-10 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 hover:border-gray-300"
                >
                  <option value="">Any</option>
                  <option value="7">7+</option>
                  <option value="8">8+</option>
                  <option value="9">9+</option>
                </select>
              </div>

              {/* Minimum GPA Filter */}
              <div>
                <label htmlFor="min_gpa" className="block text-sm font-medium text-indigo-900">
                  Minimum GPA
                </label>
                <select
                  id="min_gpa"
                  value={filters.min_gpa}
                  onChange={(e) => handleFilterChange('min_gpa', e.target.value)}
                  className="mt-1 block w-full rounded-md border-2 border-gray-200 py-2 pl-3 pr-10 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 hover:border-gray-300"
                >
                  <option value="">Any</option>
                  <option value="3.0">3.0+</option>
                  <option value="3.5">3.5+</option>
                  <option value="3.7">3.7+</option>
                  <option value="3.9">3.9+</option>
                </select>
              </div>

              {/* Phone Screen Filter */}
              <div>
                <label htmlFor="phone_screen" className="block text-sm font-medium text-indigo-900">
                  Phone Screen
                </label>
                <select
                  id="phone_screen"
                  value={filters.phone_screen}
                  onChange={(e) => handleFilterChange('phone_screen', e.target.value)}
                  className="mt-1 block w-full rounded-md border-2 border-gray-200 py-2 pl-3 pr-10 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 hover:border-gray-300"
                >
                  <option value="">All</option>
                  <option value="not completed">Not Completed</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              {Object.values(filters).some(Boolean) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-2 w-full rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 