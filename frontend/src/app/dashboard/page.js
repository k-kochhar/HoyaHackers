'use client'

import { Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import UserCardList from '@/components/UserCard'
import SearchBar from '@/components/SearchBar'
import Sidebar from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import JobHeader from '@/components/JobHeader'
import { LoadingStats } from '@/components/LoadingSkeleton'
import FilterDropdown from '@/components/FilterDropdown'
import AddCandidateModal from '@/components/AddCandidateModal'
import SuperSearchModal from '@/components/SuperSearchModal'

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [resumes, setResumes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    total_candidates: 0,
    completed_screens: 0,
    high_potential: 0
  })
  const [filters, setFilters] = useState({
    status: '',
    min_score: '',
    min_gpa: '',
    phone_screen: ''
  })
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [noResults, setNoResults] = useState(false)
  const [showSuperSearch, setShowSuperSearch] = useState(false)

  useEffect(() => {
    fetchResumes(currentPage)
    fetchStats()
  }, [currentPage, filters, searchQuery])

  const fetchStats = async () => {
    try {
      setStatsLoading(true)
      const response = await fetch('http://localhost:3001/api/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setStatsLoading(false)
    }
  }

  const fetchResumes = async (page) => {
    try {
      setLoading(true)
      setNoResults(false)
      
      const queryParams = new URLSearchParams({
        page: page,
        per_page: 5,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== '')),
        ...(searchQuery && { search: searchQuery })
      })
      
      const response = await fetch(`http://localhost:3001/api/resumes?${queryParams}`)
      if (!response.ok) {
        throw new Error('Failed to fetch resumes')
      }
      const data = await response.json()
      setResumes(data.resumes)
      setTotalPages(data.total_pages)
      
      if (searchQuery && data.total === 0) {
        setNoResults(true)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleUploadSuccess = () => {
    // Refresh the resumes list and stats
    fetchResumes(currentPage)
    fetchStats()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              {/* Brand and Breadcrumbs */}
              <div className="flex flex-1 items-center">

                <nav className="flex" aria-label="Breadcrumb">
                  <ol role="list" className="flex items-center space-x-2">
                    <li>
                      <div className="flex items-center text-sm">
                        <a href="#" className="text-gray-500 hover:text-gray-700">Dashboard</a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center text-sm">
                        <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-gray-400 rotate-90" aria-hidden="true" />
                        <a href="#" className="ml-2 text-gray-500 hover:text-gray-700">Candidates</a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center text-sm">
                        <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-gray-400 rotate-90" aria-hidden="true" />
                        <span className="ml-2 font-medium text-gray-900">Active</span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="/headshot.png"
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        Kshitij Kochhar
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Job Header */}
              <JobHeader />

              {/* Stats cards */}
              {statsLoading ? (
                <LoadingStats />
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <UsersIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="truncate text-sm font-medium text-gray-500">Total Candidates</dt>
                            <dd className="text-lg font-medium text-gray-900">{stats.total_candidates}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <ChartPieIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="truncate text-sm font-medium text-gray-500">Phone Screens Completed</dt>
                            <dd className="text-lg font-medium text-gray-900">{stats.completed_screens}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <DocumentDuplicateIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="truncate text-sm font-medium text-gray-500">High Potential</dt>
                            <dd className="text-lg font-medium text-gray-900">{stats.high_potential}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Search and Filters Section */}
              <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                <div className="flex-1 mr-4">
                  <SearchBar onSearch={handleSearch} />
                </div>
                <div className="flex items-center space-x-4">
                  <FilterDropdown onFilterChange={handleFilterChange} />
                  <button
                    type="button"
                    onClick={() => setShowAddCandidateModal(true)}
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add candidate
                  </button>
                </div>
              </div>

              {/* User Cards */}
              <div className="mt-6">
                {error ? (
                  <div className="text-red-600 text-center py-8">{error}</div>
                ) : noResults ? (
                  <div className="text-center py-8">
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No candidates found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filters to find what you&apos;re looking for.
                    </p>
                  </div>
                ) : (
                  <>
                    <UserCardList users={resumes} loading={loading} />
                    {!loading && (
                      <div className="mt-6">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Candidate Modal */}
      <AddCandidateModal
        isOpen={showAddCandidateModal}
        onClose={() => setShowAddCandidateModal(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* Super Search Modal */}
      <SuperSearchModal 
        isOpen={showSuperSearch} 
        onClose={() => setShowSuperSearch(false)} 
      />
    </div>
  )
} 