import jwt, { type SignOptions } from "jsonwebtoken";

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
export default generateToken;
