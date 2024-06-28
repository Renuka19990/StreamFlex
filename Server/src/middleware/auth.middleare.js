const jwt = require("jsonwebtoken");
const { Blacklist } = require("../models/blacklist.model");  // Update the path as per your project structure

const auth = async (req, res, next) => {
  
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token is not provided" });
  }


  const isBlacklisted = await Blacklist.findOne({ where: { token } });
  if (isBlacklisted) {
    return res.status(401).json({ msg: "User is already logged out, please log in again" });
  }


  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid token" });
    }
   
    req.userID = decoded.userID;
    req.role = decoded.role;
    req.username = decoded.username;
    next();
  });
};

module.exports = auth;
