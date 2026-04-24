import type { Request } from "express";
import type * as prismaType from "../generated/prisma/client";
import type { JwtPayload } from "jsonwebtoken";

export type Tabungan = Omit<prismaType.Tabungan, "createdAt" | "updatedAt">;
export type CreateTabungan = Pick<Tabungan, "namaTabungan" | "pemilikTabungan">;
export type User = Omit<prismaType.User, "createdAt" | "updatedAt">;
export type CreateUser = Omit<User, "tabungan" | "userId">;

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface AuthPayload extends JwtPayload {
  userId: number;
}

export interface AuthRequest extends Request<
  { id: string },
  {},
  CreateTabungan & { totalDeposit: number }
> {
  user?: AuthPayload;
}
