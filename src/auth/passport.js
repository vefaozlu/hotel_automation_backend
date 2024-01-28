import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";
import Auth from "../../sequelize/models/Auth.model.js";

const auth = passport;

auth.use(
  new LocalStrategy({ usernameField: "email" }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const user = await Auth.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return cb({ message: "Incorrect credentials" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return cb({ message: "Incorrect credentials" });
      }

      return cb(null, user);
    } catch (e) {
      return cb({ message: "Incorrect credentials" + e });
    }
  })
);

auth.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, role: user.roleId });
  });
});

auth.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default auth;
