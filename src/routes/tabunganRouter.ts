import {
  createTabungan,
  deposit,
  getAllTabungan,
  getTabunganById,
  HapusTabungan,
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
router.patch("/deposit/:id", deposit);
router.patch("/rename/:id", renameTabungan);
router.patch("/reset/:id", resetTabungan);
router.delete("/delete/:id", HapusTabungan);

export default router;
