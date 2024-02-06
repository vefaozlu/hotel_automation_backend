import { Router } from "express";
import AdminRoomController from "../controllers/admin_room.controller.js";

const router = Router();

router
  .route("/")
  .post(AdminRoomController.createRoom)
  .put(AdminRoomController.updateRoom)
  .delete(AdminRoomController.deleteRoom);

router.route("/:id").get(AdminRoomController.getRoom);

export default router;
