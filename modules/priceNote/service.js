import Model from "./model.js";

const getPriceNotes = async (query = {}, options = {}) => {
  const { queryOptions } = options;
console.log(query)
  const priceNotes = await Model.PriceNote.find(query, {}, queryOptions).populate({
    path: "priceNote_user",
    model: "admin",
  });

  const count = await Model.PriceNote.countDocuments(query);

  return { priceNotes, count };
};

const getPriceNote = async (query) => {
  return Model.PriceNote.findOne(query);
};

const addPriceNote = async (
  category,
  status,
  type,
  date,
  note,
  request,
  priceNote_user
) => {
  try {
    return new Model.PriceNote({
      category,
      status,
      type,
      date,
      note,
      request,
      priceNote_user
    }).save();
  } catch (error) {
    console.log("addPriceNote service error", error);
    throw new Error(error.message);
  }
};

const updatePriceNote = async (priceNoteId, priceNote, admin) => {
  priceNote.priceNote_user = admin;
  try {
    let isExistPriceNote = await Model.PriceNote.findById(priceNoteId);

    if (!isExistPriceNote) {
      throw new Error(
        JSON.stringify({
          en: "PriceNote is not found.",
          tr: "PriceNote bulunamadı.",
        })
      );
    }

    return Model.PriceNote.findOneAndUpdate(
      { _id: isExistPriceNote._id },
      { ...priceNote },
      { new: true }
    );
  } catch (error) {
    console.log("updatePriceNote service error", error);
    throw new Error(error.message);
  }
};

const deletePriceNote = async (priceNoteId) => {
  try {
    return Model.PriceNote.deleteOne({ _id: priceNoteId });
  } catch (error) {
    console.log("deletePriceNote service error", error);
    throw new Error(error.message);
  }
};

const getPriceNoteViaPerma = async (query) => {
  return Model.PriceNote.findOne(query);
};

export default {
  addPriceNote,
  updatePriceNote,
  deletePriceNote,
  getPriceNotes,
  getPriceNote,
  getPriceNoteViaPerma,
};
