import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addPatient = async (req, res) => {
  
  const {
    fullName,
    phone,
    email,
    birthday,
    country,
    city,
    referenceCat,
    reference,
    note,
  
  } = req.body;

  try {
    let patient = await Service.addPatient(
      fullName,
      phone,
      email,
      birthday,
      country,
      city,
      referenceCat,
      reference,
      note,
    );

    return res.json({
      status: true,
      patient,
    });
  } catch (error) {
    console.log(error.message, "addPatient error");
    return res.json({ status: false, message: error.message });
  }
};

const updatePatient = async (req, res) => {
  const { patient } = req.body;
  const { patientId } = req.params;
  try {
    let updatedPatient = await Service.updatePatient(patientId, patient);

    return res.json({
      status: true,
      updatedPatient,
    });
  } catch (error) {
    console.log(error.message, "updatePatient error");
    return res.json({ status: false, message: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    await Service.deletePatient(patientId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deletePatient error");
    return res.json({ status: false, message: error.message });
  }
};

const getPatients = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const patientsQuery = _.omitBy(
      {
        lang:lang
      },
      (a) => a === undefined
    );
    let patients = await Service.getPatients(patientsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...patients });
  } catch (error) {
    console.log(error.message, "getPatients error");
    return res.json({ status: false, message: error.message });
  }
};

const getPatient = async (req, res) => {
  try {
    const PatientQuery = _.omitBy(
      {
        _id: req.params.patientId,
      },
      (a) => a === undefined
    );

    let patient = await Service.getPatient(PatientQuery);
    return res.json({ status: true, patient });
  } catch (error) {
    console.log(error.message, "getPatient error");
    return res.json({ status: false, message: error.message });
  }
};

const getPatientbyPhone = async (req, res) => {
  console.log(req.params.patient ,"req.query.patient ")
  try {
    const PatientQuery = _.omitBy(
      
  
          { phone: req.params.phone },
        
        
      
      (a) => a === undefined
    );
console.log(PatientQuery)
    let patient = await Service.getPatientbyPhone(PatientQuery);
    return res.json({ status: true, patient });
  } catch (error) {
    console.log(error.message, "getPatient error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addPatient,
  updatePatient,
  deletePatient,
  getPatients,
  getPatient,
  getPatientbyPhone
};
