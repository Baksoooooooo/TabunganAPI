import type { User, ApiResponse, CreateUser } from "@type/types.js";
import { create, findByEmail } from "@models/UserModel.js";
import type { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";
import generateToken from "@utils/generateToken";
import AppError from "@utils/AppError";

export const register = async (
  req: Request<{}, {}, CreateUser>,
  res: Response<ApiResponse<Omit<CreateUser, "password">>>,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new AppError(`Username, Email Dan Password Wajib Diisi!`, 400);
    }
    if (!isEmail(email)) {
      throw new AppError(`Email tidak valid!`, 400);
    }
    const existing: User | null = await findByEmail(email);
    if (existing) {
      throw new AppError(`Email sudah terdaftar!`, 400);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user: CreateUser = await create({
      username,
      email,
      password: hashPassword,
    });
    const { password: _, ...data } = user;
    res.status(201).json({
      success: true,
      data,
      message: "Registrasi Berhasil",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, Pick<User, "email" | "password">>,
  res: Response<ApiResponse<Omit<User, "password"> & { token: string }>>,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError(`email dan password wajib diisi!`, 400);
    }
    if (!isEmail(email)) {
      throw new AppError(`Email tidak valid!`, 400);
    }
    const user: User | null = await findByEmail(email);
    if (!user) {
      throw new AppError(`Email tidak terdaftar!`, 401);
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      throw new AppError(`Password salah!`, 401);
    }
    const token = generateToken(user.userId);
    const { password: _, ...data } = user;
    return res.status(200).json({
      success: true,
      data: { ...data, token },
      message: `Login berhasil`,
    });
  } catch (error) {
    next(error);
  }
};
