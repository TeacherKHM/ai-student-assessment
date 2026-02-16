import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getStudentSubmissions } from "@/services/classroom";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SubmissionsPage({ params }: { params: { courseId: string; courseWorkId: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        redirect("/");
    }

    const submissions = await getStudentSubmissions(session.accessToken, params.courseId, params.courseWorkId);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <header className="mb-12 flex items-center gap-4">
                    <Link href={`/dashboard/${params.courseId}`} className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-border flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Student Submissions</h1>
                        <p className="text-secondary">Click on a student to analyze their work.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions.map((submission) => (
                        <Link
                            key={submission.id}
                            href={`/dashboard/${params.courseId}/${params.courseWorkId}/${submission.userId}`}
                            className="p-6 rounded-2xl border border-border bg-white dark:bg-gray-800 hover:shadow-xl transition-all flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                {submission.userId?.[0].toUpperCase() || "S"}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{submission.userId}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${submission.state === "TURNED_IN" ? "bg-accent-soft text-accent" : "bg-gray-100 text-gray-500"}`}>
                                        {submission.state}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Draft Grade: {submission.draftGrade || "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="text-primary">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </Link>
                    ))}

                    {submissions.length === 0 && (
                        <div className="col-span-full py-20 text-center glass rounded-2xl">
                            <p className="text-secondary text-lg">No student submissions found for this assignment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
