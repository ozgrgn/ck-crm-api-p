import Model from "./model.js";

const getMailTexts = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const mailTexts = await Model.MailText.find(query, {}, queryOptions).sort({
    order: 1,
  });

  const count = await Model.MailText.countDocuments(query);

  return { mailTexts, count };
};

const getMailText = async (query) => {
  return Model.MailText.findOne(query);
};

const addMailText = async (name, subject, MailMessage) => {
  try {
    return new Model.MailText({
      name,
      subject,
      MailMessage,
    }).save();
  } catch (error) {
    console.log("addMailText service error", error);
    throw new Error(error.message);
  }
};

const updateMailText = async (mailTextId, mailText) => {
  try {
    let isExistMailText = await Model.MailText.findById(mailTextId);

    if (!isExistMailText) {
      throw new Error(
        JSON.stringify({
          en: "MailText is not found.",
          tr: "MailText bulunamadı.",
        })
      );
    }

    return Model.MailText.findOneAndUpdate(
      { _id: isExistMailText._id },
      { ...mailText },
      { new: true }
    );
  } catch (error) {
    console.log("updateMailText service error", error);
    throw new Error(error.message);
  }
};

const deleteMailText = async (mailTextId) => {
  try {
    return Model.MailText.deleteOne({ _id: mailTextId });
  } catch (error) {
    console.log("deleteMailText service error", error);
    throw new Error(error.message);
  }
};

const getMailTextViaPerma = async (query) => {
  return Model.MailText.findOne(query);
};

export default {
  addMailText,
  updateMailText,
  deleteMailText,
  getMailTexts,
  getMailText,
  getMailTextViaPerma,
};
