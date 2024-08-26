const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://aayushbgondaliya:JE4RliAFx88aaQ6q@shopprdb.0fwki.mongodb.net/?retryWrites=true&w=majority&appName=shopprdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectDB };