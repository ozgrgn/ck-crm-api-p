import jwt from "jsonwebtoken";
import CONFIG from "../../config.js";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, CONFIG.JWT.secret);
    if (decoded) req[decoded.type] = decoded;

    return next();
  } catch (err) {
    return next();
  }
};
