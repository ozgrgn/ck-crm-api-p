import Model from "./model.js";

const getBags = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const bags = await Model.Bag.find(query, {}, queryOptions).populate("treatmentGroup");

  const count = await Model.Bag.countDocuments(query);

  return { bags, count };
};

const getBag = async (query) => {
  return Model.Bag.findOne(query);
};

const addBag = async (name, treatmentGroup) => {
  try {
    return new Model.Bag({
      name,
      treatmentGroup,
    }).save();
  } catch (error) {
    console.log("addBag service error", error);
    throw new Error(error.message);
  }
};

const updateBag = async (bagId, bag) => {
  try {
    let isExistBag = await Model.Bag.findById(bagId);

    if (!isExistBag) {
      throw new Error(
        JSON.stringify({
          en: "Bag is not found.",
          tr: "Bag bulunamadı.",
        })
      );
    }

    return Model.Bag.findOneAndUpdate(
      { _id: isExistBag._id },
      { ...bag },
      { new: true }
    );
  } catch (error) {
    console.log("updateBag service error", error);
    throw new Error(error.message);
  }
};

const deleteBag = async (bagId) => {
  try {
    return Model.Bag.deleteOne({ _id: bagId });
  } catch (error) {
    console.log("deleteBag service error", error);
    throw new Error(error.message);
  }
};

const getBagViaPerma = async (query) => {
  return Model.Bag.findOne(query);
};

export default {
  addBag,
  updateBag,
  deleteBag,
  getBags,
  getBag,
  getBagViaPerma,
};
