import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getCourseWork } from "@/services/classroom";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CoursePage({ params }: { params: { courseId: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        redirect("/");
    }

    const assignments = await getCourseWork(session.accessToken, params.courseId);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <header className="mb-12 flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-border flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Assignments</h1>
                        <p className="text-secondary">Select an assignment to view student submissions.</p>
                    </div>
                </header>

                <div className="space-y-4">
                    {assignments.map((work) => (
                        <Link
                            key={work.id}
                            href={`/dashboard/${params.courseId}/${work.id}`}
                            className="flex items-center justify-between p-6 rounded-2xl border border-border bg-white dark:bg-gray-800 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-accent-soft text-accent rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{work.title}</h3>
                                    <p className="text-secondary text-sm">Due: {work.dueDate ? `${work.dueDate.day}/${work.dueDate.month}/${work.dueDate.year}` : "No due date"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden md:block">
                                    <div className="text-sm font-semibold text-foreground">Points: {work.maxPoints || "Ungraded"}</div>
                                    <div className="text-xs text-gray-400">Created: {new Date(work.creationTime!).toLocaleDateString()}</div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {assignments.length === 0 && (
                        <div className="py-20 text-center glass rounded-2xl">
                            <p className="text-secondary text-lg">No assignments found for this course.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
