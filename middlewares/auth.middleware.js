const jwt = require("jsonwebtoken");

const userAuth = async function (req, res, next) {
  const token = req.headers.authorization;
  try {
    const verify = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(verify);
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: "Invalid Token", success: false });
  }
};

module.exports = userAuth;
