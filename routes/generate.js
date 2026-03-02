const express = require('express');
const router = express.Router();

const generateTestCases = require('../lib/gemini');

router.post('/', async (req, res) => {
  try {
    const { description } = req.body;

    const testCases = await generateTestCases(description);

    res.json({
      message: "Generated test cases",
      testCases
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;