import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // console.log(req);
  // const token = req.headers.access_token;
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader.replace("Bearer ", "");
  // console.log(token);

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};
