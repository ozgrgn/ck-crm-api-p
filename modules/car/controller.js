import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addCar = async (req, res) => {
  const { name, plaka, image } = req.body;

  try {
    let car = await Service.addCar(name, plaka, image);

    return res.json({
      status: true,
      car,
    });
  } catch (error) {
    console.log(error.message, "addCar error");
    return res.json({ status: false, message: error.message });
  }
};

const updateCar = async (req, res) => {
  const { car } = req.body;
  const { carId } = req.params;
  try {
    let updatedCar = await Service.updateCar(carId, car);

    return res.json({
      status: true,
      updatedCar,
    });
  } catch (error) {
    console.log(error.message, "updateCar error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteCar = async (req, res) => {
  const { carId } = req.params;

  try {
    await Service.deleteCar(carId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteCar error");
    return res.json({ status: false, message: error.message });
  }
};

const getCars = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    let cars = await Service.getCars({
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...cars });
  } catch (error) {
    console.log(error.message, "getCars error");
    return res.json({ status: false, message: error.message });
  }
};

const getCar = async (req, res) => {
  try {
    const CarQuery = _.omitBy(
      {
        _id: req.params.carId,
      },
      (a) => a === undefined
    );

    let car = await Service.getCar(CarQuery);
    return res.json({ status: true, car });
  } catch (error) {
    console.log(error.message, "getCar error");
    return res.json({ status: false, message: error.message });
  }
};

const getCarViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let car = await Service.getCarViaPerma(EventQuery);
    return res.json({ status: true, car });
  } catch (error) {
    console.log(error.message, "getCar error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addCar,
  updateCar,
  deleteCar,
  getCars,
  getCar,
  getCarViaPerma,
};
