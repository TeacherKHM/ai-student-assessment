"use client";

interface AnalysisResult {
    stepByStepAnalysis: Array<{
        step: number;
        status: "correct" | "error";
        content: string;
        misconception?: string;
    }>;
    primaryMisconception: {
        name: string;
        description: string;
        explanation: string;
    };
    feedback: {
        encouragement: string;
        correction: string;
        memoryTip: string;
    };
    suggestedPractice: Array<{
        problem: string;
        scaffolding: string;
    }>;
}

export default function DiagnosisResult({ result }: { result: AnalysisResult }) {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Feedback Card */}
            <div className="p-8 rounded-2xl bg-accent-soft border border-accent/20">
                <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Pedagogical Feedback
                </h3>
                <p className="text-gray-700 font-medium mb-4 italic">"{result.feedback.encouragement}"</p>
                <p className="text-gray-700 mb-6">{result.feedback.correction}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-accent/10 text-sm font-bold text-accent">
                    💡 Tip: {result.feedback.memoryTip}
                </div>
            </div>

            {/* Misconception Deep Dive */}
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Primary Misconception: {result.primaryMisconception.name}
                </h3>
                <p className="text-secondary mb-4">{result.primaryMisconception.description}</p>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 text-sm border-l-4 border-primary">
                    <span className="font-bold block mb-1">Diagnostic Explanation:</span>
                    {result.primaryMisconception.explanation}
                </div>
            </div>

            {/* Step-by-Step Tracker */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold">Solution Steps</h3>
                <div className="space-y-3">
                    {result.stepByStepAnalysis.map((step) => (
                        <div
                            key={step.step}
                            className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${step.status === "correct"
                                    ? "bg-white border-border"
                                    : "bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/20"
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${step.status === "correct" ? "bg-accent text-white" : "bg-error text-white"
                                }`}>
                                {step.step}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium mb-1">{step.content}</div>
                                {step.misconception && (
                                    <div className="text-xs text-error font-bold mt-2">
                                        🚨 Identified Error: {step.misconception}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Targeted Practice */}
            <div className="p-8 rounded-2xl bg-gray-900 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    Suggested Targeted Practice
                </h3>
                <div className="space-y-4">
                    {result.suggestedPractice.map((practice, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
                            <p className="font-medium mb-2">{practice.problem}</p>
                            <div className="text-xs text-gray-400">Scaffolding: {practice.scaffolding}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
