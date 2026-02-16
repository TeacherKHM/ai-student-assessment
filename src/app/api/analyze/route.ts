import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getDriveFile } from "@/services/classroom";
import { performMathpixOCR, analyzeStudentWork } from "@/services/ai";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { fileId, fileName, gradeLevel, topic } = await req.json();

        if (!fileId) {
            return NextResponse.json({ error: "File ID is required" }, { status: 400 });
        }

        // 1. Fetch the file from Drive
        // Note: In a real scenario, we might need to handle large files and different formats.
        const fileData = await getDriveFile(session.accessToken, fileId);

        // 2. Convert to Base64 for OCR (Mathpix prefers base64 or public URLs)
        // This is a simplified conversion for the example.
        const base64Image = Buffer.from(fileData as any).toString("base64");
        const dataUrl = `data:image/jpeg;base64,${base64Image}`;

        // 3. Perform OCR
        const ocrResult = await performMathpixOCR(dataUrl);

        if (!ocrResult || !ocrResult.text) {
            return NextResponse.json({ error: "OCR failed to extract text" }, { status: 500 });
        }

        // 4. Perform AI Analysis
        const analysis = await analyzeStudentWork(ocrResult.text, gradeLevel || "9th Grade", topic || "Math/Physics");

        return NextResponse.json({
            ocr: ocrResult,
            analysis: analysis,
        });
    } catch (error: any) {
        console.error("Analysis API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
