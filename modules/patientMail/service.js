import Mail from "../mail/mail.js";
import emailResTemplate from "./emailPatientTemplate.js";
import Model from "./model.js";

const getPatientMails = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const patientMails = await Model.PatientMail.find(
    query,
    {},
    queryOptions
  ).sort({
    order: 1,
  });
  const count = await Model.PatientMail.countDocuments(query);

  return { patientMails, count };
};

const getPatientMail = async (query) => {
  console.log(query, "servis query");
  return Model.PatientMail.findOne(query);
};

const addPatientMail = async (
  patient,
  status,
  request,
  email,
  subject,
  text
) => {

  try {
    console.log(patient, status, request, email, subject, text);
  
    await Mail.sendMail(email, subject, undefined, text);
    return new Model.PatientMail({
      patient,
      status,
      request,
      email,
      subject,
      text,
    }).save();
  } catch (error) {
    console.log("addPatientMail service error", error);
    throw new Error(error.message);
  }
};

const updatePatientMail = async (patientMailId, patientMail) => {
  try {
    let isExistPatientMail = await Model.PatientMail.findById(patientMailId);

    if (!isExistPatientMail) {
      throw new Error(
        JSON.stringify({
          en: "PatientMail is not found.",
          tr: "PatientMail bulunamadı.",
        })
      );
    }

    return Model.PatientMail.findOneAndUpdate(
      { _id: isExistPatientMail._id },
      { ...patientMail },
      { new: true }
    );
  } catch (error) {
    console.log("updatePatientMail service error", error);
    throw new Error(error.message);
  }
};

const deletePatientMail = async (patientMailId) => {
  try {
    return Model.PatientMail.deleteOne({ _id: patientMailId });
  } catch (error) {
    console.log("deletePatientMail service error", error);
    throw new Error(error.message);
  }
};

export default {
  addPatientMail,
  updatePatientMail,
  deletePatientMail,
  getPatientMails,
  getPatientMail,
};
