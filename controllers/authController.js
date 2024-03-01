const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send(`Error registering user: ${error.message}`);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, 'secret');
    res.status(200).send({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send(`Error logging in: ${error.message}`);
  }
};

module.exports = { register, login };
