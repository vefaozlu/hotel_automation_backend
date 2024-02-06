import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../../../sequelize/models/User.model.js";
import auth from "../../auth/passport.js";

//  Admion routes have to be authenticated

export default class AuthController {

  //  Sends login view

  static async loginView(req, res) {
    return res.render("login");
  }

  //  Handle login

  static async login(req, res) {
    const schema = Joi.object({
      password: Joi.string().required(),
      username: Joi.string().required(),
    });

    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      }

      auth.authenticate("local", (error, user, info) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        }

        req.logIn(user, (error) => {
          if (error) {
            return res.status(400).json({ message: error.message });
          }

          console.log(user);
          return res.status(200).json({ user: user });
        });
      })(req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Incorrect credentials" });
    }
  }

  //  Sends register view

  static async registerView(req, res) {
    return res.render("register");
  }

  //  Handle register

  static async register(req, res) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      phone_number: Joi.string().required(),
      password: Joi.string().required(),
      confirm_password: Joi.string().required(),
      role_id: Joi.number().required(),
    });

    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      }

      if (value.password !== value.confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashed = await bcrypt.hash(value.password, 10);

      const user = User.create({
        email: value.email,
        username: value.username,
        phoneNumber: value.phone_number,
        password: hashed,
        role: "admin",
      });

      auth.authenticate("local", (error, user, info) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        }

        req.logIn(user, (error) => {
          if (error) {
            return res.status(400).json({ message: error.message });
          }

          return res.status(200).json({ user: user });
        });
      })(req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}
