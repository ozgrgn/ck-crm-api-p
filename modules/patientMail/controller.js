import Service from "./service.js";
import _ from "lodash";
const addPatientMail = async (req, res) => {
  const {
    patient,
    status,
    request,
    email,
    subject,
    text,
  } = req.body;
  console.log(req.body)
  try {
    let patientMail = await Service.addPatientMail(
      patient,
      status,
      request,
      email,
      subject,
      text,
    );

    return res.json({
      status: true,
      patientMail,
    });
  } catch (error) {
    console.log(error.message, "addPatientMail error");
    return res.json({ status: false, message: error.message });
  }
};

const updatePatientMail = async (req, res) => {
  const { patientMail } = req.body;
  const { patientMailId } = req.params;
  console.log(patientMail, "sdsfsfsdfsdsf");
  try {
    let updatedPatientMail = await Service.updatePatientMail(
      patientMailId,
      patientMail
    );

    return res.json({
      status: true,
      updatedPatientMail,
    });
  } catch (error) {
    console.log(error.message, "updatePatientMail error");
    return res.json({ status: false, message: error.message });
  }
};

const deletePatientMail = async (req, res) => {
  const { patientMailId } = req.params;

  try {
    await Service.deletePatientMail(patientMailId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deletePatientMail error");
    return res.json({ status: false, message: error.message });
  }
};

const getPatientMails = async (req, res) => {
  const { limit, skip, lang, treatment, isActive,general} = req.query;

  try {
    const patientMailsQuery = _.omitBy(
      {
        lang,
        isActive,
        treatment,
        general
      },
      (a) => a === undefined
    );
    let patientMails = await Service.getPatientMails(patientMailsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...patientMails });
  } catch (error) {
    console.log(error.message, "getPatientMails error");
    return res.json({ status: false, message: error.message });
  }
};

const getPatientMail = async (req, res) => {
  try {
    const PatientMailQuery = _.omitBy(
      {
        _id: req.params.patientMailId,
      },
      (a) => a === undefined
    );

    let patientMail = await Service.getPatientMail(PatientMailQuery);
    return res.json({ status: true, patientMail });
  } catch (error) {
    console.log(error.message, "getPatientMail error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addPatientMail,
  updatePatientMail,
  deletePatientMail,
  getPatientMails,
  getPatientMail
};
