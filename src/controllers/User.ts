import type { User, ApiResponse, CreateUser } from "@type/types.js";
import { create, findByEmail } from "@models/UserModel.js";
import type { Response, Request } from "express";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";
import generateToken from "@utils/generateToken";

export const register = async (
  req: Request<CreateUser>,
  res: Response<ApiResponse<Omit<CreateUser, "password">>>,
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: `Username, Email Dan Password Wajib diisi!`,
      });
    }
    if (!isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: `Email Tidak Valid!`,
      });
    }
    const existing: User | null = await findByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Email Sudah Terdaftar`,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user: CreateUser = await create({
      username,
      email,
      password: hashPassword,
    });
    const { password: _, ...data } = user;
    res.status(200).json({
      success: true,
      data,
      message: "Registrasi Berhasil",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error`,
    });
  }
};

export const login = async (
  req: Request<Pick<User, "email" | "password">>,
  res: Response<ApiResponse<Omit<User, "password"> & { token: string }>>,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: `email dan password wajib diisi!`,
    });
  }
  if (!isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: `Email tidak valid!`,
    });
  }
  const user: User | null = await findByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: `Email tidak terdaftar!`,
    });
  }
  const verify = await bcrypt.compare(password, user.password);
  if (!verify) {
    return res.status(401).json({
      success: false,
      message: `Password salah!`,
    });
  }
  const token = generateToken(user.userId);
  const { password: _, ...data } = user;
  return res.status(200).json({
    success: true,
    data: { ...data, token },
    message: `Login berhasil`,
  });
};
