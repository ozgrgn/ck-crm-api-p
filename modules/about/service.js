import Model from "./model.js";

const getAbouts = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const abouts = await Model.About.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.About.countDocuments(query);

  return { abouts, count };
};

const getAbout = async (query) => {
  return Model.About.findOne(query);
};

const addAbout = async (
  lang,
  about_spot,
  about_title,
  about_left,
  about_right,
  images,
  logos
) => {
  try {
    return new Model.About({
      lang,
      about_spot,
      about_title,
      about_left,
      about_right,
      images,
      logos,
    }).save();
  } catch (error) {
    console.log("addAbout service error", error);
    throw new Error(error.message);
  }
};

const updateAbout = async (aboutId, about) => {
  try {
    let isExistAbout = await Model.About.findById(aboutId);

    if (!isExistAbout) {
      throw new Error(
        JSON.stringify({
          en: "About is not found.",
          tr: "About bulunamadı.",
        })
      );
    }

    return Model.About.findOneAndUpdate(
      { _id: isExistAbout._id },
      { ...about },
      { new: true }
    );
  } catch (error) {
    console.log("updateAbout service error", error);
    throw new Error(error.message);
  }
};

const deleteAbout = async (aboutId) => {
  try {
    return Model.About.deleteOne({ _id: aboutId });
  } catch (error) {
    console.log("deleteAbout service error", error);
    throw new Error(error.message);
  }
};

export default {
  addAbout,
  updateAbout,
  deleteAbout,
  getAbouts,
  getAbout,
};
