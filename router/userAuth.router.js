import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/sessions/register",
  passport.authenticate("register", {
    failureRedirect: "/register-failed",
    failureFlash: true
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);

router.post(
  "/sessions/login",
  passport.authenticate("login", { failureRedirect: "/sessions/register" }),
  async (req, res) => {
    res.json({ message: "Login exitoso." });
  }
);


export default router;
