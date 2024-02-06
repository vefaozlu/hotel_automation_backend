import { Router } from "express";
import AdminRoomTypeController from "../controllers/admin_roomType.controller.js";

const router = Router();

router.get("/create/:id", AdminRoomTypeController.getCreateRoomType);

router
  .route("/")
  .get(AdminRoomTypeController.getRoomTypes)
  .post(AdminRoomTypeController.createRoomType)
  .put(AdminRoomTypeController.updateRoomType)
  .delete(AdminRoomTypeController.deleteRoomType);

router.get("/:id", AdminRoomTypeController.getRoomType);

export default router;
