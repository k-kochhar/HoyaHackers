'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, PhoneIcon, AcademicCapIcon, BriefcaseIcon, EnvelopeIcon, PhoneIcon as PhoneIconOutline } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
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
    user.initial_score >= 9 ? 'bg-green-50 text-green-700 ring-green-600/20' :
    user.initial_score >= 7 ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
    'bg-yellow-50 text-yellow-700 ring-yellow-600/20'

  return (
    <div className="space-y-3">
      {/* Main Card */}
      <div className="bg-white shadow-sm rounded-xl hover:shadow-md transition-shadow duration-200 border border-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                  {user.name.charAt(0)}
                </div>
                <span className="absolute -bottom-1 -right-1 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <div className="mt-1 flex items-center gap-x-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{user.status}</span>
                  <span className="text-gray-400">•</span>
                  <span>{user.education}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${scoreColorClass}`}
                >
                  {user.initial_score}/10
                </span>
                <div className="mt-1 flex items-center">
                  {[...Array(Math.floor(user.initial_score / 2))].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
        <div className="relative ml-8 rounded-xl bg-white shadow-sm border border-gray-100">
          <div className="absolute -left-4 top-8 h-8 w-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-gray-300" />
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Academic Information */}
              <div className="col-span-1 space-y-6">
                <div>
                  <h4 className="flex items-center text-sm font-medium text-gray-900">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                    Academic Information
                  </h4>
                  <dl className="mt-4 space-y-3">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-gray-500">Education</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">{user.education}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-gray-500">Graduation Year</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">{user.graduation_year}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-gray-500">GPA</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">{user.gpa}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Professional Information */}
              <div className="col-span-1 space-y-6">
                <div>
                  <h4 className="flex items-center text-sm font-medium text-gray-900">
                    <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                    Professional Details
                  </h4>
                  <dl className="mt-4 space-y-3">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-gray-500">Years of Experience</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">{user.yoe} years</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-gray-500">Status</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">{user.status}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Contact Information */}
              <div className="col-span-1 space-y-6">
                <div>
                  <h4 className="flex items-center text-sm font-medium text-gray-900">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                    Contact Information
                  </h4>
                  <dl className="mt-4 space-y-3">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">{user.phone}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h4 className="text-sm font-medium text-gray-900">Evaluation Notes</h4>
              <p className="mt-2 text-sm text-gray-600 leading-6">{user.notes}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-x-4">
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View Resume
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PhoneIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Schedule Phone Screen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function UserCardList({ users = [] }) {
  return (
    <div className="space-y-6">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  )
}
