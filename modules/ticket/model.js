import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    arrivalPNR: { type: String, required: false },
    arrivalFlightNo: { type: String, required: false },
    arrivalAirport: { type: String, required: false },
    arrivalDate: { type: Date, required: false },
    arrivalPatient: { type: String, required: false },
    arrivalCompanion: { type: String, required: false },
    departurePNR: { type: String, required: false },
    departureFlightNo: { type: String, required: false },
    departureAirport: { type: String, required: false },
    departureDate: { type: Date, required: false },
    departurePatient: { type: String, required: false },
    departureCompanion: { type: String, required: false },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model("Ticket", TicketSchema);

export default {
  Ticket,
};
