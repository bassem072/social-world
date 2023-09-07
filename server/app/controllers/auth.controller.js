const config = require("../config/auth.config");
const db = require("../models");
const { user: User, role: Role, refreshToken: RefreshToken } = db;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const authConfig = require("../config/auth.config");

const signup = (req, res) => {
  const { first_name, last_name, username, email, password, gender, birthday } =
    req.body;
  const user = new User({
    first_name,
    last_name,
    username,
    email,
    password: bcrypt.hashSync(password, 8),
    gender,
    birthday,
  });

  const roles = Role.find({ name: { $in: req.body.roles } })
    .then((roles) => {
      user.roles = roles.map((role) => role._id);

      user
        .save()
        .then(async (newUser) => {
          const token = jwt.sign({ id: newUser._id }, config.secret, {
            expiresIn: authConfig.jwtExpiration,
          });

          const refreshToken = await RefreshToken.createToken(newUser);

          const authorities = [];

          for (const role in roles) {
            authorities.push("ROLE_" + roles[role].name.toUpperCase());
          }

          return res.status(200).json({
            message: "Register successful",
            id: newUser._id,
            username: newUser.username,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            gender: newUser.gender,
            birthday: newUser.birthday,
            roles: authorities,
            accessToken: token,
            refreshToken: refreshToken,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
};

const login_with_username = async (req, res) => {
  console.log("hi");
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).populate("roles", "-__v");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: authConfig.jwtExpiration,
    });

    const refreshToken = await RefreshToken.createToken(user);

    const authorities = [];

    for (const role in user.roles) {
      authorities.push("ROLE_" + user.roles[role].name.toUpperCase());
    }

    return res.status(200).json({
      message: "Login successful",
      id: user._id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      birthday: user.birthday,
      roles: authorities,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const login_with_email = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("roles", "-__v");
    console.log("findUser");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    console.log(user.id, config.secret, authConfig.jwtExpiration);
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: authConfig.jwtExpiration,
    });

    console.log("create token");
    
    const refreshToken = await RefreshToken.createToken(user);
    console.log(token);
    
    const authorities = [];
    
    for (const role in user.roles) {
      authorities.push("ROLE_" + user.roles[role].name.toUpperCase());
    }

    const x = {
      message: "Login successful",
      id: user._id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      birthday: user.birthday,
      roles: authorities,
      accessToken: token,
      refreshToken: refreshToken,
    };
    console.log(x);

    return res.status(200).json(x);
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

const refreshTokenHelper = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  console.log(requestToken);

  try {
    const refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (await RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new Login request",
      });
      return;
    }

    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    RefreshToken.findByIdAndUpdate(refreshToken._id, {
      expiryDate: expiredAt.getTime(),
    }).exec();

    const newAccessToken = jwt.sign(
      { id: refreshToken.user._id },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports = {
  signup,
  login_with_username,
  login_with_email,
  refreshTokenHelper,
};
