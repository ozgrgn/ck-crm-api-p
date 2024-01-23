import Service from "./service.js";
import _ from "lodash";
const addReservation = async (req, res) => {
  const {
    lang,
    name,
    phone,
    date,
    email,
    treatment,
    subject,
    message,
    image,
  } = req.body;
  console.log(req.body)
  try {
    let reservation = await Service.addReservation(
      lang,
      name,
      phone,
      date,
      email,
      treatment,
      subject,
      message,
      image,
    );

    return res.json({
      status: true,
      reservation,
    });
  } catch (error) {
    console.log(error.message, "addReservation error");
    return res.json({ status: false, message: error.message });
  }
};

const updateReservation = async (req, res) => {
  const { reservation } = req.body;
  const { reservationId } = req.params;
  console.log(reservation, "sdsfsfsdfsdsf");
  try {
    let updatedReservation = await Service.updateReservation(
      reservationId,
      reservation
    );

    return res.json({
      status: true,
      updatedReservation,
    });
  } catch (error) {
    console.log(error.message, "updateReservation error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    await Service.deleteReservation(reservationId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteReservation error");
    return res.json({ status: false, message: error.message });
  }
};

const getReservations = async (req, res) => {
  const { limit, skip, lang, treatment, isActive,general} = req.query;

  try {
    const reservationsQuery = _.omitBy(
      {
        lang,
        isActive,
        treatment,
        general
      },
      (a) => a === undefined
    );
    let reservations = await Service.getReservations(reservationsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...reservations });
  } catch (error) {
    console.log(error.message, "getReservations error");
    return res.json({ status: false, message: error.message });
  }
};

const getReservation = async (req, res) => {
  try {
    const ReservationQuery = _.omitBy(
      {
        _id: req.params.reservationId,
      },
      (a) => a === undefined
    );

    let reservation = await Service.getReservation(ReservationQuery);
    return res.json({ status: true, reservation });
  } catch (error) {
    console.log(error.message, "getReservation error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addReservation,
  updateReservation,
  deleteReservation,
  getReservations,
  getReservation
};
