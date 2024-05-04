import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields` });

  // name validation
  if (username.length > 25)
    return res
      .status(400)
      .json({ error: "First/Last name can only be less than 25 characters" });
  // email validation
  const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
  if (!emailRegex.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });

  // password validation
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be at least 6 characters long" });

  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    const doesUserAlreadyExist = await User.findOne({ email });

    if (doesUserAlreadyExist)
      return res.status(400).json({
        error: `a user with ${phone} already exists. Please sign in instead`,
      });

    const result = await newUser.save();
    result._doc.password = undefined;
    return res.status(201).json({ ...result._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields` });

  // email validation
  const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
  if (!emailRegex.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });

  // password validation
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be at least 6 characters long" });

  try {
    const validUser = await User.findOne({ email });
    // console.log(validUser.password);
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Invalid email/password"));

    const payload = { _id: validUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = { ...validUser._doc, password: undefined };

    return res.status(200).json({ token, user });

    // const { password: pass, ...rest } = validUser._doc;
    // res
    //   .cookie("access_token", token, { httpOnly: true })
    //   .status(200)
    //   .json(rest);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const user = { ...validUser._doc, password: undefined };

      return res.status(200).json({ token, user });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-3),
        email: req.body.email,
        password: hashedPassword,
      });
      const result = await newUser.save();
      result._doc.password = undefined;
      return res.status(201).json({ ...result._doc });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out");
  } catch (error) {
    next(error);
  }
};
