const { validationResult } = require("express-validator");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json("Please Enter Valid Data");
  }

  const { name, email, password } = req.body;

  let existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json("Already user exists");
  }

  let hashedPassword = await bcrypt.hash(password, 12);

  const CreatedUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await CreatedUser.save();
  } catch (error) {
    res.status(500).json(error.message);
  }

  let token = jwt.sign(
    { userId: CreatedUser.id, email: CreatedUser.email },
    "supersecretkey",
    { expiresIn: "1h" }
  );

  res.status(201).json({ token: token, userId: CreatedUser.id });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    res.status(400).json("Invalid credentials");
  }

  let isValidPass = await bcrypt.compare(password, existingUser.password);

  if (!isValidPass) {
    res.status(400).json("Invalid credentials");
  }

  let token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    "supersecretkey",
    { expiresIn: "1h" }
  );

  res.status(200).json({ token: token, userId: existingUser.id });
};

exports.register = register;
exports.login = login;
