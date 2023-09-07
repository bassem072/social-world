const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const checkRole = (roleName) => {
  return (req, res, next) => {
    User.findById(req.userId).then((user) => {
      Role.find({
        _id: { $in: user.roles },
      }).then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === roleName) {
            next();
            return;
          }
        }

        res.status(403).send({ message: `Require ${roleName} Role!` });
        return;
      }).catch((err) => {
        res.status(500).send({ message: err });
        return;
      });
    }).catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
    /*Role.findOne({
      name: RoleName,
    })
      .then((role) => {
        if (!role) {
          return res.status(403).send({
            message: "You are not authorized to perform this action.",
          });
        }
        req.role = role;
        next();
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving role.",
        });
      });*/
  };
};

const authJwt = {
  verifyToken,
  checkRole,
};

module.exports = authJwt;