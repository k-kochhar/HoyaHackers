"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import {
	XMarkIcon,
	HomeIcon,
	UserGroupIcon,
	CalendarIcon,
	ClipboardDocumentCheckIcon,
	ChartBarIcon,
	BuildingOfficeIcon,
	Cog6ToothIcon,
	AcademicCapIcon,
	BriefcaseIcon,
} from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Overview", href: "#", icon: HomeIcon, current: true },
	{ name: "Candidates", href: "#", icon: UserGroupIcon, current: false },
	{ name: "Interviews", href: "#", icon: CalendarIcon, current: false },
	{ name: "Jobs", href: "#", icon: BriefcaseIcon, current: false },
	{
		name: "Assessments",
		href: "#",
		icon: ClipboardDocumentCheckIcon,
		current: false,
	},
	{ name: "Analytics", href: "#", icon: ChartBarIcon, current: false },
];

const teams = [
	{ id: 1, name: "Engineering", href: "#", initial: "E", current: false },
	{ id: 2, name: "Product", href: "#", initial: "P", current: false },
	{ id: 3, name: "Design", href: "#", initial: "D", current: false },
	{ id: 4, name: "Marketing", href: "#", initial: "M", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
	return (
		<>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50 lg:hidden"
					onClose={setSidebarOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-900/80" />
					</Transition.Child>

					<div className="fixed inset-0 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
										<button
											type="button"
											className="-m-2.5 p-2.5"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<XMarkIcon
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</button>
									</div>
								</Transition.Child>
								{/* Sidebar component for mobile */}
								<SidebarContent />
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				<SidebarContent />
			</div>
		</>
	);
}

function SidebarContent() {
	return (
		<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
			<div className="flex h-16 shrink-0 items-center">
				<div className="flex items-center gap-x-4 mr-12">
					<span className="text-3xl font-semibold text-indigo-600">
						HireFlow
					</span>
				</div>
			</div>
			<nav className="flex flex-1 flex-col">
				<ul role="list" className="flex flex-1 flex-col gap-y-7">
					<li>
						<div className="text-xs font-semibold leading-6 text-gray-400">
							Main
						</div>
						<ul role="list" className="-mx-2 mt-2 space-y-1">
							{navigation.map((item) => (
								<li key={item.name}>
									<a
										href={item.href}
										className={classNames(
											item.current
												? "bg-gray-50 text-indigo-600"
												: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
											"group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
										)}
									>
										<item.icon
											className={classNames(
												item.current
													? "text-indigo-600"
													: "text-gray-400 group-hover:text-indigo-600",
												"h-6 w-6 shrink-0"
											)}
											aria-hidden="true"
										/>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</li>
					<li>
						<div className="text-xs font-semibold leading-6 text-gray-400">
							Departments
						</div>
						<ul role="list" className="-mx-2 mt-2 space-y-1">
							{teams.map((team) => (
								<li key={team.name}>
									<a
										href={team.href}
										className={classNames(
											team.current
												? "bg-gray-50 text-indigo-600"
												: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
											"group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
										)}
									>
										<span
											className={classNames(
												team.current
													? "text-indigo-600 border-indigo-600"
													: "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
												"flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
											)}
										>
											{team.initial}
										</span>
										<span className="truncate">{team.name}</span>
									</a>
								</li>
							))}
						</ul>
					</li>
					<li className="mt-auto">
						<a
							href="#"
							className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
						>
							<Cog6ToothIcon
								className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
								aria-hidden="true"
							/>
							Settings
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}
