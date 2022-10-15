import express from "express"
import { getLaporan } from "../controllers/laporan.js"

const router = express.Router()

// LAPORAN
router.get("/laporan/:id", getLaporan)


export default router
