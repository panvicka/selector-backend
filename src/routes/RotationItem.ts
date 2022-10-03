import express from "express"
import controller from '../controller/RotationItem'

const router = express.Router();


router.post("/create", controller.createRotationItem);
router.get("/get/:rotationItemId", controller.readRotationItem);
router.get("/get/", controller.readAllRotationItems);
router.patch("/update/:rotationItemId", controller.updateRotationItem);
router.delete("/delete/:rotationItemId", controller.deleteRotationItem);

export default router;