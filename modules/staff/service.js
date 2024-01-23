import Model from "./model.js";

const getStaffs = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const staffs = await Model.Staff.find(query, {}, queryOptions);

  const count = await Model.Staff.countDocuments(query);

  return { staffs, count };
};

const getStaff = async (query) => {
  return Model.Staff.findOne(query);
};

const addStaff = async (name, job, image, phone, email, whatsapp) => {
  try {
    return new Model.Staff({
      name,
      job,
      image,
      phone,
      email,
      whatsapp,
    }).save();
  } catch (error) {
    console.log("addStaff service error", error);
    throw new Error(error.message);
  }
};

const updateStaff = async (staffId, staff) => {
  try {
    let isExistStaff = await Model.Staff.findById(staffId);

    if (!isExistStaff) {
      throw new Error(
        JSON.stringify({
          en: "Staff is not found.",
          tr: "Staff bulunamadı.",
        })
      );
    }

    return Model.Staff.findOneAndUpdate(
      { _id: isExistStaff._id },
      { ...staff },
      { new: true }
    );
  } catch (error) {
    console.log("updateStaff service error", error);
    throw new Error(error.message);
  }
};

const deleteStaff = async (staffId) => {
  try {
    return Model.Staff.deleteOne({ _id: staffId });
  } catch (error) {
    console.log("deleteStaff service error", error);
    throw new Error(error.message);
  }
};

const getStaffViaPerma = async (query) => {
  return Model.Staff.findOne(query);
};

export default {
  addStaff,
  updateStaff,
  deleteStaff,
  getStaffs,
  getStaff,
  getStaffViaPerma,
};
