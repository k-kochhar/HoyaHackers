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

export default function SearchBar() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({})

  return (
    <div className="flex items-center gap-x-4">
      {/* Search input */}
      <div className="flex flex-1 items-center">
        <div className="w-full max-w-lg lg:max-w-xs">
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
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search candidates..."
              type="search"
            />
          </div>
        </div>
      </div>

      {/* Filter button */}
      <Popover className="relative">
        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold text-gray-900 bg-white px-3 py-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          Filters
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="space-y-4">
              {filterOptions.map((section) => (
                <div key={section.id}>
                  <h3 className="text-sm font-medium text-gray-900">{section.name}</h3>
                  <div className="mt-2 space-y-2">
                    {section.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={option.value}
                          name={section.id}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor={option.value} className="ml-3 text-sm text-gray-600">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Apply filters
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

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