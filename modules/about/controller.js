import Service from "./service.js";
import _ from "lodash";
const addAbout = async (req, res) => {
  const {
    lang,
    about_spot,
    about_title,
    about_left,
    about_right,
    images,
    logos,
  } = req.body;

  try {
    let about = await Service.addAbout(
      lang,
      about_spot,
      about_title,
      about_left,
      about_right,
      images,
      logos
    );

    return res.json({
      status: true,
      about,
    });
  } catch (error) {
    console.log(error.message, "addAbout error");
    return res.json({ status: false, message: error.message });
  }
};

const updateAbout = async (req, res) => {
  const { about } = req.body;
  const { aboutId } = req.params;
  console.log(about, "sdsfsfsdfsdsf");
  try {
    let updatedAbout = await Service.updateAbout(aboutId, about);

    return res.json({
      status: true,
      updatedAbout,
    });
  } catch (error) {
    console.log(error.message, "updateAbout error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteAbout = async (req, res) => {
  const { aboutId } = req.params;

  try {
    await Service.deleteAbout(aboutId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteAbout error");
    return res.json({ status: false, message: error.message });
  }
};

const getAbouts = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const aboutsQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let abouts = await Service.getAbouts(aboutsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...abouts });
  } catch (error) {
    console.log(error.message, "getAbouts error");
    return res.json({ status: false, message: error.message });
  }
};

const getAbout = async (req, res) => {
  try {
    const AboutQuery = _.omitBy(
      {
        _id: req.params.aboutId,
      },
      (a) => a === undefined
    );

    let about = await Service.getAbout(AboutQuery);
    return res.json({ status: true, about });
  } catch (error) {
    console.log(error.message, "getAbout error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addAbout,
  updateAbout,
  deleteAbout,
  getAbouts,
  getAbout,
};
