import prisma from "../lib/prisma";
import type { CreateUser, User } from "@type/types";

export const create = async (user: CreateUser): Promise<User> => {
  return await prisma.user.create({ data: user });
};

export const findByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};
