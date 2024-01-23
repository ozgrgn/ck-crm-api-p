import _ from "lodash";
import moment from "moment";
import Service from "./service.js";
const login = async (req, res) => {
  const { email, phone, password } = req.body;
  if (!email && !phone) {
    return res.json({
      status: false,
      message: JSON.stringify({
        en: "email or phone should send with request.",
        tr: "email veya phone gönderilmeli.",
      }),
    });
  }

  try {
    let login = await Service.login(email, phone, password);

    return res.json({
      status: true,
      ...login,
    });
  } catch (error) {
    console.log(error.message, "login error");
    return res.json({ status: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.user;
  const { user } = req.body;

  try {
    let updatedUser = await Service.updateUser(userId, user);

    return res.json({
      status: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error.message, "update user error");
    return res.json({ status: false, message: error.message });
  }
};

async function deleteUser(req, res) {
  const { userId } = req.params;

  try {
    await Service.deleteUser(userId);

    return res.json({
      status: true,
      message: JSON.stringify({
        en: "The user has been deleted.",
        tr: "Kullanıcı silindi.",
      }),
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
}

const signup = async (req, res) => {
  const { email, phone, fullName, password, consent } = req.body;
  try {
    let signup = await Service.signup(
      email,
      phone,
      fullName,
      password,
      consent
    );

    return res.json({
      status: true,
      ...signup,
    });
  } catch (error) {
    console.log(error.message, "signup error");
    return res.json({ status: false, message: error.message });
  }
};

const verifySignup = async (req, res) => {
  const { userId, authCode } = req.body;

  try {
    let verifiedSignup = await Service.verifySignup(userId, authCode);

    return res.json({
      status: true,
      ...verifiedSignup,
    });
  } catch (error) {
    console.log(error.message, "verifySignup error");
    return res.json({ status: false, message: error.message });
  }
};

const refreshVerification = async (req, res) => {
  const { userId, type } = req.body;

  try {
    let refreshedVerification = await Service.refreshVerification(userId, type);

    return res.json({
      status: true,
      ...refreshedVerification,
    });
  } catch (error) {
    console.log(error.message, "refreshVerification error");
    return res.json({ status: false, message: error.message });
  }
};

const checkUser = async (req, res) => {
  const { email, phone } = req.query;

  if (!email && !phone) {
    return res.json({
      status: false,
      message: JSON.stringify({
        en: "email or phone should send with request.",
        tr: "email veya phone gönderilmeli.",
      }),
    });
  }

  try {
    let status = await Service.checkUser(email, phone);

    return res.json({ ...status });
  } catch (error) {
    console.log(error.message, "checkUser error");
    return res.json({ status: false, message: error.message });
  }
};
const getUsers = async (req, res) => {
  const { limit, skip, startDate, endDate } = req.query;

  try {
    const usersQuery = _.omitBy(
      {
        created_at:
          startDate || endDate
            ? {
                $gte: startDate
                  ? new Date(startDate)
                  : moment().startOf("day").toDate(),
                $lte: endDate
                  ? new Date(endDate)
                  : moment().endOf("day").toDate(),
              }
            : undefined,
      },
      (a) => a === undefined
    );
    let users = await Service.getUsers(usersQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...users });
  } catch (error) {
    console.log(error.message, "getUsers error");
    return res.json({ status: false, message: error.message });
  }
};

const verifyToken = async (req, res) => {
  const { email } = req.user;
  return res.json({ status: true, email });
};

async function changePassword(req, res) {
  const { userId } = req.user;
  let { oldPassword, newPassword } = req.body;

  try {
    await Service.changePassword(userId, oldPassword, newPassword);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "changePassword error");
    return res.json({
      status: false,
      message: error.message,
    });
  }
}

const resetPasswordRequestWithPhone = async (req, res) => {
  const { phone } = req.body;
  try {
    let serviceResponse = await Service.resetPasswordRequestWithPhone(phone);

    return res.json({
      status: true,
      ...serviceResponse,
    });
  } catch (error) {
    console.log(error.message, "resetPasswordRequestWithPhone error");
    return res.json({ status: false, message: error.message });
  }
};

const resetPasswordRequestWithEmail = async (req, res) => {
  const { email } = req.body;
  try {
    let serviceResponse = await Service.resetPasswordRequestWithEmail(email);

    return res.json({
      status: true,
      ...serviceResponse,
    });
  } catch (error) {
    console.log(error.message, "resetPasswordRequestWithEmail error");
    return res.json({ status: false, message: error.message });
  }
};

const resetPasswordVerify = async (req, res) => {
  const { userId, authCode, newPassword } = req.body;

  try {
    let serviceResponse = await Service.resetPasswordVerify(
      userId,
      authCode,
      newPassword
    );

    return res.json({
      status: true,
      ...serviceResponse,
    });
  } catch (error) {
    console.log(error.message, "resetPasswordVerify error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  login,
  signup,
  verifySignup,
  refreshVerification,
  updateUser,
  deleteUser,
  getUsers,
  verifyToken,
  //password
  changePassword,
  resetPasswordRequestWithPhone,
  resetPasswordRequestWithEmail,
  resetPasswordVerify,

  checkUser,
};
