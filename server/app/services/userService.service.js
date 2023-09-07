const db = require("../models");
const user = db.user;

const getAllUsers = (specificItems) => {
  user
    .find({
      first_name: {
        $regex: ".*" + specificItems["first_name"] ?? "" + ".*",
        $options: "i",
      },
      last_name: {
        $regex: ".*" + specificItems["last_name"] ?? "" + ".*",
        $options: "i",
      },
      username: {
        $regex: ".*" + specificItems["username"] ?? "" + ".*",
        $options: "i",
      },
      gender: specificItems["gender"] ?? "",
    })
    .populate("roles", "-__v")
    .limit(10)
    .then((users) => {
      res.status(200).json({ message: users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

const getUserById = (id) => {
  user
    .findById(id)
    .populate("roles", "-__v")
    .then((user) => {
      res.status(200).json({ message: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

const getUserByEmail = (email) => {
  user
    .findOne({ email })
    .populate("roles", "-__v")
    .then((user) => {
      res.status(200).json({ message: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

const getUsersById = (ids) => {
  user
    .find({ _id: { $in: ids } })
    .populate("roles", "-__v")
    .then((user) => {
      res.status(200).json({ message: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};
