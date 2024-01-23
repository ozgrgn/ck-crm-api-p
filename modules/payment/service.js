import Model from "./model.js";

const getPayments = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const payments = await Model.Payment.find(
    query,
    {},
    queryOptions
  );

  const count = await Model.Payment.countDocuments(query);

  return { payments, count };
};

const getPayment = async (query) => {
  return Model.Payment.findOne(query);
};

const addPayment = async (
  patient,
  request,
  paymentDate,
  paymentTotal,
  type,
  payment_user
) => {
  try {
    return new Model.Payment({
      patient,
      request,
      paymentDate,
      paymentTotal,
      type,
      payment_user
    }).save();
  } catch (error) {
    console.log("addPayment service error", error);
    throw new Error(error.message);
  }
};

const updatePayment = async (paymentId, payment) => {
  try {
    let isExistPayment = await Model.Payment.findById(paymentId);

    if (!isExistPayment) {
      throw new Error(
        JSON.stringify({
          en: "Payment is not found.",
          tr: "Payment bulunamadı.",
        })
      );
    }

    return Model.Payment.findOneAndUpdate(
      { _id: isExistPayment._id },
      { ...payment },
      { new: true }
    );
  } catch (error) {
    console.log("updatePayment service error", error);
    throw new Error(error.message);
  }
};

const deletePayment = async (paymentId) => {
  try {
    return Model.Payment.deleteOne({ _id: paymentId });
  } catch (error) {
    console.log("deletePayment service error", error);
    throw new Error(error.message);
  }
};

const getPaymentViaPerma = async (query) => {
  return Model.Payment.findOne(query);
};

export default {
  addPayment,
  updatePayment,
  deletePayment,
  getPayments,
  getPayment,
  getPaymentViaPerma,
};
