import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../../sequelize/models/User.model.js";

const auth = passport;

//  Authenticating user info

auth.use(
  new LocalStrategy(async function verify(
    username,
    password,
    cb
  ) {
    try {
      console.log("Authentications...");
      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        return cb({ message: "Incorrect credentials" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return cb({ message: "Incorrect credentials" });
      }

      if(user.roleId === 2) {
        
      }

      return cb(null, user);
    } catch (e) {
      return cb({ message: "Incorrect credentials" + e });
    }
  })
);

//  Registering user info to session store

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
