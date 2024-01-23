import Model from "./model.js";

const getGroups = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const groups = await Model.Group.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Group.countDocuments(query);

  return { groups, count };
};

const getGroup = async (query) => {
  return Model.Group.findOne(query);
};

const addGroup = async (
  lang,
  title,
  description,
  description2,
  department,
  svg,
  perma,
  text,
  image,
  order
) => {
  try {
    return new Model.Group({
      lang,
      title,
      description,
      description2,
      department,
      svg,
      perma,
      text,
      image,
      order
    }).save();
  } catch (error) {
    console.log("addGroup service error", error);
    throw new Error(error.message);
  }
};

const updateGroup = async (groupId, group) => {
  try {
    let isExistGroup = await Model.Group.findById(groupId);

    if (!isExistGroup) {
      throw new Error(
        JSON.stringify({
          en: "Group is not found.",
          tr: "Group bulunamadı.",
        })
      );
    }

    return Model.Group.findOneAndUpdate(
      { _id: isExistGroup._id },
      { ...group },
      { new: true }
    );
  } catch (error) {
    console.log("updateGroup service error", error);
    throw new Error(error.message);
  }
};

const deleteGroup = async (groupId) => {
  try {
    return Model.Group.deleteOne({ _id: groupId });
  } catch (error) {
    console.log("deleteGroup service error", error);
    throw new Error(error.message);
  }
};

const getGroupViaPerma = async (query) => {
  return Model.Group.findOne(query);
};
export default {
  addGroup,
  updateGroup,
  deleteGroup,
  getGroups,
  getGroup,
  getGroupViaPerma
};
