import Model from "./model.js";
import moment from "moment";
import ADMIN from "../admin/service.js";
import events from "events";
import TicketModel from "../ticket/model.js";

const globalEvents = new events.EventEmitter();
const getRequests = async (orderBy,query = {}, options = {}) => {
  const { queryOptions } = options;
  await statuShifter();
  const requests = await Model.Request.find(query, {}, queryOptions)
    .populate([
      "patient",
      "treatment",
      "treatmentGroup",
      "hotel",
      {
        path: "tickets",
        model: "Ticket",
      },
      {
        path: "rep_user",
        model: "admin",
      },
      {
        path: "newForm_user",
        model: "admin",
      },
    ])
    .sort(orderBy);
console.log(orderBy,"serviceOrder")
  const count = await Model.Request.countDocuments(query);
  return { requests, count };
};


const getDashboardRequests = async (query = {}, options = {}) => {
  const { queryOptions } = options;
  const requests = await Model.Request.find(query, {}, queryOptions)

    .sort({ customNo: -1 });

  const count = await Model.Request.countDocuments(query);

  return { requests, count };
};
const getRequest = async (query) => {
  return Model.Request.findOne(query).populate([
    {
      path: "welcome_staff",
      model: "admin",
    },
    {
      path: "preCons_staff",
      model: "admin",
    },
    {
      path: "firstTransferCar",
      model: "Car",
    },
    {
      path: "hotel",
      model: "Hotel",
    },
    {
      path: "tickets",
      model: "Ticket",
    },
 
  ]);
};

const statuShifter = async () => {
  const shiftStandByRequests = await Model.Request.updateMany(
    {
      status: "DEMAND",
      be_standby_time: {
        $lt: moment().toISOString(),
      },
    },
    { $set: { status: "STANDBY", oldStatus: "DEMAND", be_standby_time: null } }
  );

  const shiftPriceToPriceStandbyRequests = await Model.Request.updateMany(
    {
      status: "PRICE",
      be_priceStandby_time: {
        $lt: moment().toISOString(),
      },
    },
    {
      $set: {
        status: "PRICESTANDBY",
        oldStatus: "PRICE",
        be_priceStandby_time: null,
      },
    }
  );
  const shiftPricewaitToPriceStandbyRequests = await Model.Request.updateMany(
    {
      status: "PAYMENTWAIT",
      be_priceStandby_time: {
        $lt: moment().toISOString(),
      },
    },
    {
      $set: {
        status: "PRICESTANDBY",
        oldStatus: "PAYMENTWAIT",
        be_priceStandby_time: null,
      },
    }
  );
};
const addRequest = async (
  isActive,
  patient,
  passiveDesc,
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
) => {
  try {
    const lastNumber = await Model.Request.findOne().sort({ customNo: -1 });
    console.log("a");
    let customNo;
    if (lastNumber && lastNumber?.customNo) {
      customNo = lastNumber?.customNo + 1;
    } else {
      customNo = 1;
    }
    if (admin) {
      newForm_user = admin.adminId;
    }
    newForm_date = moment(newForm_date).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return new Model.Request({
      isActive,
      customNo,
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
    }).save();
  } catch (error) {
    console.log("addRequest service error", error);
    throw new Error(error.message);
  }
};

