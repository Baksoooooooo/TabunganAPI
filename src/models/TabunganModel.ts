import prisma from "../lib/prisma";
import type { Tabungan, CreateTabungan } from "@type/types";

export const create = async (data: CreateTabungan): Promise<Tabungan> => {
  return await prisma.tabungan.create({ data });
};

export const findByUser = async (userId: number): Promise<Tabungan[]> => {
  return await prisma.tabungan.findMany({
    where: {
      pemilikTabungan: userId,
    },
  });
};

export const findById = async (
  idTabungan: number,
): Promise<Tabungan | null> => {
  return await prisma.tabungan.findUnique({ where: { idTabungan } });
};

export const update = async (
  idTabungan: number,
  data: Partial<Tabungan>,
): Promise<Tabungan> => {
  return await prisma.tabungan.update({ where: { idTabungan }, data });
};

export const remove = async (idTabungan: number) => {
  return await prisma.tabungan.delete({ where: { idTabungan } });
};
