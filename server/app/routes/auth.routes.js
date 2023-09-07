const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const existingParams = require("../middlewares/existingParams");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post(
    "/api/auth/signup",
    [
      existingParams(["first_name", "last_name", "username", "email", "password", "gender", "birthday"]),
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRoleExists,
    ],
    controller.signup
  );

  app.post(
    "/api/auth/login/email",
    [existingParams(["email", "password"])],
    controller.login_with_email
  );
  app.post(
    "/api/auth/login/username",
    [existingParams(["username", "password"])],
    controller.login_with_username
  );
  app.post(
    "/api/auth/refreshToken",
    [existingParams(["refreshToken"])],
    controller.refreshTokenHelper
  );
};
