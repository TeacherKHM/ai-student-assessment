import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getTeacherCourses } from "@/services/classroom";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const courses = await getTeacherCourses(session.accessToken);
        return NextResponse.json(courses);
    } catch (error: any) {
        console.error("API Course Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
