import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getStudentSubmissions } from "@/services/classroom";
import Link from "next/link";
import { redirect } from "next/navigation";
import AnalysisView from "@/components/dashboard/AnalysisView";

export default async function AnalysisPage({ params }: { params: { courseId: string; courseWorkId: string; userId: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        redirect("/");
    }

    // Find the specific submission for this user
    const submissions = await getStudentSubmissions(session.accessToken, params.courseId, params.courseWorkId);
    const studentSubmission = submissions.find(s => s.userId === params.userId);

    if (!studentSubmission) {
        return (
            <div className="pt-32 container mx-auto text-center">
                <h1 className="text-2xl font-bold">Submission not found</h1>
                <Link href={`/dashboard/${params.courseId}/${params.courseWorkId}`} className="text-primary mt-4 inline-block">Go back</Link>
            </div>
        );
    }

    const attachments = studentSubmission.assignmentSubmission?.attachments || [];
    const imageAttachment = attachments.find(a => a.driveFile);

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <header className="mb-12 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/dashboard/${params.courseId}/${params.courseWorkId}`} className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-border flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Student Analysis</h1>
                            <p className="text-secondary text-sm">Student ID: {params.userId}</p>
                        </div>
                    </div>
                </header>

                <AnalysisView
                    fileId={imageAttachment?.driveFile?.id || ""}
                    fileName={imageAttachment?.driveFile?.title || "No attachment found"}
                    courseId={params.courseId}
                    courseWorkId={params.courseWorkId}
                    userId={params.userId}
                />
            </div>
        </div>
    );
}
