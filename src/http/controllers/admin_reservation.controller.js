import Reservation from "../../../sequelize/models/Reservation.model.js";
import User from "../../../sequelize/models/User.model.js";
import sequelize from "../../../sequelize/config.js";
import Joi from "joi";

export default class AdminReservationController {

  //  Getting all reservations from db (for testing purposes only)

  static async getReservations(req, res) {
    try {
      const reservations = await Reservation.find();

      return res.status(200).json(reservations);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on reservations" });
    }
  }

  //  Getting reservation by id from db

  static async getReservation(req, res) {
    const reservationId = req.params.id;

    try {
      const reservation = await Reservation.findOne({
        where: { id: reservationId },
      });

      return res
        .status(200)
        .render("reservation", { reservation: reservation });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on getting reservation" });
    }
  }

  //  Rendering create reservation page

  static async getCreateReservation(req, res) {
    const hotelId = req.params.id;

    return res.render("create-reservation", { hotelId: hotelId });
  }

  //  Creating reservation

  static async createReservation(req, res) {
    const schema = Joi.object({
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      room_id: Joi.number().required(),
      room_type_id: Joi.number().required(),
      hotel_id: Joi.number().required(),
      visitor_email: Joi.string().required(),
    });
    const user = req.user;

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      const startDate = value.start_date.toISOString().replace(/\..+/g, "");
      const endDate = value.end_date.toISOString().replace(/\..+/g, "");

      const reservation = await Reservation.create({
        startDate: startDate,
        endDate: endDate,
        roomId: value.room_id,
        roomTypeId: value.room_type_id,
        hotelId: value.hotel_id,
        visitorEmail: value.visitor_email,
      });

      return res.status(200).json(reservation);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on creating reservation" });
    }
  }

  //  Updating reservation

  static async updateReservation(req, res) {
    const reservationId = req.params.id;

    const schema = Joi.object({
      start_date: Joi.date(),
      end_date: Joi.date(),
      status: Joi.string(),
      room_id: Joi.number(),
      visitor_email: Joi.string(),
    });

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      if (value.start_date || value.end_date) {
        const startDate = value.start_date.toISOString().replace(/\..+/g, "");
        const endDate = value.end_date.toISOString().replace(/\..+/g, "");

        //  Checking if room is available in selected dates

        const query = `
        SELECT "Rooms".*, "RoomTypes"."price"
        FROM "Rooms"
        JOIN "RoomTypes" ON "Rooms"."typeId" = "RoomTypes"."id"
        WHERE "Rooms"."id" = ${value.room_id} AND "Rooms"."id" NOT IN (
            SELECT "roomId"
            FROM "Reservations"
            WHERE ("startDate" BETWEEN '${startDate}' AND '${endDate}' OR "endDate" BETWEEN '${startDate}' AND '${endDate}') OR ("status" = 'cancelled' OR "status" = 'past')
        );
        `;

        const [results, metadata] = await sequelize.query(query);

        if (results.length === 0) {
          return res
            .status(400)
            .json({ message: "Room is already reserved in selected dates" });
        }
      }

      const reservation = await Reservation.update(
        {
          startDate: value.start_date,
          endDate: value.end_date,
          status: value.status,
          roomId: value.room_id,
          visitorEmail: value.visitor_email,
        },
        { where: { id: reservationId } }
      );

      return res.status(200).json(reservation);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on updating reservation" });
    }
  }

  //  Deleting reservation

  static async deleteReservation(req, res) {
    const reservationId = req.params.id;

    try {
      await Reservation.findByIdAndDelete(reservationId);

      return res.status(200).json({ message: "Reservation deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on deleting reservation" });
    }
  }
}
