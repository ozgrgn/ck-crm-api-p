import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addLandingPage = async (req, res) => {
  const {
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

  } = req.body;

  try {
    let landingPage = await Service.addLandingPage(
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
    );

    return res.json({
      status: true,
      landingPage,
    });
  } catch (error) {
    console.log(error.message, "addLandingPage error");
    return res.json({ status: false, message: error.message });
  }
};

const updateLandingPage = async (req, res) => {
  const { landingPage } = req.body;
  const { landingPageId } = req.params;
  try {
    let updatedLandingPage = await Service.updateLandingPage(landingPageId, landingPage);

    return res.json({
      status: true,
      updatedLandingPage,
    });
  } catch (error) {
    console.log(error.message, "updateLandingPage error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteLandingPage = async (req, res) => {
  const { landingPageId } = req.params;

  try {
    await Service.deleteLandingPage(landingPageId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteLandingPage error");
    return res.json({ status: false, message: error.message });
  }
};

const getLandingPages = async (req, res) => {
  const { limit, skip,request } = req.query;
console.log(request,"request")
  try {
    const landingPagesQuery = _.omitBy(
      {
        request: request ? request : undefined,
      },
      (a) => a === undefined
    );
    let landingPages = await Service.getLandingPages(landingPagesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...landingPages });
  } catch (error) {
    console.log(error.message, "getLandingPages error");
    return res.json({ status: false, message: error.message });
  }
};

const getLandingPage = async (req, res) => {
  try {
    const LandingPageQuery = _.omitBy(
      {
        _id: req.params.landingPageId,
      },
      (a) => a === undefined
    );

    let landingPage = await Service.getLandingPage(LandingPageQuery);
    return res.json({ status: true, landingPage });
  } catch (error) {
    console.log(error.message, "getLandingPage error");
    return res.json({ status: false, message: error.message });
  }
};

const getLandingPageViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let landingPage = await Service.getLandingPageViaPerma(EventQuery);
    return res.json({ status: true, landingPage });
  } catch (error) {
    console.log(error.message, "getLandingPage error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addLandingPage,
  updateLandingPage,
  deleteLandingPage,
  getLandingPages,
  getLandingPage,
  getLandingPageViaPerma,
};
