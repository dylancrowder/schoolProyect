import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import authSchema from "../mongo/auth.Schema.js";
import { createHash, isValidPassword } from "./utils.js";

export const initPass = () => {
  const app = express();

  const registerOpts = {
    usernameField: "email",
    passReqToCallback: true
  };

  passport.use(
    "register",
    new LocalStrategy(registerOpts, async (req, email, password, done) => {
      const {
        body: { first_name, last_name, age, dni }
      } = req;

      if (!first_name || !last_name) {
        return done(new Error("Todos los campos son requeridos."));
      }
      const user = await authSchema.findOne({ email });
      if (user) {
        return done(
          new Error(
            `Ya existe un usuario con el correo ${email} en el sistema.`
          )
        );
      }
      const newUser = await authSchema.create({
        first_name,
        last_name,
        email,
        dni,
        password: createHash(password),
        age
      });
      done(null, newUser);
    })
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await authSchema.findOne({ email });

          if (!user || !isValidPassword(password, user)) {
            return done(null, false, {
              message: "Correo o contraseña inválidos."
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("usuario serializado", user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await authSchema.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
