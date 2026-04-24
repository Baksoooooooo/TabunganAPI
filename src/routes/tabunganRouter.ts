import {
  createTabungan,
  deposit,
  getAllTabungan,
  getTabunganById,
  removeTabungan,
  renameTabungan,
  resetTabungan,
} from "@controllers/Tabungan";
import AuthToken from "@middlewares/AuthToken";
import express from "express";

const router = express.Router();

router.use(AuthToken);
router.get("/", getAllTabungan);
router.get("/:id", getTabunganById);
router.post("/", createTabungan);
router.patch("/:id/deposit", deposit);
router.patch("/:id/rename", renameTabungan);
router.patch("/:id/reset", resetTabungan);
router.delete("/:id", removeTabungan);

export default router;
