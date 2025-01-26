"use client";

import { useState, useEffect } from "react";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	PhoneIcon,
	AcademicCapIcon,
	BriefcaseIcon,
	EnvelopeIcon,
	PhoneIcon as PhoneIconOutline,
	SparklesIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import JobModal from "./JobModal";
import { LoadingCard } from "./LoadingSkeleton";
import ResumeModal from "./ResumeModal";
import AskAIModal from "./AskAIModal";

function UserCard({ user }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [status, setStatus] = useState(user.status);
	const [showResumeModal, setShowResumeModal] = useState(false);
	const [showAIModal, setShowAIModal] = useState(false);
	const [isScheduling, setIsScheduling] = useState(false);
	const [error, setError] = useState("");

	// Split education into major and university
	const [major, university] = user.education.split(" - ").map((s) => s.trim());

	const scoreColorClass =
		user.initial_score >= 9
			? "bg-green-50 text-green-700 ring-green-600/20"
			: user.initial_score >= 7
			? "bg-blue-50 text-blue-700 ring-blue-600/20"
			: "bg-yellow-50 text-yellow-700 ring-yellow-600/20";

	const handleStatusChange = async (newStatus) => {
		try {
			const response = await fetch(
				`http://localhost:3001/api/resume/${user._id}/update-status`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ status: newStatus }),
				}
			);

			if (response.ok) {
				setStatus(newStatus);
			}
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	const handlePhoneScreen = async () => {
		try {
			setIsScheduling(true);
			setError("");

			const response = await fetch(
				`http://localhost:3001/api/${user.UID}/prepare_call`,
				{
					method: "PUT",
				}
			);

			if (!response.ok) {
				throw new Error("Failed to schedule phone screen");
			}

			// Update the UI to show the call is being prepared
			// You may want to add additional UI feedback here
		} catch (err) {
			setError("Failed to schedule phone screen: " + err.message);
			console.error("Phone screen error:", err);
		} finally {
			setIsScheduling(false);
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "accepted":
				return "text-green-700 bg-green-50 ring-green-600/20";
			case "rejected":
				return "text-red-700 bg-red-50 ring-red-600/20";
			case "pending":
				return "text-yellow-700 bg-yellow-50 ring-yellow-600/20";
			default:
				return "text-gray-700 bg-gray-50 ring-gray-600/20";
		}
	};

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
								<h3 className="text-lg font-semibold text-gray-900">
									{user.name}
								</h3>
								<div className="mt-1 flex items-center gap-x-2 text-sm text-gray-500">
									<span
										className={`font-medium text-gray-900 ${getStatusColor(
											status
										)}`}
									>
										{status}
									</span>
									<span className="text-gray-400">•</span>
									<span>{major}</span>
									<span className="text-gray-400">•</span>
									<span>{university}</span>
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="flex flex-col items-end space-y-2">
								<div>
									<span className="text-xs text-gray-500 block text-right mb-1">
										Initial Score
									</span>
									<span
										className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${scoreColorClass}`}
									>
										{user.initial_score}/10
									</span>
								</div>
								{user.secondary_score > 0 && (
									<div>
										<span className="text-xs text-gray-500 block text-right mb-1">
											Phone Screen Score
										</span>
										<span className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset bg-purple-50 text-purple-700 ring-purple-600/20">
											{user.secondary_score}/10
										</span>
									</div>
								)}
							</div>
							<div className="flex items-center space-x-2">
								<button
									onClick={() => handleStatusChange("accepted")}
									className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								>
									Accept
								</button>
								<button
									onClick={() => handleStatusChange("rejected")}
									className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								>
									Reject
								</button>
							</div>
							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							>
								{isExpanded ? (
									<>
										Less info
										<ChevronUpIcon
											className="ml-2 h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</>
								) : (
									<>
										More info
										<ChevronDownIcon
											className="ml-2 h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
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
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												Major
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{major}
											</dd>
										</div>
										<div>
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												University
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{university}
											</dd>
										</div>
										<div>
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												Graduation Year
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{user.graduation_year}
											</dd>
										</div>
										<div>
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												GPA
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{user.gpa}
											</dd>
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
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												Years of Experience
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{user.yoe} years
											</dd>
										</div>
										<div>
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												Status
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{user.status}
											</dd>
										</div>
										<div>
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												Phone Screen
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{user.phone_screen}
											</dd>
										</div>
										{user.phone_screen === "completed" && (
											<div>
												<dt className="text-xs uppercase tracking-wide text-gray-500">
													Phone Screen Score
												</dt>
												<dd className="mt-1 text-sm font-medium text-gray-900">
													{user.phone_screen_score}
												</dd>
											</div>
										)}
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
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												Email
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{user.email}
											</dd>
										</div>
										<div>
											<dt className="text-xs uppercase tracking-wide text-gray-500">
												Phone
											</dt>
											<dd className="mt-1 text-sm font-medium text-gray-900">
												{user.phone}
											</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>

						{/* Notes Section */}
						<div className="mt-6 border-t border-gray-100 pt-6">
							<h4 className="text-sm font-bold text-gray-900">
								Evaluation Notes
							</h4>
							<p className="mt-2 text-sm text-gray-600 leading-6">
								{user.notes}
							</p>
							{user.phone_screen_notes && (
								<div className="mt-6 space-y-6">
									<h4 className="text-sm font-bold text-gray-900">
										Phone Screen Evaluation
									</h4>

									{/* Comments Section */}
									<div className="bg-gray-50 rounded-lg p-4">
										<h5 className="text-sm font-semibold text-gray-800 mb-2">
											Comments
										</h5>
										<p className="text-sm text-gray-700">
											{user.phone_screen_notes
												.split("Key Strengths:")[0]
												?.trim() || "No comments provided"}
										</p>
									</div>

									{/* Key Strengths */}
									<div className="bg-green-50 rounded-lg p-4">
										<h5 className="text-sm font-semibold text-green-800 mb-2">
											Key Strengths
										</h5>
										<ol className="list-decimal pl-5 text-sm text-green-700 space-y-1">
											{user.phone_screen_notes
												.split("Areas of Concern")[0]
												.split("Key Strengths:")[1]
												?.split(/\d\./)
												.filter((item) => item.trim())
												.map((strength, index) => (
													<li key={index}>{strength.trim()}</li>
												))}
										</ol>
									</div>

									{/* Areas of Concern */}
									<div className="bg-yellow-50 rounded-lg p-4">
										<h5 className="text-sm font-semibold text-yellow-800 mb-2">
											Areas of Concern
										</h5>
										<ol className="list-decimal pl-5 text-sm text-yellow-700 space-y-1">
											<li>
												{user.phone_screen_notes
													.match(/Areas of Concern:.*?1\.(.*?)2\./s)?.[1]
													?.trim() || "Not specified"}
											</li>
											<li>
												{user.phone_screen_notes
													.match(/Areas of Concern:.*?2\.(.*?)3\./s)?.[1]
													?.trim() || "Not specified"}
											</li>
											<li>
												{user.phone_screen_notes
													.match(/Areas of Concern:.*?3\.(.*?)Additional/s)?.[1]
													?.trim() || "Not specified"}
											</li>
										</ol>
									</div>

									{/* Additional Observations */}
									<div className="bg-blue-50 rounded-lg p-4">
										<h5 className="text-sm font-semibold text-blue-800 mb-2">
											Additional Observations
										</h5>
										<div className="space-y-3 text-sm text-blue-700">
											<div>
												<h6 className="font-medium">Body language/tone:</h6>
												<p>
													{user.phone_screen_notes
														.split("Body language/tone:")[1]
														?.split("Cultural fit indicators:")[0]
														?.trim() || "Not specified"}
												</p>
											</div>
											<div>
												<h6 className="font-medium">
													Cultural fit indicators:
												</h6>
												<p>
													{user.phone_screen_notes
														.split("Cultural fit indicators:")[1]
														?.split("Technical capability evidence:")[0]
														?.trim() || "Not specified"}
												</p>
											</div>
											<div>
												<h6 className="font-medium">
													Technical capability evidence:
												</h6>
												<p>
													{user.phone_screen_notes
														.split("Technical capability evidence:")[1]
														?.split("Outstanding qualities:")[0]
														?.trim() || "Not specified"}
												</p>
											</div>
											<div>
												<h6 className="font-medium">Outstanding qualities:</h6>
												<p>
													{user.phone_screen_notes
														.split("Outstanding qualities:")[1]
														?.split("Risk factors:")[0]
														?.trim() || "Not specified"}
												</p>
											</div>
											<div>
												<h6 className="font-medium">Risk factors:</h6>
												<p>
													{user.phone_screen_notes
														.split("Risk factors:")[1]
														?.trim() || "Not specified"}
												</p>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div className="mt-6 flex items-center justify-end gap-x-4">
							<button
								type="button"
								onClick={handlePhoneScreen}
								disabled={isScheduling}
								className="inline-flex items-center gap-x-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<PhoneIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
								{isScheduling ? "Preparing..." : "Schedule Phone Screen"}
							</button>
							<button
								type="button"
								onClick={() => setShowResumeModal(true)}
								className="inline-flex items-center gap-x-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							>
								View Resume
							</button>
							<button
								type="button"
								onClick={() => setShowAIModal(true)}
								className="inline-flex items-center gap-x-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-purple-500 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<SparklesIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
								Ask AI
							</button>
						</div>

						{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
					</div>
				</div>
			)}

			{/* Resume Modal */}
			<ResumeModal
				isOpen={showResumeModal}
				onClose={() => setShowResumeModal(false)}
				fileName={user.file_name}
			/>

			{/* AI Modal */}
			<AskAIModal
				isOpen={showAIModal}
				onClose={() => setShowAIModal(false)}
				uid={user.UID}
			/>
		</div>
	);
}

export default function UserCardList({ users, loading }) {
	if (loading) {
		return (
			<div className="space-y-4">
				{[1, 2, 3, 4, 5].map((i) => (
					<LoadingCard key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{users.map((user) => (
				<UserCard key={user._id} user={user} />
			))}
		</div>
	);
}
