import Model from "./model.js";

const getReferences = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const references = await Model.Reference.find(
    query,
    {},
    queryOptions
  ).populate("referenceCat");

  const count = await Model.Reference.countDocuments(query);

  return { references, count };
};

const getReference = async (query) => {
  return Model.Reference.findOne(query);
};

const addReference = async (
  name,
  referenceCat
) => {
  try {
    return new Model.Reference({
      name,
      referenceCat
    }).save();
  } catch (error) {
    console.log("addReference service error", error);
    throw new Error(error.message);
  }
};

const updateReference = async (referenceId, reference) => {
  try {
    let isExistReference = await Model.Reference.findById(referenceId);

    if (!isExistReference) {
      throw new Error(
        JSON.stringify({
          en: "Reference is not found.",
          tr: "Reference bulunamadı.",
        })
      );
    }

    return Model.Reference.findOneAndUpdate(
      { _id: isExistReference._id },
      { ...reference },
      { new: true }
    );
  } catch (error) {
    console.log("updateReference service error", error);
    throw new Error(error.message);
  }
};

const deleteReference = async (referenceId) => {
  try {
    return Model.Reference.deleteOne({ _id: referenceId });
  } catch (error) {
    console.log("deleteReference service error", error);
    throw new Error(error.message);
  }
};

const getReferenceViaPerma = async (query) => {
  return Model.Reference.findOne(query);
};

export default {
  addReference,
  updateReference,
  deleteReference,
  getReferences,
  getReference,
  getReferenceViaPerma,
};
