import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function JobModal({ isOpen, onClose, jobTitle, jobDescription }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => (
                        <h1 className="text-3xl font-bold text-gray-900 mb-2" {...props} />
                      ),
                      h2: ({node, ...props}) => (
                        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />
                      ),
                      p: ({node, ...props}) => (
                        <p className="text-base text-gray-600 mb-4 leading-relaxed" {...props} />
                      ),
                      ul: ({node, ...props}) => (
                        <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
                      ),
                      ol: ({node, ...props}) => (
                        <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
                      ),
                      li: ({node, ...props}) => (
                        <li className="text-gray-600" {...props} />
                      ),
                      strong: ({node, ...props}) => (
                        <strong className="font-semibold text-gray-900" {...props} />
                      ),
                      hr: ({node, ...props}) => (
                        <hr className="my-6 border-gray-200" {...props} />
                      ),
                      a: ({node, ...props}) => (
                        <a 
                          className="text-indigo-600 hover:text-indigo-500 font-medium" 
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      ),
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-indigo-200 pl-4 italic my-4 text-gray-600" {...props} />
                      ),
                    }}
                  >
                    {jobDescription}
                  </ReactMarkdown>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 