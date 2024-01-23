import Model from "./model.js";

const getReferenceCats = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const referenceCats = await Model.ReferenceCat.find(query, {}, queryOptions).sort({
    order: 1,
  });

  const count = await Model.ReferenceCat.countDocuments(query);

  return { referenceCats, count };
};

const getReferenceCat = async (query) => {
  return Model.ReferenceCat.findOne(query);
};

const addReferenceCat = async (
  name
) => {
  try {


    return new Model.ReferenceCat({
      name
    }).save();
  } catch (error) {
    console.log("addReferenceCat service error", error);
    throw new Error(error.message);
  }
};

const updateReferenceCat = async (referenceCatId, referenceCat) => {
  try {
    let isExistReferenceCat = await Model.ReferenceCat.findById(referenceCatId);

    if (!isExistReferenceCat) {
      throw new Error(
        JSON.stringify({
          en: "ReferenceCat is not found.",
          tr: "ReferenceCat bulunamadı.",
        })
      );
    }

    return Model.ReferenceCat.findOneAndUpdate(
      { _id: isExistReferenceCat._id },
      { ...referenceCat },
      { new: true }
    );
  } catch (error) {
    console.log("updateReferenceCat service error", error);
    throw new Error(error.message);
  }
};

const deleteReferenceCat = async (referenceCatId) => {
  try {
    return Model.ReferenceCat.deleteOne({ _id: referenceCatId });
  } catch (error) {
    console.log("deleteReferenceCat service error", error);
    throw new Error(error.message);
  }
};

const getReferenceCatViaPerma = async (query) => {
  return Model.ReferenceCat.findOne(query);
};

export default {
  addReferenceCat,
  updateReferenceCat,
  deleteReferenceCat,
  getReferenceCats,
  getReferenceCat,
  getReferenceCatViaPerma,
};
