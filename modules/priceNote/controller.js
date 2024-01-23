import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addPriceNote = async (req, res) => {
  const { category, status, type, date, note, request } = req.body;
  const admin = req.admin;
  try {
    let priceNote = await Service.addPriceNote(
      category,
      status,
      type,
      date,
      note,
      request,
      admin.adminId
    );

    return res.json({
      status: true,
      priceNote,
    });
  } catch (error) {
    console.log(error.message, "addPriceNote error");
    return res.json({ status: false, message: error.message });
  }
};

const updatePriceNote = async (req, res) => {
  const { priceNote } = req.body;
  const { priceNoteId } = req.params;
  const admin = req.admin;
  console.log(admin);
  try {
    let updatedPriceNote = await Service.updatePriceNote(
      priceNoteId,
      priceNote,
      admin.adminId
    );

    return res.json({
      status: true,
      updatedPriceNote,
    });
  } catch (error) {
    console.log(error.message, "updatePriceNote error");
    return res.json({ status: false, message: error.message });
  }
};

const deletePriceNote = async (req, res) => {
  const { priceNoteId } = req.params;

  try {
    await Service.deletePriceNote(priceNoteId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deletePriceNote error");
    return res.json({ status: false, message: error.message });
  }
};

const getPriceNotes = async (req, res) => {
  const { limit, skip, request } = req.query;
console.log(request,"request price")
  try {
    const priceNotesQuery = _.omitBy(
      {
        request: request ? request : undefined,
      },
      (a) => a === undefined
    );
    let priceNotes = await Service.getPriceNotes(priceNotesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...priceNotes });
  } catch (error) {
    console.log(error.message, "getPriceNotes error");
    return res.json({ status: false, message: error.message });
  }
};

const getPriceNote = async (req, res) => {
  try {
    const PriceNoteQuery = _.omitBy(
      {
        _id: req.params.priceNoteId,
      },
      (a) => a === undefined
    );

    let priceNote = await Service.getPriceNote(PriceNoteQuery);
    return res.json({ status: true, priceNote });
  } catch (error) {
    console.log(error.message, "getPriceNote error");
    return res.json({ status: false, message: error.message });
  }
};

const getPriceNoteViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let priceNote = await Service.getPriceNoteViaPerma(EventQuery);
    return res.json({ status: true, priceNote });
  } catch (error) {
    console.log(error.message, "getPriceNote error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addPriceNote,
  updatePriceNote,
  deletePriceNote,
  getPriceNotes,
  getPriceNote,
  getPriceNoteViaPerma,
};
