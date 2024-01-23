import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addHotel = async (req, res) => {
  const { name, stars, location, map, image } = req.body;

  try {
    let hotel = await Service.addHotel(name, stars, location, map, image);

    return res.json({
      status: true,
      hotel,
    });
  } catch (error) {
    console.log(error.message, "addHotel error");
    return res.json({ status: false, message: error.message });
  }
};

const updateHotel = async (req, res) => {
  const { hotel } = req.body;
  const { hotelId } = req.params;
  try {
    let updatedHotel = await Service.updateHotel(hotelId, hotel);

    return res.json({
      status: true,
      updatedHotel,
    });
  } catch (error) {
    console.log(error.message, "updateHotel error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    await Service.deleteHotel(hotelId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteHotel error");
    return res.json({ status: false, message: error.message });
  }
};

const getHotels = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    let hotels = await Service.getHotels({
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...hotels });
  } catch (error) {
    console.log(error.message, "getHotels error");
    return res.json({ status: false, message: error.message });
  }
};

const getHotel = async (req, res) => {
  try {
    const HotelQuery = _.omitBy(
      {
        _id: req.params.hotelId,
      },
      (a) => a === undefined
    );

    let hotel = await Service.getHotel(HotelQuery);
    return res.json({ status: true, hotel });
  } catch (error) {
    console.log(error.message, "getHotel error");
    return res.json({ status: false, message: error.message });
  }
};

const getHotelViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let hotel = await Service.getHotelViaPerma(EventQuery);
    return res.json({ status: true, hotel });
  } catch (error) {
    console.log(error.message, "getHotel error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotel,
  getHotelViaPerma,
};
