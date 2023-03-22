const USER = require("../model/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//......SignUP.......//

const Signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log("hashedPassword -->>", hashedPassword);
    const signup = new USER({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    console.log("signup -->>", signup);
    signup
      .save()
      .then((result) => {
        if (result) {
          res.status(200).send({ message: "Signup successfully", status: 200 });
        }
      })
      .catch((error) => {
        let errMsg;
        if (error.code == 11000) {
          errMsg = Object.keys(error.keyValue)[0] + " already exists.";
        } else {
          errMsg = error.message;
        }
        res.status(400).json({ statusText: "Bad Request", message: errMsg });
      });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

//.....Login User......//

const Login = async (req, res) => {
  console.log("req.body ==>>", req.body);
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await USER.findOne({
      $or: [{ email: email }, { username: username }],
    });
    const isPasswordCorrect = await bcrypt.compare(
      hashedPassword,
      user.password
    );
    console.log(
      "isPasswordCorrect -->>",
      // isPasswordCorrect,
      // hashedPassword,
      isPasswordCorrect,
      user.password,
      password,
      user
    );
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, "abc123", {
        expiresIn: "2h",
      });
      // save user token
      user.token = token;

      res.status(200).json({ token: token, message: "Login successfully" });
    }
    res.status(400).send({ message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  Signup,
  Login,
};
