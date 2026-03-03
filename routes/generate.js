const express = require('express');
const router = express.Router();

const generateTestCases = require('../lib/gemini');
const supabase = require('../lib/supabase');

router.post('/', async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description required" });
    }

    // 1️⃣ Call Gemini
    const testCases = await generateTestCases(description);

    // 2️⃣ Save to Supabase
    const { data, error } = await supabase
      .from('problems')
      .insert([
        {
          title: description.slice(0, 50),
          description,
          test_cases: testCases
        }
      ])
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Database insert failed" });
    }

    // 3️⃣ Return saved problem
    res.json({
      message: "Problem generated and saved",
      problem: data[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;