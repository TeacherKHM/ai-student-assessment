import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getTeacherCourses } from "@/services/classroom";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        redirect("/");
    }

    const courses = await getTeacherCourses(session.accessToken);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Teacher Dashboard</h1>
                    <p className="text-secondary text-lg">Select a course to view assignments and student submissions.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/dashboard/${course.id}`}
                            className="group p-8 rounded-2xl border border-border bg-white dark:bg-gray-800 hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 bg-primary-soft text-primary rounded-xl flex items-center justify-center font-bold text-xl">
                                    {course.name?.[0]}
                                </div>
                                <div className="text-xs font-semibold px-2 py-1 rounded-full bg-accent-soft text-accent">
                                    Active
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                            <p className="text-secondary text-sm mb-6 line-clamp-2">
                                {course.descriptionHeading || "No description provided."}
                            </p>
                            <div className="pt-6 border-t border-border flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium">Room: {course.room || "N/A"}</span>
                                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    View Assignments
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </span>
                            </div>
                        </Link>
                    ))}

                    {courses.length === 0 && (
                        <div className="col-span-full py-20 text-center glass rounded-2xl">
                            <p className="text-secondary text-lg">No active courses found where you are a teacher.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
