import Service from "./service.js";
import _ from "lodash";
import mongoose from "mongoose";
import moment from "moment";

const addRequest = async (req, res) => {
  let admin = req.admin;
  const {
    isActive,
    passiveDesc,
    patient,
    lpName,
    name,
    phone,
    email,
    status,
    lp,
    message,
    newForm_date,
    newForm_user,
    duplicate,
    duplicate_user,
    formInput,
    formSource,
    treatmentGroup,
    treatment,
    customTreatment,
    notes,
    demand_date,
    be_standby_time,
    demand_user,
    rep_user,
    meetingDateConfirmDate,
    meetingDate,
    meetingDate_user,
    standby_date,
    standby_user,
    continue_date,
    continue_user,
    price_date,
    price_user,
    price,
    currency,
    prePaymentDate,
    prePaymentTotal,
    prePaymentType,
    prePaymentCurrency,
    prePayment_user,
    paymentWait_date,
    be_priceStandby_time,
    paymentWait_user,
    priceStandby_date,
    priceStandby_user,
    confirm_date,
    confirm_user,
    arrivalDate
  } = req.body;

  try {
    let request = await Service.addRequest(
      isActive,
      passiveDesc,
      patient,
      lpName,
      name,
      phone,
      email,
      status,
      lp,
      message,
      newForm_date,
      newForm_user,
      duplicate,
      duplicate_user,
      formInput,
      formSource,
      treatmentGroup,
      treatment,
      customTreatment,
      notes,
      demand_date,
      be_standby_time,
      demand_user,
      rep_user,
      meetingDateConfirmDate,
      meetingDate,
      meetingDate_user,
      standby_date,
      standby_user,
      continue_date,
      continue_user,
      price_date,
      price_user,
      price,
      currency,
      prePaymentDate,
      prePaymentTotal,
      prePaymentType,
      prePaymentCurrency,
      prePayment_user,
      paymentWait_date,
      be_priceStandby_time,
      paymentWait_user,
      priceStandby_date,
      priceStandby_user,
      confirm_date,
      confirm_user,
      admin,
      arrivalDate
    );

    return res.json({
      status: true,
      request,
    });
  } catch (error) {
    console.log(error.message, "addRequest error");
    return res.json({ status: false, message: error.message });
  }
};

const updateRequest = async (req, res) => {
  const { request } = req.body;
  const { requestId } = req.params;
  const admin = req.admin;

  try {
    let updatedRequest = await Service.updateRequest(requestId, request, admin);

    return res.json({
      status: true,
      updatedRequest,
    });
  } catch (error) {
    console.log(error.message, "updateRequest error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    await Service.deleteRequest(requestId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteRequest error");
    return res.json({ status: false, message: error.message });
  }
};

const getRequests = async (req, res) => {
  let admin = req.admin;
  const {
    orderBy,
    isActive,
    limit,
    skip,
    startDate,
    endDate,
    status,
    lp,
    formInput,
    formSource,
    rep_user,
    name,
    customNo,
    phone,
    email,
    status1,
    status2,
    status3,
    status4,
    status5,
    status6,
    status7,
  } = req.query;
  try {
    const RequestQuery = _.omitBy(
      {
        isActive: isActive,
        lp: lp ? lp : undefined,
        name: name ? { $regex: RegExp(name + ".*", "i") } : undefined,
        customNo: customNo ? customNo : undefined,
        phone: phone ? { $regex: RegExp(phone + ".*", "i") } : undefined,
        email: email ? { $regex: RegExp(email + ".*", "i") } : undefined,
        formInput: formInput ? formInput : undefined,
        formSource: formSource ? formSource : undefined,
        newForm_date:
          startDate || endDate
            ? {
                $gte: startDate
                  ? moment(startDate).add(-1, "days").endOf("day").toDate()
                  : moment().startOf("day").toDate(),
                $lte: endDate
                  ? moment(endDate).endOf("day").toDate()
                  : moment().endOf("day").toDate(),
              }
            : undefined,
        rep_user:
          rep_user && rep_user == "me"
            ? mongoose.Types.ObjectId(admin.adminId)
            : rep_user
            ? mongoose.Types.ObjectId(rep_user)
            : undefined,
        status: status
          ? status
          : status1
          ? {
              $in: [
                status1,
                status2,
                status3,
                status4,
                status5,
                status6,
                status7,
              ],
            }
          : undefined,
      },
      (a) => a === undefined
    );
    let _orderBy =
      orderBy == "confirm"
        ? { confirm_date: -1, customNo: -1 }
        : orderBy == "ticket"
        ? { arrivalDate: -1, customNo: -1 }
        : orderBy == "ticketAsc"
        ? { arrivalDate: 1, customNo: -1 }
        : orderBy == "departure"
        ? { departureDate: 1 }
        : orderBy == "newForm"
        ? { newForm_date: -1, customNo: -1 }
        : { customNo: -1 };
    let requests = await Service.getRequests(_orderBy, RequestQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...requests });
  } catch (error) {
    console.log(error.message, "getRequests error");
    return res.json({ status: false, message: error.message });
  }
};

const getDashboardRequests = async (req, res) => {
  let admin = req.admin;

  const { isActive, startDate, endDate, lp, formInput, formSource, rep_user } =
    req.query;
  try {
    const RequestQuery = _.omitBy(
      {
        isActive: isActive,
        lp: lp ? lp : undefined,
        formInput: formInput ? formInput : undefined,
        formSource: formSource ? formSource : undefined,
        newForm_date:
          startDate || endDate
            ? {
                $gte: startDate
                  ? moment(startDate).toDate()
                  : moment().startOf("day").toDate(),
                $lte: endDate
                  ? moment(endDate).endOf("day").toDate()
                  : moment().endOf("day").toDate(),
              }
            : undefined,
        rep_user: rep_user
          ? rep_user
          : admin.permissions.indexOf("leader") == -1 &&  admin.permissions.indexOf("systemAdmin") == -1 
          ? mongoose.Types.ObjectId(admin.adminId)
          : undefined,
      },
      (a) => a === undefined
    );
    console.log(RequestQuery);

    let requests = await Service.getDashboardRequests(RequestQuery, {
      queryOptions: {},
    });

    return res.json({ status: true, ...requests });
  } catch (error) {
    console.log(error.message, "getRequests error");
    return res.json({ status: false, message: error.message });
  }
};

const getRequest = async (req, res) => {
  try {
    const RequestQuery = _.omitBy(
      {
        _id: req.params.requestId,
      },
      (a) => a === undefined
    );

    let request = await Service.getRequest(RequestQuery);
    return res.json({ status: true, request });
  } catch (error) {
    console.log(error.message, "getRequest error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addRequest,
  updateRequest,
  deleteRequest,
  getRequests,
  getDashboardRequests,
  getRequest,
};
