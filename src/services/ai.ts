import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. Gemini AI features will likely fail.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

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
      },
    );
    return response.data;
  } catch (error) {
    console.error("Mathpix OCR Error:", error);
    return null;
  }
}

/**
 * analyzes student work using Gemini.
 */
export async function analyzeStudentWork(
  ocrResult: string,
  gradeLevel: string,
  topic: string,
) {
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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response (handling potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in Gemini response:", text);
      return null;
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("Error parsing Gemini JSON:", parseError, "Content:", jsonMatch[0]);
      return null;
    }
  } catch (error) {
    console.error("Gemini AI Analysis Error:", error);
    return null;
  }
}
