'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import UserCardList from '@/components/UserCard'
import SearchBar from '@/components/SearchBar'
import Sidebar from '@/components/Sidebar'

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
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
              {/* Header */}
              <div className="mb-8 border-b border-gray-200 pb-5">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:flex-auto">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      Talent Acquisition Dashboard
                    </h1>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Track and manage candidate applications, schedule interviews, and make hiring decisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats cards */}
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UsersIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">Active Candidates</dt>
                          <dd className="text-lg font-medium text-gray-900">24</dd>
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
                          <dt className="truncate text-sm font-medium text-gray-500">Interviews This Week</dt>
                          <dd className="text-lg font-medium text-gray-900">12</dd>
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
                          <dt className="truncate text-sm font-medium text-gray-500">Offers Extended</dt>
                          <dd className="text-lg font-medium text-gray-900">8</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filters Section */}
              <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                <div className="flex-1">
                  <SearchBar />
                </div>
                <div className="flex items-center ml-2">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add candidate
                  </button>
                </div>
              </div>

              {/* User Cards */}
              <div className="mt-6">
                <UserCardList />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
} 