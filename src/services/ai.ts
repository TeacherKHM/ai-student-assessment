import Anthropic from "@anthropic-ai/sdk";
import axios from "axios";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Performs OCR using Mathpix API (for math/physics handwritten work).
 */
export async function performMathpixOCR(imageUrl: string) {
    try {
        const response = await axios.post(
            "https://api.mathpix.com/v3/text",
            {
                src: imageUrl,
                formats: ["text", "data", "latex_styled"],
                data_options: {
                    include_latex: true,
                },
            },
            {
                headers: {
                    app_id: process.env.MATHPIX_APP_ID,
                    app_key: process.env.MATHPIX_APP_KEY,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Mathpix OCR Error:", error);
        return null;
    }
}

/**
 * analyzes student work using Claude Sonnet.
 */
export async function analyzeStudentWork(ocrResult: string, gradeLevel: string, topic: string) {
    const prompt = `
    You are an expert math and physics teacher with 30 years of experience. 
    Analyze the following OCR transcription of a student's handwritten work for a ${gradeLevel} ${topic} problem.

    OCR Transcription:
    "${ocrResult}"

    Follow these pedagogical principles:
    1. Mistake-Centered Learning: Identify specific conceptual errors vs procedural/arithmetic mistakes.
    2. Confidence-Building Feedback: Acknowledge what the student did right first.
    3. Growth Mindset: Reframes mistakes as learning opportunities.

    Provide your analysis in JSON format with the following structure:
    {
      "stepByStepAnalysis": [
        { "step": 1, "status": "correct", "content": "..." },
        { "step": 2, "status": "error", "content": "...", "misconception": "..." }
      ],
      "primaryMisconception": {
        "name": "...",
        "description": "...",
        "explanation": "..."
      },
      "feedback": {
        "encouragement": "...",
        "correction": "...",
        "memoryTip": "..."
      },
      "suggestedPractice": [
        { "problem": "...", "scaffolding": "..." }
      ]
    }
  `;

    const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
    });

    // Extract JSON from response (handling potential markdown wrapping)
    const content = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}
