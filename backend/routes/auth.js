import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  res.status(201).json({ message: 'User registered successfully' });
});

export default router;