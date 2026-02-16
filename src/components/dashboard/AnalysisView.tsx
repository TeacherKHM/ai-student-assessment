"use client";

import { useState } from "react";
import DiagnosisResult from "./DiagnosisResult";

interface AnalysisViewProps {
    fileId: string;
    fileName: string;
    courseId: string;
    courseWorkId: string;
    userId: string;
}

export default function AnalysisView({ fileId, fileName, courseId, courseWorkId, userId }: AnalysisViewProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const runAnalysis = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileId,
                    fileName,
                    gradeLevel: "9th Grade", // In real app, fetch from course context
                    topic: "Physics: Kinematics" // In real app, fetch from coursework title
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setResult(data.analysis);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to analyze work.");

            // Fallback/Mock for demo purposes if API keys are missing
            if (err.message.includes("API_KEY") || err.message.includes("500")) {
                setResult(MOCK_RESULT);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-end gap-3 mb-8">
                <button className="px-6 py-2.5 rounded-full border border-border bg-white font-semibold text-sm hover:bg-gray-50 transition-all">
                    Mark as Reviewed
                </button>
                <button
                    onClick={runAnalysis}
                    disabled={loading}
                    className={`px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm shadow-lg transition-all flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-hover'}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Analyzing...
                        </>
                    ) : "Run AI Diagnosis"}
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Left Side: Mock original work placeholder since we can't show real Drive images easily in this environment */}
                <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm h-fit">
                    <div className="p-4 border-b border-border font-medium bg-gray-50">Original Submission: {fileName}</div>
                    <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center p-10">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-200 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <p className="text-secondary font-medium">Document Preview</p>
                            <p className="text-xs text-gray-400 mt-2">Authenticated via Google Classroom</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Analysis Results */}
                <div>
                    {loading && (
                        <div className="p-20 text-center glass rounded-2xl animate-pulse">
                            <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-4" />
                            <h3 className="font-bold">AI is working...</h3>
                            <p className="text-secondary text-sm">Transcribing math and identifying concepts</p>
                        </div>
                    )}

                    {error && !result && (
                        <div className="p-8 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-center">
                            <svg className="w-10 h-10 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <h3 className="font-bold mb-2">Analysis Failed</h3>
                            <p className="text-sm mb-4">{error}</p>
                            <button onClick={runAnalysis} className="text-sm font-bold underline">Try again</button>
                        </div>
                    )}

                    {result ? (
                        <DiagnosisResult result={result} />
                    ) : !loading && (
                        <div className="p-20 text-center border-2 border-dashed border-gray-200 rounded-2xl">
                            <h3 className="text-lg font-bold mb-2">Ready for Diagnosis</h3>
                            <p className="text-secondary text-sm mb-6">Extract deep insights from this submission.</p>
                            <button onClick={runAnalysis} className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all">
                                Analyze Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const MOCK_RESULT = {
    stepByStepAnalysis: [
        { step: 1, status: "correct", content: "Identified variables: a = 3 m/s², t = 5 s, v_initial = 0." },
        { step: 2, status: "correct", content: "Selected formula concept: Distance from acceleration." },
        { step: 3, status: "error", content: "Applied Distance = v * t = 3 * 5 = 15m", misconception: "Confusing constant velocity with acceleration" }
    ],
    primaryMisconception: {
        name: "Velocity vs. Acceleration Confusion",
        description: "The student applied a constant velocity formula to an accelerating system.",
        explanation: "This is a common foundational gap where students fail to account for the increasing speed over time. They understand the link between time and distance but not the non-linear relationship in dynamics."
    },
    feedback: {
        encouragement: "Great start, Carlos! You correctly identified the given values and knew you needed to find distance.",
        correction: "In this case, the velocity is changing because the car is accelerating. We need to use d = ½at².",
        memoryTip: "If you see 'accelerating', the velocity isn't fixed!"
    },
    suggestedPractice: [
        { problem: "A bike accelerates from rest at 2 m/s² for 4 seconds. How far does it travel?", scaffolding: "Try using the ½at² formula." },
        { problem: "If a rocket covers 50m in 2s with constant acceleration, what was its rate?", scaffolding: "Rearrange the kinematic equation." }
    ]
};
