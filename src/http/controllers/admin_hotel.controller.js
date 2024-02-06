import Hotel from "../../../sequelize/models/Hotel.model.js";
import Reservation from "../../../sequelize/models/Reservation.model.js";
import User from "../../../sequelize/models/User.model.js";
import RoomType from "../../../sequelize/models/RoomType.model.js";
import Joi from "joi";

export default class AdminHotelController {
  //  Getting hotels of user from db

  static async getHotels(req, res) {
    try {
      const user = req.user;

      const hotels = await Hotel.findAll({ where: { ownerId: user.id } });

      return res.status(200).render("hotels", { hotels: hotels });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on hotels" });
    }
  }

  //  Getting hotel by id with rooms and reservations

  static async getHotel(req, res) {
    const hotelId = req.params.id;

    try {
      const hotel = await Hotel.findOne({
        where: { id: hotelId },
        include: [{ model: Reservation }, { model: RoomType, as: "RoomTypes" }],
      });

      return res.status(200).render("hotel", {
        hotel: hotel,
        reservations: hotel.Reservations,
        roomTypes: hotel.RoomTypes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on getting hotel" });
    }
  }

  //  Rendering create hotel page (for testing purposes only)

  static async getCreateHotel(req, res) {
    return res.status(200).render("create-hotel");
  }

  //  Creating hotel (for testing purposes only)

  static async createHotel(req, res) {
    console.log("Creating Hotel");
    const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
    });
    const user = req.user;

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      const hotel = await Hotel.create({
        name: value.name,
        address: value.address,
        ownerId: user.id,
      });

      console.log(hotel);

      return res.status(200).json(hotel);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on creating hotel" });
    }
  }

  //  Updating hotel (for testing purposes only)

  static async updateHotel(req, res) {
    const hotelId = req.params.id;
    const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
    });

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      const hotel = await Hotel.findByIdAndUpdate(hotelId, value);

      return res.status(200).json(hotel);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on updating hotel" });
    }
  }

  //  Deleting hotel (for testing purposes only)

  static async deleteHotel(req, res) {
    const hotelId = req.params.id;

    try {
      await Hotel.findByIdAndDelete(hotelId);

      return res.status(200).json({ message: "Hotel deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on deleting hotel" });
    }
  }
}
