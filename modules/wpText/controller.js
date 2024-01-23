import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addWpText = async (req, res) => {
  const {
    name,
    wpMessage

  } = req.body;

  try {
    let wpText = await Service.addWpText(
      name,
      wpMessage
    );

    return res.json({
      status: true,
      wpText,
    });
  } catch (error) {
    console.log(error.message, "addWpText error");
    return res.json({ status: false, message: error.message });
  }
};

const updateWpText = async (req, res) => {
  const { wpText } = req.body;
  const { wpTextId } = req.params;
  try {
    let updatedWpText = await Service.updateWpText(wpTextId, wpText);

    return res.json({
      status: true,
      updatedWpText,
    });
  } catch (error) {
    console.log(error.message, "updateWpText error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteWpText = async (req, res) => {
  const { wpTextId } = req.params;

  try {
    await Service.deleteWpText(wpTextId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteWpText error");
    return res.json({ status: false, message: error.message });
  }
};

const getWpTexts = async (req, res) => {
  const { limit, skip } = req.query;

  try {

    let wpTexts = await Service.getWpTexts( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...wpTexts });
  } catch (error) {
    console.log(error.message, "getWpTexts error");
    return res.json({ status: false, message: error.message });
  }
};

const getWpText = async (req, res) => {
  try {
    const WpTextQuery = _.omitBy(
      {
        _id: req.params.wpTextId,
      },
      (a) => a === undefined
    );

    let wpText = await Service.getWpText(WpTextQuery);
    return res.json({ status: true, wpText });
  } catch (error) {
    console.log(error.message, "getWpText error");
    return res.json({ status: false, message: error.message });
  }
};

const getWpTextViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let wpText = await Service.getWpTextViaPerma(EventQuery);
    return res.json({ status: true, wpText });
  } catch (error) {
    console.log(error.message, "getWpText error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addWpText,
  updateWpText,
  deleteWpText,
  getWpTexts,
  getWpText,
  getWpTextViaPerma,
};
