import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addReference = async (req, res) => {
  const {
    name,
    referenceCat

  } = req.body;

  try {
    let reference = await Service.addReference(
      name,
      referenceCat 
    );

    return res.json({
      status: true,
      reference,
    });
  } catch (error) {
    console.log(error.message, "addReference error");
    return res.json({ status: false, message: error.message });
  }
};

const updateReference = async (req, res) => {
  const { reference } = req.body;
  const { referenceId } = req.params;
  try {
    let updatedReference = await Service.updateReference(referenceId, reference);

    return res.json({
      status: true,
      updatedReference,
    });
  } catch (error) {
    console.log(error.message, "updateReference error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteReference = async (req, res) => {
  const { referenceId } = req.params;

  try {
    await Service.deleteReference(referenceId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteReference error");
    return res.json({ status: false, message: error.message });
  }
};

const getReferences = async (req, res) => {
  const { limit, skip } = req.query;

  try {

    let references = await Service.getReferences( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...references });
  } catch (error) {
    console.log(error.message, "getReferences error");
    return res.json({ status: false, message: error.message });
  }
};

const getReference = async (req, res) => {
  try {
    const ReferenceQuery = _.omitBy(
      {
        _id: req.params.referenceId,
      },
      (a) => a === undefined
    );

    let reference = await Service.getReference(ReferenceQuery);
    return res.json({ status: true, reference });
  } catch (error) {
    console.log(error.message, "getReference error");
    return res.json({ status: false, message: error.message });
  }
};

const getReferenceViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let reference = await Service.getReferenceViaPerma(EventQuery);
    return res.json({ status: true, reference });
  } catch (error) {
    console.log(error.message, "getReference error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addReference,
  updateReference,
  deleteReference,
  getReferences,
  getReference,
  getReferenceViaPerma,
};
