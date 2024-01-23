import Model from "./model.js";

const getNotes = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const notes = await Model.Note.find(query, {}, queryOptions).populate({
    path: "note_user",
    model: "admin",
  });

  const count = await Model.Note.countDocuments(query);

  return { notes, count };
};

const getNote = async (query) => {
  return Model.Note.findOne(query);
};

const addNote = async (
  category,
  status,
  type,
  date,
  message,
  image,
  request,
  note_user
) => {
  try {
    return new Model.Note({
      category,
      status,
      type,
      date,
      message,
      image,
      request,
      note_user,
    }).save();
  } catch (error) {
    console.log("addNote service error", error);
    throw new Error(error.message);
  }
};

const updateNote = async (noteId, note, admin) => {
  note.note_user = admin;
  try {
    let isExistNote = await Model.Note.findById(noteId);

    if (!isExistNote) {
      throw new Error(
        JSON.stringify({
          en: "Note is not found.",
          tr: "Note bulunamadı.",
        })
      );
    }

    return Model.Note.findOneAndUpdate(
      { _id: isExistNote._id },
      { ...note },
      { new: true }
    );
  } catch (error) {
    console.log("updateNote service error", error);
    throw new Error(error.message);
  }
};

const deleteNote = async (noteId) => {
  try {
    return Model.Note.deleteOne({ _id: noteId });
  } catch (error) {
    console.log("deleteNote service error", error);
    throw new Error(error.message);
  }
};

const getNoteViaPerma = async (query) => {
  return Model.Note.findOne(query);
};

export default {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNote,
  getNoteViaPerma,
};
