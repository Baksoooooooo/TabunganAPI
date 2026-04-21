import type { User, ApiResponse } from "@type/types.js";
import { create, findByEmail } from "@models/UserModel.js";
import type { Response, Request } from "express";
import bcrypt from "bcrypt";

export const register = async (
  req: Request<Omit<User, "tabungan" | "id">>,
  res: Response<ApiResponse<Omit<User, "password">>>,
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: `Username, Email Dan Password Wajib diisi`,
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
    const user: User = await create({
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
