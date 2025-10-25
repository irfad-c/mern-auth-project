import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  /*We try to read the Authorization Header from the request.
  Authorization Header = A place to send the token. It’s just a place in the request where we put the token.
  By checking the authorization header we are extracting the token*/
  const authHeader = req.header("Authorization");

  const token =
    //We check if the header exists and starts with "Bearer ".
    //These headers are come from axios.js
    authHeader && authHeader.startsWith("Bearer ")
    //split by space and take the token part
      ? authHeader.split(" ")[1]
      : null;
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**We find the user in the database using the ID from the token.
     * select("-password") means: don’t send password back. */
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    /**We attach the user info to req.user.(request)
       This means other routes can now know who the logged-in user is. */

    req.user = user;

    //This allows the request to continue to the protected route.
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
