import express from "express";
import { getPaints, getPaint, addPaints } from "../controllers/paint.js";
const router = express.Router();

router.get('/add', addPaints);
router.get('/all', getPaints);
router.get('/:id', getPaint);

export default router;