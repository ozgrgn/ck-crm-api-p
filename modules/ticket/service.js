import Model from "./model.js";

const getTickets = async (query = {}, options = {}) => {
  const { queryOptions } = options;
console.log(query,"ticket querty")
  const tickets = await Model.Ticket.find(
    query,
    {},
    queryOptions
  );

  const count = await Model.Ticket.countDocuments(query);

  return { tickets, count };
};

const getTicket = async (query) => {
  return Model.Ticket.findOne(query);
};

const addTicket = async (
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
) => {
  try {
    return new Model.Ticket({
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
    }).save();
  } catch (error) {
    console.log("addTicket service error", error);
    throw new Error(error.message);
  }
};

const updateTicket = async (ticketId, ticket) => {
  try {
    let isExistTicket = await Model.Ticket.findById(ticketId);

    if (!isExistTicket) {
      throw new Error(
        JSON.stringify({
          en: "Ticket is not found.",
          tr: "Ticket bulunamadı.",
        })
      );
    }

    return Model.Ticket.findOneAndUpdate(
      { _id: isExistTicket._id },
      { ...ticket },
      { new: true }
    );
  } catch (error) {
    console.log("updateTicket service error", error);
    throw new Error(error.message);
  }
};

const deleteTicket = async (ticketId) => {
  try {
    return Model.Ticket.deleteOne({ _id: ticketId });
  } catch (error) {
    console.log("deleteTicket service error", error);
    throw new Error(error.message);
  }
};

const getTicketViaPerma = async (query) => {
  return Model.Ticket.findOne(query);
};

export default {
  addTicket,
  updateTicket,
  deleteTicket,
  getTickets,
  getTicket,
  getTicketViaPerma,
};
