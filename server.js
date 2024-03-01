const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middlewares/auth');
const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.post('/post', verifyToken, (req, res) => {
  // Logic to create post
  res.status(200).send('Post created successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
