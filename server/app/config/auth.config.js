module.exports = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  jwtExpiration: 360,
  jwtRefreshExpiration: 86400,
};
