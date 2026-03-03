const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabase');

// GET all problems
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: "Failed to fetch problems" });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;