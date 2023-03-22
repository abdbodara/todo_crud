const jwt = require("jsonwebtoken");
require("dotenv").config();
const useAuthorization = true;

const verifyToken = (req, res, next) => {
  if (useAuthorization == false) {
    next();
  } else {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    // jwt.verify(token, process.env.SECRET, (err, user) => {
    //   if (err) {
    //     return res.status(403).send({ message: "No valid token!" });
    //   }
    //   req.user = user;
    //   next();
    //   return user;
    // });
    jwt.verify(token, "abc123", (err, user) => {
      if (err) {
        return res.status(403).send({ message: "No valid token!" });
      }
      req.user = user;
      next();
      return user;
    });
  }
};

module.exports = verifyToken;
