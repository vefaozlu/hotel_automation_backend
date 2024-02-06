import Hotel from "../../../sequelize/models/Hotel.model.js";
import Joi from "joi";

//  This route is for testing purposes only

export default class ApiHotelController {
  static async getHotels(req, res) {
    try {
      const hotels = await Hotel.find();

      return res.status(200).json(hotels);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on hotels" });
    }
  }

  static async getHotel(req, res) {
    const hotelId = req.params.id;

    try {
      const hotel = await Hotel.findById(hotelId);

      return res.status(200).json(hotel);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on getting hotel" });
    }
  }

  static async createHotel(req, res) {
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

      const hotel = await Hotel.create({ ownerId: user.id }, ...value);

      return res.status(201).json(hotel);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on creating hotel" });
    }
  }

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
