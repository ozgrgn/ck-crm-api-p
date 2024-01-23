import Model from "./model.js";

const getHotels = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const hotels = await Model.Hotel.find(query, {}, queryOptions);

  const count = await Model.Hotel.countDocuments(query);

  return { hotels, count };
};

const getHotel = async (query) => {
  return Model.Hotel.findOne(query);
};

const addHotel = async (name, stars, location, map, image) => {
  try {
    return new Model.Hotel({
      name,
      stars,
      location,
      map,
      image,
    }).save();
  } catch (error) {
    console.log("addHotel service error", error);
    throw new Error(error.message);
  }
};

const updateHotel = async (hotelId, hotel) => {
  try {
    let isExistHotel = await Model.Hotel.findById(hotelId);

    if (!isExistHotel) {
      throw new Error(
        JSON.stringify({
          en: "Hotel is not found.",
          tr: "Hotel bulunamadı.",
        })
      );
    }

    return Model.Hotel.findOneAndUpdate(
      { _id: isExistHotel._id },
      { ...hotel },
      { new: true }
    );
  } catch (error) {
    console.log("updateHotel service error", error);
    throw new Error(error.message);
  }
};

const deleteHotel = async (hotelId) => {
  try {
    return Model.Hotel.deleteOne({ _id: hotelId });
  } catch (error) {
    console.log("deleteHotel service error", error);
    throw new Error(error.message);
  }
};

const getHotelViaPerma = async (query) => {
  return Model.Hotel.findOne(query);
};

export default {
  addHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotel,
  getHotelViaPerma,
};
