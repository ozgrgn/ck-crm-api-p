import Model from "./model.js";

const getCars = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const cars = await Model.Car.find(query, {}, queryOptions);

  const count = await Model.Car.countDocuments(query);

  return { cars, count };
};

const getCar = async (query) => {
  return Model.Car.findOne(query);
};

const addCar = async (name, plaka, image) => {
  try {
    return new Model.Car({
      name,
      plaka,
      image,
    }).save();
  } catch (error) {
    console.log("addCar service error", error);
    throw new Error(error.message);
  }
};

const updateCar = async (carId, car) => {
  try {
    let isExistCar = await Model.Car.findById(carId);

    if (!isExistCar) {
      throw new Error(
        JSON.stringify({
          en: "Car is not found.",
          tr: "Car bulunamadı.",
        })
      );
    }

    return Model.Car.findOneAndUpdate(
      { _id: isExistCar._id },
      { ...car },
      { new: true }
    );
  } catch (error) {
    console.log("updateCar service error", error);
    throw new Error(error.message);
  }
};

const deleteCar = async (carId) => {
  try {
    return Model.Car.deleteOne({ _id: carId });
  } catch (error) {
    console.log("deleteCar service error", error);
    throw new Error(error.message);
  }
};

const getCarViaPerma = async (query) => {
  return Model.Car.findOne(query);
};

export default {
  addCar,
  updateCar,
  deleteCar,
  getCars,
  getCar,
  getCarViaPerma,
};
