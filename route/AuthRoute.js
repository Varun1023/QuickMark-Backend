const express = require("express");
const { login, signup } = require("../controller/Authcontroller");

const Authroute = express.Router();

Authroute.post("/login", login);
Authroute.post("/signup",signup)

module.exports = {
  Authroute,
};
