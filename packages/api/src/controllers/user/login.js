const passport = require("../../auth/local");
const { validationResult } = require("express-validator");
const { User } = require("../../models/User");
const { Logs } = require("../../models/Logs");

/**
 * Sign in using username and password and returns JWT
 */
const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  passport.authenticate("local", async (err, user) => {
    if (err) {
      return res.status(401).json({
        errors: {
          msg: "Vos informations de connexion sont erronées",
          location: "body",
          error: err
        }
      });
    }
    if (user) {
      await User.query()
        .where("id", user.id)
        .update({ last_login: new Date().toISOString() })
        .then(
          await Logs.query().insert({
            user_id: user.id,
            action: "connexion",
            result: "success"
          })
        );
      return res.status(200).json(user.getUser());
    }
  })(req, res, next);
};

module.exports = login;
