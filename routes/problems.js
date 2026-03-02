const express = require('express');
const router = express.Router();

// Example GET
router.get('/:userId', (req, res) => {
  res.json({ message: "Fetching problems for user", userId: req.params.userId });
});

// Example POST
router.post('/', (req, res) => {
  res.json({ message: "Problem saved (fake)" });
});

module.exports = router;