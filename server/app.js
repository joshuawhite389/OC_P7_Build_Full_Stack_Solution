const express = require("express");
// const path = require("path");
const dotEnv = require("dotenv");

dotEnv.config();

const app = express();




app.use(express.json());

// Middleware to set headers on each response.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// Serve static images from the images folder so express knows what to do with images
// app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use("/api/auth", userRoutes);

// app.use('/api/sauces', sauceRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});

module.exports = app;
