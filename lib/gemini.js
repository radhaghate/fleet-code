const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateTestCases(description) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
    thinkingConfig: { thinkingBudget: 0 }
    }
  });

  const prompt = `
You are generating programming test cases.
Generate:
- 5 normal test cases
- 5 edge cases
- 3 extreme constraint cases

Return ONLY valid JSON.
No markdown.
No explanation.
No backticks.

Format:

[
  { "input": "...", "expected_output": "..." }
]

Problem:
${description}
`;

  const result = await model.generateContent(prompt);

  const raw = result.response.text().trim();

  // Try to safely extract JSON array
  const jsonMatch = raw.match(/\[[\s\S]*\]/);

  if (!jsonMatch) {
    throw new Error("Gemini did not return valid JSON");
  }

  return JSON.parse(jsonMatch[0]);
}

module.exports = generateTestCases;