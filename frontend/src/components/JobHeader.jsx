import { useState, useEffect } from 'react'
import { BriefcaseIcon, BuildingOffice2Icon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import JobModal from './JobModal'
import Image from 'next/image'
import { LoadingJob } from './LoadingSkeleton'

export default function JobHeader() {
  const [showJobModal, setShowJobModal] = useState(false)
  const [jobInfo, setJobInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobInfo()
  }, [])

  const fetchJobInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/job')
      if (!response.ok) {
        throw new Error('Failed to fetch job information')
      }
      const data = await response.json()
      setJobInfo(data)
    } catch (error) {
      console.error('Error fetching job info:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingJob />
  }

  if (!jobInfo) {
    return null
  }

  return (
    <>
      <div className="mb-8 border-b border-gray-200 pb-8">
        <div className="md:flex md:items-center md:justify-between md:space-x-5">
          <div className="flex items-start space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-600">
                  <BriefcaseIcon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 ring-2 ring-white">
                  <span className="block h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
              </div>
            </div>
            <div className="pt-1.5">
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mr-2">
                  Hiring
                </span>
                {jobInfo.job_title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <BuildingOffice2Icon className="h-4 w-4" />
                  <span>Hybrid</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>3 days in office</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>12 weeks (Summer 2024)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              onClick={() => setShowJobModal(true)}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Full Description
            </button>
          </div>
        </div>
      </div>

      <JobModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        jobTitle={jobInfo.job_title}
        jobDescription={jobInfo.job_description}
      />
    </>
  )
} 