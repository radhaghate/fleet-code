const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { description } = req.body;

  res.json({
    message: "Received problem",
    descriptionReceived: description,
    fakeTestCases: [
      { input: "[1,2,3]", expected_output: "6" },
      { input: "[-1,-2]", expected_output: "-1" }
    ]
  });
});

module.exports = router;