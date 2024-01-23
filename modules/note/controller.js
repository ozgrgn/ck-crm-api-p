import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addNote = async (req, res) => {
  const { category, status, type, date, message, image, request } = req.body;
  const admin = req.admin;
  try {
    let note = await Service.addNote(
      category,
      status,
      type,
      date,
      message,
      image,
      request,
      admin.adminId
    );

    return res.json({
      status: true,
      note,
    });
  } catch (error) {
    console.log(error.message, "addNote error");
    return res.json({ status: false, message: error.message });
  }
};

const updateNote = async (req, res) => {
  const { note } = req.body;
  const { noteId } = req.params;
  const admin = req.admin;
console.log(admin)
  try {
    let updatedNote = await Service.updateNote(noteId, note, admin.adminId);

    return res.json({
      status: true,
      updatedNote,
    });
  } catch (error) {
    console.log(error.message, "updateNote error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    await Service.deleteNote(noteId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteNote error");
    return res.json({ status: false, message: error.message });
  }
};

const getNotes = async (req, res) => {
  const { limit, skip, request } = req.query;

  try {
    const notesQuery = _.omitBy(
      {
        request: request ? request : undefined,
      },
      (a) => a === undefined
    );
    let notes = await Service.getNotes(notesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...notes });
  } catch (error) {
    console.log(error.message, "getNotes error");
    return res.json({ status: false, message: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const NoteQuery = _.omitBy(
      {
        _id: req.params.noteId,
      },
      (a) => a === undefined
    );

    let note = await Service.getNote(NoteQuery);
    return res.json({ status: true, note });
  } catch (error) {
    console.log(error.message, "getNote error");
    return res.json({ status: false, message: error.message });
  }
};

const getNoteViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let note = await Service.getNoteViaPerma(EventQuery);
    return res.json({ status: true, note });
  } catch (error) {
    console.log(error.message, "getNote error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNote,
  getNoteViaPerma,
};
