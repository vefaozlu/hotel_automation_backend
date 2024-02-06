import Joi from "joi";
import sequelize from "../../../sequelize/config.js";
import Reservation from "../../../sequelize/models/Reservation.model.js";

export default class ApiReservationController {
  //  Getting all reservations from db by visitor email

  static async getReservation(req, res) {
    try {
      const reservations = await Reservation.findAll({
        where: { visitorEmail: req.query.visitor_email },
      });

      return res.status(200).json(reservations);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on reservations" });
    }
  }

  //  Get avaliable rooms by start and end dates

  static async getAvailableRooms(req, res) {
    const schema = Joi.object({
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      hotel_id: Joi.number().required(),
    });

    const user = req.user;

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        console.log(error);
        return res.status(400).json(error);
      }

      const startDate = value.start_date.toISOString().replace(/\..+/g, "");
      const endDate = value.end_date.toISOString().replace(/\..+/g, "");

      //  ! Avaliable rooms by roomType (for testing purposes)

      /*       const query = `
        SELECT "Hotels"."name" as hotel_name, "Hotels"."description" as description, "RoomTypes"."id", "RoomTypes"."name", "RoomTypes"."price","RoomTypes"."hotelId"
        FROM "Hotels"
        JOIN "RoomTypes" ON "Hotels"."id" = "RoomTypes"."hotelId"
        WHERE "RoomTypes"."id" NOT IN (
            SELECT "roomTypeId"
            FROM "Reservations"
            WHERE ("startDate" BETWEEN '${startDate}' AND '${endDate}' OR "endDate" BETWEEN '${startDate}' AND '${endDate}') AND ("status" <> 'cancelled' OR "status" <> 'past')
        );
        `; */

      //  ! Avaliable rooms of hotel.id = 18 (Hotel with 10 rooms for the case scenario)

      const query = `
        SELECT "Rooms".*, "RoomTypes"."price"
        FROM "Rooms"
        JOIN "RoomTypes" ON "Rooms"."typeId" = "RoomTypes"."id"
        WHERE "Rooms"."hotelId" = 18 AND "Rooms"."id" NOT IN (
            SELECT "roomId"
            FROM "Reservations"
            WHERE ("startDate" BETWEEN '${startDate}' AND '${endDate}' OR "endDate" BETWEEN '${startDate}' AND '${endDate}') AND ("status" <> 'cancelled')
        );
        `;

      const [results, metadata] = await sequelize.query(query);

      return res.status(200).json(results);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on getting rooms" });
    }
  }

  //  ! Create reservation for specific room (For case scenerio)

  static async createReservation(req, res) {
    const schema = Joi.object({
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      room_id: Joi.number().required(),
      visitor_email: Joi.string().email().required(),
    });

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        console.log(error);
        return res.status(400).json(error);
      }

      const startDate = value.start_date.toISOString().replace(/\..+/g, "");
      const endDate = value.end_date.toISOString().replace(/\..+/g, "");

      const reservation = await Reservation.create({
        startDate: value.start_date,
        endDate: value.end_date,
        total: 100,
        statusId: 1,
        visitorEmail: value.visitor_email,
        roomId: value.room_id,
        hotelId: 18,
      });

      return res.status(200).json({ message: "Reservation created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on creating reservation" });
    }
  }

  //  Almost the same with admin update reservation route but here didUpdated will be checked and when updated this column will set to true

  static async updateReservation(req, res) {
    const reservationId = req.params.id;

    const schema = Joi.object({
      start_date: Joi.date(),
      end_date: Joi.date(),
      status: Joi.string(),
      room_id: Joi.number(),
      visitor_email: Joi.string(),
    });

    console.log(req.body);

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      if (value.start_date || value.end_date) {
        const startDate = value.start_date.toISOString().replace(/\..+/g, "");
        const endDate = value.end_date.toISOString().replace(/\..+/g, "");

        const reservation = Reservation.findOne({
          where: { id: reservationId },
        });

        if (reservation.didUpdated) {
          return res
            .status(400)
            .json({ message: "Reservation is already updated" });
        }

        const query = `
        SELECT "Rooms".*, "RoomTypes"."price"
        FROM "Rooms"
        JOIN "RoomTypes" ON "Rooms"."typeId" = "RoomTypes"."id"
        WHERE "Rooms"."id" = ${value.room_id} AND "Rooms"."id" NOT IN (
            SELECT "roomId"
            FROM "Reservations"
            WHERE ("startDate" BETWEEN '${startDate}' AND '${endDate}' OR "endDate" BETWEEN '${startDate}' AND '${endDate}') OR ("status" <> 'cancelled' OR "status" <> 'past')
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
          didUpdate: true,
        },
        { where: { id: reservationId, didUpdated: false } }
      );

      return res.status(200).json(reservation);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on updating reservation" });
    }
  }

  //  ! Create reservation with room_type_id and hotel_id

  static async createReservationTest(req, res) {
    const schema = Joi.object({
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      room_type_id: Joi.number().required(),
      hotel_id: Joi.number().required(),
    });

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        console.log(error);
        return res.status(400).json(error);
      }

      const startDate = value.start_date.toISOString().replace(/\..+/g, "");
      const endDate = value.end_date.toISOString().replace(/\..+/g, "");

      const query = `
      SELECT *
      FROM "Rooms"
      WHERE "typeId" = '${value.room_type_id}' AND "id" NOT IN (
          SELECT "roomId"
          FROM "Reservations"
          WHERE ("startDate" BETWEEN '${startDate}' AND '${endDate}' OR "endDate" BETWEEN '${startDate}' AND '${endDate}')
      );
      `;

      const [results, metadata] = await sequelize.query(query);

      if (!results.length) {
        return res.status(400).json({ message: "No rooms available" });
      }

      const reservation = await Reservation.create({
        startDate: value.start_date,
        endDate: value.end_date,
        total: 100,
        statusId: 1,
        visitorId: 2,
        roomId: results[0].id,
        roomTypeId: value.room_type_id,
        hotelId: value.hotel_id,
      });

      return res.status(200).json({ message: "Reservation created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on creating reservation" });
    }
  }
}
