import _ from "lodash";
import PERMISSONS from "./permissions.js";
import Service from "./service.js";
const getPermissions = (req, res) => {
  return res.json({ status: true, permissions: PERMISSONS });
};

const verifyToken = async (req, res) => {
  return res.json({ status: true, ...req.admin });
};

const getAdmins = async (req, res) => {
  const { limit, skip, startDate, endDate } = req.query;

  try {
    const adminsQuery = _.omitBy({}, (a) => a === undefined);
    let admins = await Service.getAdmins(adminsQuery, {
      queryOptions: { limit, skip },
    });
    console.log("numero 1");
    return res.json({ status: true, ...admins });
  } catch (error) {
    console.log("numero 2");

    return res.json({ status: false, message: error.message });
  }
};

async function createAdmin(req, res) {
  const { clientIp } = req;
  const { adminId } = req.admin;
  const {
    fullName,
    email,
    phone,
    whatsapp,
    super: isSuper,
    permissionGroup,
    password,
    job,
    image
  } = req.body;

  try {
    let admin = await Service.createAdmin(
      fullName,
      email,
      phone,
      whatsapp,
      isSuper,
      permissionGroup,
      password,
      job,
      image
    );
    return res.json({
      status: true,
      admin,
      message: JSON.stringify({
        en: "The process successful.",
        tr: "İşlem başarı ile tamamlandı.",
      }),
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const { clientIp } = req;

  try {
    let login = await Service.login(email, password);
    return res.json({
      status: true,
      ...login.response,
      message: JSON.stringify({
        en: "Login successful.",
        tr: "Giriş başarılı.",
      }),
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const renewPassword = async (req, res) => {
  const { adminId } = req.params;
  const { newPassword } = req.body;

  try {
    await Service.renewPassword(adminId, newPassword);

    return res.json({
      status: true,
      message: JSON.stringify({
        en: "Admin password settled successfuly.",
        tr: "Admin parolası güncellendi.",
      }),
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const updateAdminStatusById = async (req, res) => {
  const { adminId, isActive } = req.params;

  try {
    let updatedAdmin = await Service.updateAdminStatusById(adminId, isActive);
    return res.json({
      status: true,
      updatedAdmin,
      message: JSON.stringify({
        en: "Update was successfull.",
        tr: "Güncelleme işlemi başarılı",
      }),
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const setAdminPermissionGroup = async (req, res) => {
  const { adminId } = req.params;
  const { clientIp } = req;
  const { adminId: superAdminId } = req.admin;
  const { permissionGroup } = req.body;

  try {
    let admin = await Service.setAdminPermissionGroupByAdminId(
      adminId,
      permissionGroup
    );

    return res.json({
      status: true,
      admin,
      message: JSON.stringify({
        en: "Admin permission group was changed.",
        tr: "Admin yetki grubu değiştirildi.",
      }),
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const getAdmin = async (req, res) => {
  try {
    const AdminQuery = _.omitBy(
      {
        _id: req.params.adminId,
      },
      (a) => a === undefined
    );

    let admin = await Service.getAdmin(AdminQuery);
    return res.json({ status: true, admin });
  } catch (error) {
    console.log(error.message, "getAdmin error");
    return res.json({ status: false, message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  const { admin } = req.body;
  const { adminId } = req.params;
  try {
    let updatedAdmin = await Service.updateAdmin(adminId, admin);

    return res.json({
      status: true,
      updatedAdmin,
    });
  } catch (error) {
    console.log(error.message, "updateAdmin error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    await Service.deleteAdmin(adminId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteAdmin error");
    return res.json({ status: false, message: error.message });
  }
};
const allAdminPermissionsResponse = async (req, res) => {
  const admin = req.admin;

  return res.json({
    status: true,
    super: admin?.super,
    permissions: admin?.permissions,
  });
};

const authorizeForGoogle = async (req, res) => {
  const { adminId } = req.admin;

  try {
    const auth = await Service.authorizeForGoogle(adminId);
    return res.json({ status: true, ...auth });
  } catch (error) {
    return res.json({ status: false, message: JSON.stringify(error) });
  }
};

const verifyGoogleAuth = async (req, res) => {
  const { adminId } = req.admin;
  const { code } = req.body;

  try {
    const auth = await Service.verifyGoogleAuth(adminId, code);
    return res.json({ status: true, ...auth });
  } catch (error) {
    return res.json({ status: false, message: JSON.stringify(error) });
  }
};

const checkGoogleAuthorize = async (req, res) => {
  const { adminId } = req.admin;

  try {
    const auth = await Service.checkGoogleAuthorize(adminId);
    return res.json({ status: true, auth });
  } catch (error) {
    return res.json({ status: false, message: JSON.stringify(error) });
  }
};

const adminCalendarEvents = async (req, res) => {
  const { adminId } = req.admin;

  try {
    const events = await Service.adminCalendarEvents(adminId);
    return res.json({ status: true, events });
  } catch (error) {
    return res.json({ status: false, message: JSON.stringify(error) });
  }
};

const addAnEventToAdminCalendar = async (req, res) => {
  let { adminId } = req.admin;
  console.log(adminId,"admmmmm")
  const { summary, description, startDate,admin,calendarTopic,requestId } = req.body;
  console.log(admin,"admininin")
  let newEvent = {};

  if(admin) {
    adminId=admin
  }
  newEvent.summary = summary;
  newEvent.description = description;
  newEvent.startDate = startDate;
  try {
    const addedEvent = await Service.addAnEventToAdminCalendar(
      adminId,
      newEvent,
      requestId,
      calendarTopic
    );
    return res.json({ status: true, addedEvent });
  } catch (error) {
    return res.json({ status: false, message: JSON.stringify(error) });
  }
};

const deleteAnEventToAdminCalendar = async (req, res) => {
  const { adminId } = req.admin;
  const { event } = req.event;
  try {
    const addedEvent = await Service.deleteAnEventToAdminCalendar(
      adminId,
      event
    );
    return res.json({ status: true, addedEvent });
  } catch (error) {
    return res.json({ status: false, message: JSON.stringify(error) });
  }
};

export default {
  getPermissions,
  getAdmins,
  getAdmin,
  verifyToken,
  login,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  renewPassword,
  updateAdminStatusById,
  setAdminPermissionGroup,
  allAdminPermissionsResponse,
  authorizeForGoogle,
  checkGoogleAuthorize,
  verifyGoogleAuth,
  adminCalendarEvents,
  addAnEventToAdminCalendar,
  deleteAnEventToAdminCalendar,
};
