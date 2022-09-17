import User from '../models/User.js';
import { createError } from '../error.js';

export const register = async (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, 'User not found.'));

    if (user.password !== req.body.password)
      return next(createError(400, 'Wrong credentials'));

    const { password, ...others } = user._doc;

    res.status(200).send(others);
  } catch (err) {
    next(err);
  }
};
