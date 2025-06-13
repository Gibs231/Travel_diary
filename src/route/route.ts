// @ts-nocheck
import express from "express";
import upload from "../middleware/upload";
import TravelController from "../controller/travel_controller";


const router = express.Router();

router.get("/travel", TravelController.index);
router.get("/travel/:id", TravelController.show);
router.post("/travel", upload.single("image"), TravelController.store);
router.put("/travel/:id", upload.single("image"), TravelController.update);
router.delete("/travel/:id", TravelController.destroy);

export default router;