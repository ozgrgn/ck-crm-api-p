import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addPayment = async (req, res) => {
 const admin= req.admin
  const {
    patient,
    request,
    paymentDate,
    paymentTotal,
    type
    
    

  } = req.body;
  console.log(paymentTotal)
  try {
    let payment = await Service.addPayment(
      patient,
      request,
      paymentDate,
      paymentTotal,
      type,
      admin.adminId
    );

    return res.json({
      status: true,
      payment,
    });
  } catch (error) {
    console.log(error.message, "addPayment error");
    return res.json({ status: false, message: error.message });
  }
};

const updatePayment = async (req, res) => {
  const { payment } = req.body;
  const { paymentId } = req.params;
  try {
    let updatedPayment = await Service.updatePayment(paymentId, payment);

    return res.json({
      status: true,
      updatedPayment,
    });
  } catch (error) {
    console.log(error.message, "updatePayment error");
    return res.json({ status: false, message: error.message });
  }
};

const deletePayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    await Service.deletePayment(paymentId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deletePayment error");
    return res.json({ status: false, message: error.message });
  }
};

const getPayments = async (req, res) => {
  const { limit, skip } = req.query;

  try {

    let payments = await Service.getPayments( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...payments });
  } catch (error) {
    console.log(error.message, "getPayments error");
    return res.json({ status: false, message: error.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const PaymentQuery = _.omitBy(
      {
        _id: req.params.paymentId,
      },
      (a) => a === undefined
    );

    let payment = await Service.getPayment(PaymentQuery);
    return res.json({ status: true, payment });
  } catch (error) {
    console.log(error.message, "getPayment error");
    return res.json({ status: false, message: error.message });
  }
};

const getPaymentViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let payment = await Service.getPaymentViaPerma(EventQuery);
    return res.json({ status: true, payment });
  } catch (error) {
    console.log(error.message, "getPayment error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addPayment,
  updatePayment,
  deletePayment,
  getPayments,
  getPayment,
  getPaymentViaPerma,
};
