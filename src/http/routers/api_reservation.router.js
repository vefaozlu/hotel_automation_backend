import { Router } from "express";
import ReservationController from "../controllers/api_reservation.controller.js";

const router = Router();

router.post("/rooms", ReservationController.getAvailableRooms);

router.post("/create", ReservationController.createReservation);

router.get("/", ReservationController.getReservation);

router.route("/:id").put(ReservationController.updateReservation);

export default router;
