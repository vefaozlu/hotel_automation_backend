import Joi from "joi";
import Room from "../../../sequelize/models/Room.model.js";

//  This route is only for testing purposes

export default class AdminRoomController {
  static async getRoom(req, res) {
    const roomId = req.params.id;

    try {
      const rooms = await Room.findOne({ where: { id: roomId } });

      return res.status(200).json(rooms);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on rooms" });
    }
  }

  static async createRoom(req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      typeId: Joi.number().required(),
      hotelId: Joi.number().required(),
    });

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      const room = await Room.create(value);

      return res.status(201).json(room);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on creating room" });
    }
  }

  static async updateRoom(req, res) {
    const roomId = req.params.id;
    const schema = Joi.object({
      name: Joi.string().required(),
      typeId: Joi.number().required(),
      hotelId: Joi.number().required(),
    });

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      const room = await Room.findByIdAndUpdate(roomId, value, {
        new: true,
      });

      return res.status(200).json(room);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on updating room" });
    }
  }

  static async deleteRoom(req, res) {
    const roomId = req.params.id;

    try {
      await Room.findByIdAndDelete(roomId);

      return res.status(200).json({ message: "Room deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on deleting room" });
    }
  }
}
