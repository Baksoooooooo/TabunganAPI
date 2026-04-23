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
router.put("/deposit/:id", deposit);
router.put("/rename/:id", renameTabungan);
router.put("/reset/:id", resetTabungan);
router.delete("/delete/:id", HapusTabungan);

export default router;