const updateRequest = async (requestId, request, admin) => {
  try {
    let isExistRequest = await Model.Request.findById(requestId);

    if (!isExistRequest) {
      throw new Error(
        JSON.stringify({
          en: "Request is not found.",
          tr: "Request bulunamadı.",
        })
      );
    }
    if (
      request.status == "DEMAND" &&
      request.oldStatus == "NEWFORM" &&
      request.process == "STATUSCHANGE"
    ) {
      request.demand_date = moment();
      request.demand_user = request.admin ? request.admin : admin.adminId;
      request.rep_user = request.admin ? request.admin : admin.adminId;
      request.be_standby_time = moment().add(request.statusChangeTime, "days");
      request.be_priceStandby_time = null;
      // let event = {
      //   summary: `${request.customNo} -> STANDBY`,
      //   description: `${request.customNo} yakında STANDBY statüsüne dönecek`,
      //   startDate: request.be_standby_time,
      //   endDate: request.be_standby_time,
      // };

      // ADMIN.addAnEventToAdminCalendar(request.rep_user, event, request._id);
    }
    if (
      request.status == "DEMAND" &&
      request.oldStatus == "STANDBY" &&
      request.process == "STATUSCHANGE"
    ) {
      request.demand_date = moment();
      request.demand_user = request.admin ? request.admin : admin.adminId;
      request.rep_user = request.admin ? request.admin : admin.adminId;
      request.be_priceStandby_time = null;
      request.be_standby_time = moment()
        .add(request.statusChangeTime, "days")
        .toISOString();
      // let event = {
      //   summary: `${request.customNo} -> STANDBY`,
      //   description: `${request.customNo} yakında STANDBY statüsüne dönecek`,
      //   startDate: request.be_standby_time,
      //   endDate: request.be_standby_time,
      // };
      // await ADMIN.addAnEventToAdminCalendar(
      //   request.rep_user,
      //   event,
      //   request._id
      // );
    }
    if (
      request.process == "STATUSCHANGE" &&
      request.status == "DEMAND" &&
      request.oldStatus == "PRICESTANDBY"
    ) {
      request.demand_date = moment();

      request.demand_user = request.admin ? request.admin : admin.adminId;
      request.rep_user = request.admin ? request.admin : admin.adminId;
      request.be_standby_time = null;
      request.be_priceStandby_time = moment().add(
        request.statusChangeTime,
        "days"
      );
      // let event = {
      //   summary: `${request.customNo} -> STANDBY FİYAT`,
      //   description: `${request.customNo} yakında STANDBY FİYAT statüsüne dönecek`,
      //   startDate: request.be_priceStandby_time,
      //   endDate: request.be_priceStandby_time,
      // };
      // ADMIN.addAnEventToAdminCalendar(request.rep_user, event, request._id);
    }
    if (
      request.status == "STANDBY" &&
      request.oldStatus == "DEMAND" &&
      request.process == "STATUSCHANGE"
    ) {
      request.standby_date = moment();
      request.standby_user = admin.adminId;
      // ADMIN.deleteAnEventToAdminCalendar(request._id, request.rep_user);
    }
    if (
      request.status == "STANDBY" &&
      request.oldStatus == "CONTINUE" &&
      request.process == "STATUSCHANGE"
    ) {
      request.be_standby_time = null;
      request.be_priceStandby_time = null;
      // ADMIN.deleteAnEventToAdminCalendar(request._id, request.rep_user);
      if (
        request.meetingDate &&
        moment(request.meetingDate).isAfter(moment())
      ) {
        let event = {
          summary: `${request.customNo} -> RANDEVULU HASTA BIRAKILDI`,
          description: `${request.customNo} randevu tarihi ${moment(
            request.meetingDate
          ).format("DD-MM-YYYY HH:mm")}`,
          startDate: moment().add(1, "minutes").toISOString(),
          endDate: moment().add(1, "minutes").toISOString(),
        };
        ADMIN.addAnEventToLeaderCalendar(request.rep_user, event, request._id);
      }
    }
    if (
      request.status == "STANDBY" &&
      request.oldStatus == "CONSULTATION" &&
      request.process == "STATUSCHANGE"
    ) {
      request.be_standby_time = null;
      request.be_priceStandby_time = null;
      // ADMIN.deleteAnEventToAdminCalendar(request._id, request.rep_user);
    }
    if (
      request.status == "PRICESTANDBY" &&
      request.oldStatus == "PRICE" &&
      request.process == "STATUSCHANGE"
    ) {
      request.be_priceStandby_time = null;
      request.be_standby_time = null;
      // ADMIN.deleteAnEventToAdminCalendar(request._id, request.rep_user);
    }
    if (
      request.status == "CONTINUE" &&
      request.oldStatus == "DEMAND" &&
      request.process == "STATUSCHANGE"
    ) {
      request.continue_date = moment();
      request.continue_user = admin.adminId;
      request.be_standby_time = null;
      let event = {
        summary: `${request.customNo} -> GÖRÜŞME`,
        description: `${request.customNo} ile planlanmış görüşme var.`,
        startDate: request.meetingDate,
        endDate: request.meetingDate,
      };
      if (request.meetingChanged) {
        ADMIN.deleteAnEventToAdminCalendar(
          request._id,
          request.rep_user,
          "MEETING"
        );
      }
      ADMIN.addAnEventToAdminCalendar(
        request.rep_user,
        event,
        request._id,
        "MEETING"
      );
      request.meetingDate_user = request.rep_user;
    }
    if (
      request.status == "CONSULTATION" &&
      request.oldStatus == "DEMAND" &&
      request.process == "STATUSCHANGE"
    ) {
      request.consultation_date = moment();
      request.consultation_user = admin.adminId;
      request.be_priceStandby_time = null;
      request.be_standby_time = null;
    }
    if (
      request.status == "PRICE" &&
      request.oldStatus == "CONSULTATION" &&
      request.process == "STATUSCHANGE"
    ) {
      request.price_date = moment();
      request.price_user = admin.adminId;
      request.be_standby_time = null;
      request.be_priceStandby_time = moment().add(
        request.statusChangeTime,
        "days"
      );
      ADMIN.deleteAnEventToAdminCalendar(request._id, request.rep_user);

      // let event = {
      //   summary: `${request.customNo} -> STANDBY FİYAT`,
      //   description: `${request.customNo} yakında STANDBY FİYAT statüsüne dönecek`,
      //   startDate: request.be_priceStandby_time,
      //   endDate: request.be_priceStandby_time,
      // };
      // ADMIN.addAnEventToAdminCalendar(admin.adminId, event, request._id);
    }



    if (
      request.status == "HOTEL" &&
      request.oldStatus == "TABURCU" &&
      request.process == "STATUSCHANGE"
    ) {
      let event = {
        summary: `${request.customNo} -> OTEL ÇIKIŞ ZAMANI`,
        description: `${request.customNo} Otel Transfer Hatırlatması`,
        startDate: request.checkout_date,
        endDate: request.checkout_date,
      };
      ADMIN.addAnEventToAdminCalendar(request.checkout_transfer_staff, event, request._id);
    }







    if (
      request.status == "PAYMENTWAIT" &&
      request.oldStatus == "PRICE" &&
      request.process == "STATUSCHANGE"
    ) {
      request.paymentWait_date = moment();
      request.priceStandby_user = admin.adminId;
      request.be_standby_time = null;
      request.be_priceStandby_time = null;
    }
    if (
      request.status == "CONFIRM" &&
      request.oldStatus == "PAYMENTWAIT" &&
      request.process == "STATUSCHANGE"
    ) {
      globalEvents.emit("confetti", {});
      request.be_standby_time = null;
      request.be_priceStandby_time = null;
      request.confirm_date = moment();
      request.confirm_user = admin.adminId;
    }

    if (request.process == "DUPLICATE") {
      request.process = undefined;
      request.duplicate_user = admin.adminId;
      request.duplicate = request.duplicate ? request.duplicate : 0;
      if (request.duplicate) {
        try {
          let isExistDuplicate = await Model.Request.findOne({
            customNo: request.duplicate,
          });

          if (!isExistDuplicate) {
            throw new Error(
              JSON.stringify({
                en: "Request is not found.",
                tr: "Böyle bir kayıt bulunamadı.",
              })
            );
          }
        } catch (error) {
          console.log("isExistDuplicate  error", error);
          throw new Error(error.message);
        }
      }
    }

    return Model.Request.findOneAndUpdate(
      { _id: isExistRequest._id },
      { ...request },
      { new: true }
    );
  } catch (error) {
    console.log("updateRequest service error", error);
    throw new Error(error.message);
  }
};

const deleteRequest = async (requestId) => {
  try {
    return Model.Request.deleteOne({ _id: requestId });
  } catch (error) {
    console.log("deleteRequest service error", error);
    throw new Error(error.message);
  }
};

export default {
  addRequest,
  updateRequest,
  deleteRequest,
  getRequests,
  getDashboardRequests,
  getRequest,
  globalEvents,
};
