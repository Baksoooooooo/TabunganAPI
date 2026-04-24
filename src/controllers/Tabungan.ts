import type { NextFunction, Response } from "express";
import type { ApiResponse, AuthRequest, Tabungan } from "@type/types";
import * as Model from "@models/TabunganModel";
import AppError from "@utils/AppError";

export const createTabungan = async (
  req: AuthRequest,
  res: Response<ApiResponse<Tabungan>>,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const { namaTabungan } = req.body;
    if (!namaTabungan) {
      throw new AppError(`Nama tabungan wajib diisi`, 400);
    }
    const tabungan = await Model.create({
      namaTabungan,
      pemilikTabungan: userId!,
    });
    res.status(201).json({
      success: true,
      data: tabungan,
      message: `Tabungan berhasil dibuat`,
    });
  } catch (error) {
    next(error);
  }
};

// getAlltabunganUser
export const getAllTabungan = async (
  req: AuthRequest,
  res: Response<ApiResponse<Tabungan[]>>,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const tabungan = await Model.findByUser(userId!);
    if (tabungan.length === 0) {
      return res.status(200).json({
        success: true,
        data: tabungan,
        message: `Kamu belum mempunyai tabungan`,
      });
    }
    res.status(200).json({
      success: true,
      data: tabungan,
      message: `Tabungan berhasil didapatkan`,
    });
  } catch (error) {
    next(error);
  }
};
// getTabunganById
export const getTabunganById = async (
  req: AuthRequest,
  res: Response<ApiResponse<Tabungan>>,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const tabunganId = Number(req.params.id);
    const tabungan = await Model.findById(tabunganId, userId!);
    if (!tabungan) {
      throw new AppError(
        `Tabungan dengan id ${tabunganId} tidak ditemukan`,
        404,
      );
    }
    res.status(200).json({
      success: true,
      data: tabungan,
      message: `Tabungan ditemukan`,
    });
  } catch (error) {
    next(error);
  }
};
// menabung
export const deposit = async (
  req: AuthRequest,
  res: Response<ApiResponse<Tabungan>>,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const tabunganId = Number(req.params.id);
    const existing = await Model.findById(tabunganId, userId!);
    if (!existing) {
      throw new AppError(
        `Tabungan dengan id ${tabunganId} tidak ditemukan`,
        404,
      );
    }
    const { totalDeposit } = req.body;
    if (totalDeposit === null || totalDeposit === undefined) {
      throw new AppError(`Harap isi totalDeposit`, 400);
    }
    if (typeof totalDeposit !== "number") {
      throw new AppError(`totalDeposit Wajib angka`, 400);
    }
    if (totalDeposit <= 0) {
      throw new AppError(`TotalDeposit harus diatas 0`, 400);
    }
    const totalTabungan = existing.totalTabungan + totalDeposit;
    const tabungan = await Model.update(tabunganId, userId!, { totalTabungan });
    res.status(200).json({
      success: true,
      data: tabungan,
      message: `Deposit Sejumlah ${totalDeposit} Berhasil dilakukan`,
    });
  } catch (error) {
    next(error);
  }
};
// renameTabungan / ganti nama tabungan
export const renameTabungan = async (
  req: AuthRequest,
  res: Response<ApiResponse<Tabungan>>,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const tabunganId = Number(req.params.id);
    const existing = await Model.findById(tabunganId, userId!);
    if (!existing) {
      throw new AppError(
        `Tabungan dengan id ${tabunganId} tidak ditemukan`,
        404,
      );
    }
    const { namaTabungan } = req.body;
    if (!namaTabungan) {
      throw new AppError(`Nama tabungan harus diisi`, 400);
    }
    const tabungan = await Model.update(tabunganId, userId!, { namaTabungan });
    res.status(200).json({
      success: true,
      data: tabungan,
      message: `Tabungan berhasil di rename`,
    });
  } catch (error) {
    next(error);
  }
};
// resetTabungan / mengubah jumlah tabungan menjadi 0
export const resetTabungan = async (
  req: AuthRequest,
  res: Response<ApiResponse<Tabungan>>,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const tabunganId = Number(req.params.id);
    const existing = await Model.findById(tabunganId, userId!);
    if (!existing) {
      throw new AppError(
        `Tabungan dengan id ${tabunganId} tidak ditemukan`,
        404,
      );
    }
    const tabungan = await Model.update(tabunganId, userId!, {
      totalTabungan: 0,
    });
    res.status(200).json({
      success: true,
      data: tabungan,
      message: `Tabungan berhasil di reset`,
    });
  } catch (error) {
    next(error);
  }
};
// Delete Tabungan
export const removeTabungan = async (
  req: AuthRequest,
  res: Response<Omit<ApiResponse<null>, "data">>,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const tabunganId = Number(req.params.id);
    const existing = await Model.findById(tabunganId, userId!);
    if (!existing) {
      throw new AppError(
        `Tabungan dengan id ${tabunganId} tidak ditemukan`,
        404,
      );
    }
    await Model.remove(tabunganId, userId!);
    res.status(200).json({
      success: true,
      message: `tabungan: ${existing.namaTabungan} berhasil dihapus`,
    });
  } catch (error) {
    next(error);
  }
};
