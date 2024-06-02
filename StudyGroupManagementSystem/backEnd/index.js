require("dotenv").config();
const express = require("express");
const app = express();
const portNumber = 5000;

const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Import the Customer model
const Customer = require("./Models/customers");

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// DB Connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

let db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => console.log("\nConnected to MongoDB"));

// ROUTES

// Customer Routes
const customerRoute = require("./Routes/customerRoutes");
app.use("/api/v2/customers", customerRoute);

// Subject Routes
const subjectRoute = require("./Routes/subjectRoutes");
app.use("/api/v2/subjects", subjectRoute);

// Cafe Routes
const cafeRoute = require("./Routes/cafeRoutes");
app.use("/api/v2", cafeRoute);

// Group Routes





// POST endpoint for user login
app.post('/api/login', async (req, res) => {
  const { userName, password } = req.body;

  // Log the request body to check the data being sent from the frontend
  console.log('Request Body:', req.body);

  try {
    // Find the user in the database
    const user = await Customer.findOne({ userName });

    if (!user) {
      // Don't specify whether the username is invalid
      return res.status(401).json({ error: 'Invalid User' });
    }

    // Print user ID in the console
    console.log('User ID:', user._id);

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    // If both username and password are valid, return user data
    // Include a success message
    res.json({ user, message: 'Login successful' });
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






app.listen(portNumber, () => {
  console.log(`\nServer is running on http://localhost:${portNumber}`);
});
