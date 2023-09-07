const db = require("../models");
const ROLES = db.Roles;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;

  await User.findOne({ username })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Username already exists" });
        return;
      }

      User.findOne({ email })
        .then((user) => {
          if (user) {
            res.status(400).send({ message: "Email already exists" });
            return;
          }

          next();
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

checkRoleExists = (req, res, next) => {
  if (req.body.roles) {
    for (const role in req.body.roles) {
      if (!ROLES.includes(req.body.roles[role])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[role]} does not exist!`,
        });
        return;
      }
    }
  } else {
    res.status(400).send({
      message: `Failed! No roles provided!`,
    });
    return;
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRoleExists,
};

module.exports = verifySignUp;