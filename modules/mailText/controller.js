import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addMailText = async (req, res) => {
  const {
    name,
    subject,
    MailMessage

  } = req.body;

  try {
    let mailText = await Service.addMailText(
      name,
      subject,
      MailMessage
    );

    return res.json({
      status: true,
      mailText,
    });
  } catch (error) {
    console.log(error.message, "addMailText error");
    return res.json({ status: false, message: error.message });
  }
};

const updateMailText = async (req, res) => {
  const { mailText } = req.body;
  const { mailTextId } = req.params;
  try {
    let updatedMailText = await Service.updateMailText(mailTextId, mailText);

    return res.json({
      status: true,
      updatedMailText,
    });
  } catch (error) {
    console.log(error.message, "updateMailText error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteMailText = async (req, res) => {
  const { mailTextId } = req.params;

  try {
    await Service.deleteMailText(mailTextId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteMailText error");
    return res.json({ status: false, message: error.message });
  }
};

const getMailTexts = async (req, res) => {
  const { limit, skip } = req.query;

  try {

    let mailTexts = await Service.getMailTexts( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...mailTexts });
  } catch (error) {
    console.log(error.message, "getMailTexts error");
    return res.json({ status: false, message: error.message });
  }
};

const getMailText = async (req, res) => {
  try {
    const MailTextQuery = _.omitBy(
      {
        _id: req.params.mailTextId,
      },
      (a) => a === undefined
    );

    let mailText = await Service.getMailText(MailTextQuery);
    return res.json({ status: true, mailText });
  } catch (error) {
    console.log(error.message, "getMailText error");
    return res.json({ status: false, message: error.message });
  }
};

const getMailTextViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let mailText = await Service.getMailTextViaPerma(EventQuery);
    return res.json({ status: true, mailText });
  } catch (error) {
    console.log(error.message, "getMailText error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addMailText,
  updateMailText,
  deleteMailText,
  getMailTexts,
  getMailText,
  getMailTextViaPerma,
};
