import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import UserModel from "../model/user.model"

export const router = express.Router();

router.get("/", (_, res) => {
  res.render("index", { title: "JWT Example" });
});

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup seuccesful",
      user: req.user,
    });
  }
);

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    if (req.error) {
      return res.send({
        message: "Error",
        error: req.error,
      });
    }
    const body = { _id: req.user._id, username: req.user.username };
    const token = jwt.sign({ user: body }, "TOP_SECRET");

    return res.json({ token });
  }
);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      user: req.user,
      token: req.query,
    });
  }
);

router.delete(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userDeleted = await UserModel.deleteOne(req.user);
    res.json({
      user: userDeleted,
      token: req.query,
    });
  }
)
