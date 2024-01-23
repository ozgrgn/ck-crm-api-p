import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addTicket = async (req, res) => {
  const {
    patient,
    request,
    arrivalPNR,
    arrivalFlightNo,
    arrivalAirport,
    arrivalDate,
    arrivalPatient,
    arrivalCompanion,
    departurePNR,
    departureFlightNo,
    departureAirport,
    departureDate,
    departurePatient,
    departureCompanion

  } = req.body;

  try {
    let ticket = await Service.addTicket(
      patient,
      request,
      arrivalPNR,
      arrivalFlightNo,
      arrivalAirport,
      arrivalDate,
      arrivalPatient,
      arrivalCompanion,
      departurePNR,
      departureFlightNo,
      departureAirport,
      departureDate,
      departurePatient,
      departureCompanion
    );

    return res.json({
      status: true,
      ticket,
    });
  } catch (error) {
    console.log(error.message, "addTicket error");
    return res.json({ status: false, message: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { ticket } = req.body;
  const { ticketId } = req.params;
  try {
    let updatedTicket = await Service.updateTicket(ticketId, ticket);

    return res.json({
      status: true,
      updatedTicket,
    });
  } catch (error) {
    console.log(error.message, "updateTicket error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    await Service.deleteTicket(ticketId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteTicket error");
    return res.json({ status: false, message: error.message });
  }
};

const getTickets = async (req, res) => {
  const { limit, skip,request } = req.query;
console.log(request,"request")
  try {
    const ticketsQuery = _.omitBy(
      {
        request: request ? request : undefined,
      },
      (a) => a === undefined
    );
    let tickets = await Service.getTickets(ticketsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...tickets });
  } catch (error) {
    console.log(error.message, "getTickets error");
    return res.json({ status: false, message: error.message });
  }
};

const getTicket = async (req, res) => {
  try {
    const TicketQuery = _.omitBy(
      {
        _id: req.params.ticketId,
      },
      (a) => a === undefined
    );

    let ticket = await Service.getTicket(TicketQuery);
    return res.json({ status: true, ticket });
  } catch (error) {
    console.log(error.message, "getTicket error");
    return res.json({ status: false, message: error.message });
  }
};

const getTicketViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let ticket = await Service.getTicketViaPerma(EventQuery);
    return res.json({ status: true, ticket });
  } catch (error) {
    console.log(error.message, "getTicket error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addTicket,
  updateTicket,
  deleteTicket,
  getTickets,
  getTicket,
  getTicketViaPerma,
};
