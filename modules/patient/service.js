import Model from "./model.js";
import RequestModel from "../request/model.js";

const getPatients = async (query = {}, options = {}) => {
  const { queryOptions } = options;
  const patients = await Model.Patient.find(query, {}, queryOptions).sort({
    order: 1,
  });

  const count = await Model.Patient.countDocuments(query);

  return { patients, count };
};

const getPatient = async (query) => {
  return Model.Patient.findOne(query);
};

const addPatient = async (
  fullName,
  phone,
  email,
  birthday,
  country,
  city,
  referenceCat,
  reference,
  note
) => {
  try {
    return new Model.Patient({
      fullName,
      phone,
      email,
      birthday,
      country,
      city,
      referenceCat,
      reference,
      note,
    }).save();
  } catch (error) {
    console.log("addPatient service error", error);
    throw new Error(error.message);
  }
};

const updatePatient = async (patientId, patient) => {
  try {
    let isExistPatient = await Model.Patient.findById(patientId);

    if (!isExistPatient) {
      throw new Error(
        JSON.stringify({
          en: "Patient is not found.",
          tr: "Hasta bulunamadı.",
        })
      );
    }
    const updateAllRelatedRequest = await RequestModel.Request.updateMany(
      {
        patient: patientId,
      },
      {
        $set: {
          name: patient.fullName,
          phone: patient.phone,
          email: patient.email,
        },
      }
    );
    return Model.Patient.findOneAndUpdate(
      { _id: isExistPatient._id },
      { ...patient },
      { new: true }
    );
  } catch (error) {
    console.log("updatePatient service error", error);
    throw new Error(error.message);
  }
};

const deletePatient = async (patientId) => {
  try {
    return Model.Patient.deleteOne({ _id: patientId });
  } catch (error) {
    console.log("deletePatient service error", error);
    throw new Error(error.message);
  }
};

const getPatientbyPhone = async (query) => {
  console.log(query, "query");
  return Model.Patient.findOne(query);
};

export default {
  addPatient,
  updatePatient,
  deletePatient,
  getPatients,
  getPatient,
  getPatientbyPhone,
};
