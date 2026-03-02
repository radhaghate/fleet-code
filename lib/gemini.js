const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("Loaded API key:", process.env.GEMINI_API_KEY);

async function generateTestCases(description) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are a competitive programming test case generator.

Problem:
${description}

Generate:
- 5 normal test cases
- 5 edge cases
- 3 extreme constraint cases

Return ONLY valid JSON in this format:
[
  {
    "input": "...",
    "expected_output": "..."
  }
]
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return text;
}

module.exports = generateTestCases;