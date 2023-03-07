const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const ejs = require("ejs");

const app = express();

const connection = require("./db");

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database.");
  }
});

app.post("/register", (req, res) => {
  const { email, login, password } = req.body;
  // TODO: Insert user into the database
  res.send("Registration successful!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // TODO: Check if username and password match a user in the database
  if (username === "testuser" && password === "testpassword") {
    res.send("Login successful!");
  } else {
    res.send("Incorrect username or password");
  }
});
