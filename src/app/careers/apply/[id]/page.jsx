import { getJobById } from "@/lib/queries/jobs";
import ApplyForm from "./ApplyForm";

export default async function ApplyJobPage({ params }) {
  const { id } = await params;

  let job = null;
  try {
    job = await getJobById(id);
  } catch {
    job = null;
  }

  if (!job) {
    return <p className="mt-6 text-center">Job not found</p>;
  }

  return <ApplyForm job={job} />;
}
