import AdminHotelController from "../controllers/admin_hotel.controller.js";
import { Router } from "express";

const router = Router();

router.route("/create").get(AdminHotelController.getCreateHotel);

router
  .route("/")
  .get(AdminHotelController.getHotels)
  .post(AdminHotelController.createHotel)
  .put(AdminHotelController.updateHotel)
  .delete(AdminHotelController.deleteHotel);

router.route("/:id").get(AdminHotelController.getHotel);

export default router;
