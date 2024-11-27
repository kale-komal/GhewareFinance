const express = require("express");
const router = express.Router();

router.post("/authenticate", (req, res) => {
  const { username, password } = req.body;

  // Set your hardcoded credentials
  const correctUsername = 'komal';
  const correctPassword = '123';

  // Check if the credentials match
  if (username === correctUsername && password === correctPassword) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect username or password' });
  }
});

module.exports = router;
