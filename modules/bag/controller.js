import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addBag = async (req, res) => {
  const { name,treatmentGroup } = req.body;

  try {
    let bag = await Service.addBag(name,treatmentGroup);

    return res.json({
      status: true,
      bag,
    });
  } catch (error) {
    console.log(error.message, "addBag error");
    return res.json({ status: false, message: error.message });
  }
};

const updateBag = async (req, res) => {
  const { bag } = req.body;
  const { bagId } = req.params;
  try {
    let updatedBag = await Service.updateBag(bagId, bag);

    return res.json({
      status: true,
      updatedBag,
    });
  } catch (error) {
    console.log(error.message, "updateBag error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteBag = async (req, res) => {
  const { bagId } = req.params;

  try {
    await Service.deleteBag(bagId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteBag error");
    return res.json({ status: false, message: error.message });
  }
};

const getBags = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    let bags = await Service.getBags({
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...bags });
  } catch (error) {
    console.log(error.message, "getBags error");
    return res.json({ status: false, message: error.message });
  }
};

const getBag = async (req, res) => {
  try {
    const BagQuery = _.omitBy(
      {
        _id: req.params.bagId,
      },
      (a) => a === undefined
    );

    let bag = await Service.getBag(BagQuery);
    return res.json({ status: true, bag });
  } catch (error) {
    console.log(error.message, "getBag error");
    return res.json({ status: false, message: error.message });
  }
};

const getBagViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let bag = await Service.getBagViaPerma(EventQuery);
    return res.json({ status: true, bag });
  } catch (error) {
    console.log(error.message, "getBag error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addBag,
  updateBag,
  deleteBag,
  getBags,
  getBag,
  getBagViaPerma,
};
