"use client";

import Link from "next/link";

// Display job names in Title Case (e.g. "MACHINE OPERATOR" -> "Machine Operator")
const toTitleCase = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function JobCard({ job }) {
  return (
    <div className="border rounded-2xl p-6 mb-5 shadow-sm hover:shadow-md transition flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-xl font-semibold text-[#0b1e3d]">
        {toTitleCase(job.title)}
      </h2>

      <Link
        href={`/careers/apply/${job.id}`}
        className="inline-block px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium whitespace-nowrap"
      >
        Apply Now
      </Link>
    </div>
  );
}
