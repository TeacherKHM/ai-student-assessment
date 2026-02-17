import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getCourseWork } from "@/services/classroom";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!courseId) {
        return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    try {
        const assignments = await getCourseWork(session.accessToken, courseId);
        return NextResponse.json(assignments);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
