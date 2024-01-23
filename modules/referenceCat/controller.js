import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addReferenceCat = async (req, res) => {
  const {
    name

  } = req.body;

  try {
    let referenceCat = await Service.addReferenceCat(
      name
    );

    return res.json({
      status: true,
      referenceCat,
    });
  } catch (error) {
    console.log(error.message, "addReferenceCat error");
    return res.json({ status: false, message: error.message });
  }
};

const updateReferenceCat = async (req, res) => {
  const { referenceCat } = req.body;
  const { referenceCatId } = req.params;
  try {
    let updatedReferenceCat = await Service.updateReferenceCat(referenceCatId, referenceCat);

    return res.json({
      status: true,
      updatedReferenceCat,
    });
  } catch (error) {
    console.log(error.message, "updateReferenceCat error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteReferenceCat = async (req, res) => {
  const { referenceCatId } = req.params;

  try {
    await Service.deleteReferenceCat(referenceCatId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteReferenceCat error");
    return res.json({ status: false, message: error.message });
  }
};

const getReferenceCats = async (req, res) => {
  const { limit, skip } = req.query;

  try {

    let referenceCats = await Service.getReferenceCats( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...referenceCats });
  } catch (error) {
    console.log(error.message, "getReferenceCats error");
    return res.json({ status: false, message: error.message });
  }
};

const getReferenceCat = async (req, res) => {
  try {
    const ReferenceCatQuery = _.omitBy(
      {
        _id: req.params.referenceCatId,
      },
      (a) => a === undefined
    );

    let referenceCat = await Service.getReferenceCat(ReferenceCatQuery);
    return res.json({ status: true, referenceCat });
  } catch (error) {
    console.log(error.message, "getReferenceCat error");
    return res.json({ status: false, message: error.message });
  }
};

const getReferenceCatViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let referenceCat = await Service.getReferenceCatViaPerma(EventQuery);
    return res.json({ status: true, referenceCat });
  } catch (error) {
    console.log(error.message, "getReferenceCat error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addReferenceCat,
  updateReferenceCat,
  deleteReferenceCat,
  getReferenceCats,
  getReferenceCat,
  getReferenceCatViaPerma,
};
