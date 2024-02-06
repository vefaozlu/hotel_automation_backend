import RoomType from "../../../sequelize/models/RoomType.model.js";
import Room from "../../../sequelize/models/Room.model.js";
import Joi from "joi";

//  This route is for testing purposes only

export default class AdminRoomTypeController {
  static async getRoomTypes(req, res) {
    const hotelId = req.params.id;

    try {
      const roomTypes = await RoomType.findAll({ where: { hotelId: hotelId } });

      console.log(roomTypes);

      return res.status(200).render("roomTypes", { roomTypes: roomTypes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on roomTypes" });
    }
  }

  static async getRoomType(req, res) {
    const id = req.params.id;

    try {
      const roomType = await RoomType.findOne({ where: { id: id } });

      return res.status(200).json(roomType);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on getting roomType" });
    }
  }

  static async getCreateRoomType(req, res) {
    const hotelId = req.params.id;
    return res.status(200).render("create-roomtype", {hotelId: hotelId});
  }

  static async createRoomType(req, res) {
    console.log("Creating RoomType");
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      hotelId: Joi.number().required(),
      room_count: Joi.number(),
      room_start: Joi.number(),
    });

    const user = req.user;

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        console.log(error);
        return res.status(400).json(error);
      }

      const roomType = await RoomType.create({
        name: value.name,
        description: value.description,
        price: value.price,
        hotelId: value.hotelId,
      });

      if (value.room_count > 0) {
        console.log("Creating rooms");
        let roomList = [];

        for (
          let i = value.room_start;
          i < value.room_start + value.room_count;
          i++
        ) {
          roomList.push({
            name: i,
            typeId: roomType.id,
            hotelId: value.hotelId,
          });
        }

        await Room.bulkCreate(roomList);
      }

      return res.status(200).json(roomType);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on creating roomType" });
    }
  }

  static async updateRoomType(req, res) {
    const id = req.params.id;
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
    });

    try {
      const { value, error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      const roomType = await RoomType.update(
        {
          name: value.name,
          description: value.description,
          price: value.price,
        },
        { where: { id: id } }
      );

      return res.status(200).json(roomType);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on updating roomType" });
    }
  }

  static async deleteRoomType(req, res) {
    const id = req.params.id;

    try {
      await RoomType.destroy({ where: { id: id } });

      return res.status(200).json({ message: "RoomType deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error on deleting roomType" });
    }
  }
}
