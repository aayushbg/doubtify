const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});