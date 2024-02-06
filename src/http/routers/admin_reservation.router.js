import AdminReservationController from "../controllers/admin_reservation.controller.js";
import { Router } from "express";

const router = Router();

router
  .route("/create/:id")
  .get(AdminReservationController.getCreateReservation);

router
  .route("/")
  .get(AdminReservationController.getReservations)
  .post(AdminReservationController.createReservation);

router
  .route("/:id")
  .get(AdminReservationController.getReservation)
  .put(AdminReservationController.updateReservation)
  .delete(AdminReservationController.deleteReservation);

export default router;
