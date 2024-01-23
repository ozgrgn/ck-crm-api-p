import Model from "./model.js";

const getWpTexts = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const wpTexts = await Model.WpText.find(query, {}, queryOptions).sort({
    order: 1,
  });

  const count = await Model.WpText.countDocuments(query);

  return { wpTexts, count };
};

const getWpText = async (query) => {
  return Model.WpText.findOne(query);
};

const addWpText = async (name, wpMessage) => {
  try {
    return new Model.WpText({
      name,
      wpMessage,
    }).save();
  } catch (error) {
    console.log("addWpText service error", error);
    throw new Error(error.message);
  }
};

const updateWpText = async (wpTextId, wpText) => {
  try {
    let isExistWpText = await Model.WpText.findById(wpTextId);

    if (!isExistWpText) {
      throw new Error(
        JSON.stringify({
          en: "WpText is not found.",
          tr: "WpText bulunamadı.",
        })
      );
    }

    return Model.WpText.findOneAndUpdate(
      { _id: isExistWpText._id },
      { ...wpText },
      { new: true }
    );
  } catch (error) {
    console.log("updateWpText service error", error);
    throw new Error(error.message);
  }
};

const deleteWpText = async (wpTextId) => {
  try {
    return Model.WpText.deleteOne({ _id: wpTextId });
  } catch (error) {
    console.log("deleteWpText service error", error);
    throw new Error(error.message);
  }
};

const getWpTextViaPerma = async (query) => {
  return Model.WpText.findOne(query);
};

export default {
  addWpText,
  updateWpText,
  deleteWpText,
  getWpTexts,
  getWpText,
  getWpTextViaPerma,
};
