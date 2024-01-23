import Model from "./model.js";

const getLandingPages = async (query = {}, options = {}) => {
  const { queryOptions } = options;
console.log(queryOptions)
  const landingPages = await Model.LandingPage.find(
    query,
    {},
    queryOptions
  );

  const count = await Model.LandingPage.countDocuments(query);

  return { landingPages, count };
};

const getLandingPage = async (query) => {
  return Model.LandingPage.findOne(query);
};

const addLandingPage = async (
  patient,
  request,
  arrivalPNR,
  arrivalFlightNo,
  arrivalAirport,
  arrivalDate,
  arrivalPatient,
  departurePNR,
  departureFlightNo,
  departureAirport,
  departureDate,
  departurePatient
) => {
  try {
    return new Model.LandingPage({
      patient,
      request,
      arrivalPNR,
      arrivalFlightNo,
      arrivalAirport,
      arrivalDate,
      arrivalPatient,
      departurePNR,
      departureFlightNo,
      departureAirport,
      departureDate,
      departurePatient
    }).save();
  } catch (error) {
    console.log("addLandingPage service error", error);
    throw new Error(error.message);
  }
};

const updateLandingPage = async (landingPageId, landingPage) => {
  try {
    let isExistLandingPage = await Model.LandingPage.findById(landingPageId);

    if (!isExistLandingPage) {
      throw new Error(
        JSON.stringify({
          en: "LandingPage is not found.",
          tr: "LandingPage bulunamadı.",
        })
      );
    }

    return Model.LandingPage.findOneAndUpdate(
      { _id: isExistLandingPage._id },
      { ...landingPage },
      { new: true }
    );
  } catch (error) {
    console.log("updateLandingPage service error", error);
    throw new Error(error.message);
  }
};

const deleteLandingPage = async (landingPageId) => {
  try {
    return Model.LandingPage.deleteOne({ _id: landingPageId });
  } catch (error) {
    console.log("deleteLandingPage service error", error);
    throw new Error(error.message);
  }
};

const getLandingPageViaPerma = async (query) => {
  return Model.LandingPage.findOne(query);
};

export default {
  addLandingPage,
  updateLandingPage,
  deleteLandingPage,
  getLandingPages,
  getLandingPage,
  getLandingPageViaPerma,
};
