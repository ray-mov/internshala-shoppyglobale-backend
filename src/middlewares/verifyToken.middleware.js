import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);


  if (!token) {
    return res.status(403).json({ message: "Access denied, no token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);

    req.user = verified;
    next();
  } catch (error) {
    console.log(error.message);

    res.status(401).json({ message: "Invalid token", });
  }
};