"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faPhone,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/20/solid";

// Update navigation array
const navigation = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "FAQ", href: "#faq" }, // Changed from Contact to FAQ
];

const faqs = [
  {
    id: 1,
    question: "How does the AI-powered screening work?",
    answer:
      "Our AI-powered screening tool analyzes resumes and ranks candidates based on their qualifications, experience, and skills. It uses advanced algorithms to ensure accurate and unbiased results.",
  },
  {
    id: 2,
    question: "Can I customize the screening criteria?",
    answer:
      "Yes, you can customize the screening criteria based on your specific requirements. Our tool allows you to set parameters such as required skills, experience levels, and educational qualifications.",
  },
  {
    id: 3,
    question: "How does the preliminary interview process work?",
    answer:
      "Our AI bot conducts preliminary interviews by asking candidates a series of predefined questions. The responses are analyzed and scored to provide an initial assessment of the candidate’s suitability for the role.",
  },
  {
    id: 4,
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. All data is encrypted and stored securely. We comply with industry standards and regulations to ensure your data is protected.",
  },
  {
    id: 5,
    question: "Can I integrate this tool with my existing ATS?",
    answer:
      "Yes, our tool can be integrated with most Applicant Tracking Systems (ATS). We provide APIs and support to help you seamlessly integrate our tool with your existing systems.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add useEffect for smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#home">
              <span className="sr-only">Your Company</span>
              <div className="flex h-16 shrink-0 items-center">
                <div className="flex items-center gap-x-4 mr-12">
                  <span className="text-3xl font-semibold text-indigo-600">
                    HireFlow
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/dashboard"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">HireFlow</span>
                <Image
                  alt="dashboard"
                  src="/dashboard.png"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Add these IDs to your corresponding sections */}
      <section
        id="home"
        className="relative overflow-hidden bg-gray-50 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Simplify Your Recruiting Process
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our AI-powered tool helps you screen resumes and conduct
              preliminary interviews, making your recruiting process faster and
              more efficient.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                alt="dashboard"
                src="/dashboard.png"
                width={2432}
                height={1442}
                className="rounded-md ring-1 shadow-2xl ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Key Features
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover the powerful features that make our tool the best choice
              for recruiters.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="mx-auto h-12 w-12 text-indigo-600"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                AI-Powered Screening
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Automatically screen resumes and rank candidates based on their
                qualifications.
              </p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="mx-auto h-12 w-12 text-indigo-600"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Preliminary Interviews
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Conduct initial interviews with our AI bot to save time and
                resources.
              </p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="mx-auto h-12 w-12 text-indigo-600"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Job Matching
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Find the best candidates for your job openings with our advanced
                matching algorithm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our tool simplifies the recruiting process in three easy steps.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Upload Resume
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Candidates upload their resumes to our platform.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                AI Screening
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Our AI bot reviews the resume and conducts a preliminary
                interview.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Get Results
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Recruiters receive a score and detailed report for each
                candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div
        id="faq"
        className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pt-12 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pb-32"
      >
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-gray-600">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <span className="text-3xl font-semibold">HireFlow</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
