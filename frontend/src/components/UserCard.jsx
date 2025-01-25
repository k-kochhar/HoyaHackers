'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

// Mock data for testing
export const mockUsers = [
  {
    id: 1,
    fullName: 'Sarah Chen',
    userScore: 9,
    currentStep: 'Technical Interview',
    username: 'schen2024',
    graduationYear: 2024,
    college: 'Stanford University',
    yearsOfExperience: 2,
    gpa: 3.92,
    email: 'sarah.chen@stanford.edu',
    phoneNumber: '(650) 555-0123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    notes: 'Exceptional candidate with strong algorithmic skills. Previous internship at Google. Great culture fit and shows strong leadership potential.',
  },
  {
    id: 2,
    fullName: 'Marcus Johnson',
    userScore: 8,
    currentStep: 'Initial Screening',
    username: 'mjohnson',
    graduationYear: 2023,
    college: 'MIT',
    yearsOfExperience: 1,
    gpa: 3.85,
    email: 'marcus.j@mit.edu',
    phoneNumber: '(617) 555-0156',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    notes: 'Strong academic background in ML/AI. Published research paper in NLP. Excellent problem-solving skills demonstrated in coding challenge.',
  },
  {
    id: 3,
    fullName: 'Emily Rodriguez',
    userScore: 7,
    currentStep: 'Phone Screen',
    username: 'erodriguez',
    graduationYear: 2024,
    college: 'UC Berkeley',
    yearsOfExperience: 3,
    gpa: 3.76,
    email: 'emily.r@berkeley.edu',
    phoneNumber: '(510) 555-0189',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    notes: 'Great communication skills. Previous experience in full-stack development. Shows strong potential for growth and leadership.',
  },
  {
    id: 4,
    fullName: 'David Kim',
    userScore: 8,
    currentStep: 'Technical Interview',
    username: 'dkim2024',
    graduationYear: 2024,
    college: 'Carnegie Mellon University',
    yearsOfExperience: 2,
    gpa: 3.88,
    email: 'david.kim@cmu.edu',
    phoneNumber: '(412) 555-0134',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    notes: 'Strong systems design background. Won multiple hackathons. Excellent team player with proven track record in collaborative projects.',
  },
]

function UserCard({ user }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const scoreColorClass = 
    user.userScore >= 9 ? 'bg-green-50 text-green-700 ring-green-600/20' :
    user.userScore >= 7 ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
    'bg-yellow-50 text-yellow-700 ring-yellow-600/20'

  return (
    <div className="space-y-3">
      {/* Main Card */}
      <div className="bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                className="h-12 w-12 rounded-full"
                src={user.avatar}
                alt=""
                width={48}
                height={48}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
                <p className="text-sm text-gray-500">{user.currentStep}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${scoreColorClass}`}
              >
                Score: {user.userScore}/10
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {isExpanded ? (
                  <>
                    Less info
                    <ChevronUpIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    More info
                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="bg-gray-50 rounded-lg shadow-inner p-6 ml-16 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Basic Information</h4>
                <dl className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-600">Username:</dt>
                    <dd className="text-sm text-gray-900">{user.username}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-600">Graduation Year:</dt>
                    <dd className="text-sm text-gray-900">{user.graduationYear}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-600">College:</dt>
                    <dd className="text-sm text-gray-900">{user.college}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-600">Years of Experience:</dt>
                    <dd className="text-sm text-gray-900">{user.yearsOfExperience}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-600">GPA:</dt>
                    <dd className="text-sm text-gray-900">{user.gpa}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                <dl className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-600">Email:</dt>
                    <dd className="text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-600">Phone:</dt>
                    <dd className="text-sm text-gray-900">{user.phoneNumber}</dd>
                  </div>
                </dl>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                <p className="mt-2 text-sm text-gray-600">{user.notes}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PhoneIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Schedule Phone Screen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function UserCardList({ users = mockUsers }) {
  return (
    <div className="space-y-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
