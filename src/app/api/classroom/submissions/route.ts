import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getStudentSubmissions } from "@/services/classroom";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const courseWorkId = searchParams.get("courseWorkId");

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!courseId || !courseWorkId) {
        return NextResponse.json({ error: "Course ID and CourseWork ID are required" }, { status: 400 });
    }

    try {
        const submissions = await getStudentSubmissions(session.accessToken, courseId, courseWorkId);
        return NextResponse.json(submissions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
