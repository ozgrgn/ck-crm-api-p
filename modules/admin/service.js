import jwt from "jsonwebtoken";
import moment from "moment";
import CONFIG from "../../config.js";
import { checkPassword, hashPassword } from "../utilities/bcrypt.js";
import Model from "./model.js";
import RequestModel from "../request/model.js";
import { PermissionGroup } from "./permissionGroup/permissionGroup.model.js";
const getPermissionGroup = async (id) => {
  const permissionGroup = await PermissionGroup.findById(id);
  if (!permissionGroup) {
    throw new Error(
      JSON.stringify({
        en: "Permission group not found !",
        tr: "Yetki grubu bulunamadı !",
      })
    );
  }

  return permissionGroup;
};

const getAdmins = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const admins = await Model.Admin.find({ query }, {}, queryOptions)
    .sort({ created_at: -1 })
    .populate("permissionGroup");

  const count = await Model.Admin.countDocuments(query);

  return { admins, count };
};

const createAdmin = async (
  fullName,
  email,
  phone,
  whatsapp,
  isSuper,
  permissionGroup,
  password,
  job,
  image
) => {
  let admin = await Model.Admin.findOne({ email });

  if (admin) {
    throw new Error(
      JSON.stringify({
        en: "Admin already saved",
        tr: "Admin zaten kayıtlı",
      })
    );
  }
  password = await hashPassword(password);

  return await new Model.Admin({
    fullName,
    email,
    phone,
    whatsapp,
    super: isSuper,
    permissionGroup,
    password,
    job,
    image,
  }).save();
};

const login = async (email, password) => {
  const admin = await Model.Admin.findOne({ email }).populate(
    "permissionGroup"
  );
  if (!admin) {
    throw new Error(
      JSON.stringify({
        en: "Admin not found!",
        tr: "Admin bulunamadı !",
      })
    );
  }
  let check = await checkPassword(admin.password, password);
  if (!check) {
    throw new Error(
      JSON.stringify({
        en: "Wrong password or email",
        tr: "Yanlış şifre veya mail",
      })
    );
  }

  const expiresIn = Math.floor(Date.now() / 1000) + CONFIG.JWT.expiresIn;
  const token = jwt.sign(
    {
      adminId: admin._id.toString(),
      fullName: admin.fullName,
      email: admin.email,
      // exp: expiresIn,
      type: "admin",
      super: admin.super,
      permissions:
        admin && admin.permissionGroup && admin.permissionGroup.permissions,
    },
    CONFIG.JWT.secret
  );

  let endDate = new Date();

  endDate.setSeconds(endDate.getSeconds() + CONFIG.JWT.expiresIn);

  return {
    admin,
    response: {
      token,
      expire_date: endDate.toISOString(),
      email: admin.email,
      adminId: admin.id,
      fullName: admin.fullName,
    },
  };
};

const setAdminPermissionGroupByAdminId = async (adminId, permissionGroupId) => {
  const admin = await Model.Admin.findById(adminId);

  if (!admin) {
    throw new Error(
      JSON.stringify({
        en: "Admin not found!",
        tr: "Admin bulunamadı !",
      })
    );
  }

  try {
    const permissionGroup = await getPermissionGroup(permissionGroupId);

    admin.permissionGroup = permissionGroup._id;
    await admin.save();
    return admin;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAdminStatusById = async (adminId, isActive) => {
  const updatedAdmin = await Model.Admin.findOneAndUpdate(
    { _id: adminId },
    { isActive },
    { returnOriginal: false }
  );

  if (!updatedAdmin) {
    throw new Error(
      JSON.stringify({
        en: "Admin is not found.",
        tr: "Admin bulunamadı.",
      })
    );
  }

  return updatedAdmin;
};

const renewPassword = async (adminId, newPassword) => {
  const admin = await Model.Admin.findOne({ _id: adminId });

  if (!admin) {
    throw new Error(
      JSON.stringify({
        en: "Admin not found!",
        tr: "Admin bulunamadı !",
      })
    );
  }

  admin.password = await hashPassword(newPassword);
  await admin.save();
  LogService.systemLog("admin_password_reset", { admin });
  return password;
};

const getAdmin = async (query) => {
  return Model.Admin.findOne(query);
};

const updateAdmin = async (adminId, admin) => {
  try {
    let isExistAdmin = await Model.Admin.findById(adminId);

    if (!isExistAdmin) {
      throw new Error(
        JSON.stringify({
          en: "Admin is not found.",
          tr: "Admin bulunamadı.",
        })
      );
    }

    if (admin.password) {
      admin.password = await hashPassword(admin.password);
    } else {
      delete admin.password;
    }

    return Model.Admin.findOneAndUpdate(
      { _id: isExistAdmin._id },
      { ...admin },
      { new: true }
    );
  } catch (error) {
    console.log("updateAdmin service error", error);
    throw new Error(error.message);
  }
};

const deleteAdmin = async (adminId) => {
  try {
    return Model.Admin.deleteOne({ _id: adminId });
  } catch (error) {
    console.log("deleteAdmin service error", error);
    throw new Error(error.message);
  }
};

import fs from "fs";
import { google } from "googleapis";
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const authorizeForGoogle = async (adminId) => {
  let admin = await Model.Admin.findById(adminId);

  if (!admin) {
    throw new Error("Admin not found");
  }

  if (admin && !admin.credentials) {
    let clientSecret = fs.readFileSync("client_secret.json");

    if (clientSecret) {
      clientSecret = JSON.parse(clientSecret).web;
    }
    const { client_secret, client_id, redirect_uris } = clientSecret;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return { authUrl };
  }
};

const checkGoogleAuthorize = async (adminId) => {
  let admin = await Model.Admin.findById(adminId);

  if (!admin) {
    throw new Error("Admin not found");
  }

  return admin?.credentials ? true : false;
};

const verifyGoogleAuth = async (adminId, code) => {
  let clientSecret = fs.readFileSync("client_secret.json");

  if (clientSecret) {
    clientSecret = JSON.parse(clientSecret).web;
  }

  const { client_secret, client_id, redirect_uris } = clientSecret;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.getToken(code, async (err, token) => {
    if (err) console.log(err?.data || err, "verifyGoogleAuth error");
    oAuth2Client.setCredentials(token);

    try {
      await Model.Admin.findByIdAndUpdate(adminId, {
        $set: {
          credentials: token,
        },
      });
    } catch (err) {
      console.error(err?.data || err, "verifyGoogleAuth error 2");
    }
  });
  return true;
};

const adminCalendarEvents = async (adminId) => {
  try {
    let admin = await Model.Admin.findById(adminId);
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (!admin?.credentials) {
      throw new Error("You do not have any token for this operation.");
    }

    let clientSecret = fs.readFileSync("client_secret.json");

    if (clientSecret) {
      clientSecret = JSON.parse(clientSecret).web;
    }

    const { client_secret, client_id, redirect_uris } = clientSecret;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    oAuth2Client.setCredentials(admin?.credentials);

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    let items = await new Promise((resolve, reject) => {
      calendar.events.list(
        {
          timeMin: "2023-01-01T10:00:00-07:00",
          auth: oAuth2Client,
          calendarId: admin.email,
        },

        function (err, event) {
          if (err) {
            console.log(
              "There was an error contacting the Calendar service: " + err
            );
            reject(err?.message || err);
          }
          event?.data?.items.map((item) => {
            if (item.start.dateTime);
          });
          let events = [];
          let a = 0;
          event?.data.items.map((item, i) => {
            events[a] = {};
            events[a].start = item?.start?.dateTime;

            events[a].end = moment(item?.start?.dateTime)
              .add(4, "hours")
              .toISOString();
            events[a].titleHTML = `${item?.summary} <br> ${
              item?.description ? item?.description : "-"
            }`;
            events[a].color = item?.summary?.includes("GÖRÜŞME")
              ? "#FF0000"
              : item?.summary?.includes("PRICESTANDBY")
              ? "#36D399"
              : item?.summary?.includes("STANDBY")
              ? "#a991f7"
              : item?.summary?.includes("RANDEVULU")
              ? "#FF0000"
              : "#65BDC2";
            events[a].eventBackgroundColor = item?.summary?.includes("GÖRÜŞME")
              ? "#fff"
              : item?.summary?.includes("PRICESTANDBY")
              ? "#36D399"
              : item?.summary?.includes("STANDBY")
              ? "#a991f7"
              : "#65BDC2";

            a++;
          });
          resolve(events);
        }
      );
    });
    return items;
  } catch (error) {
    console.log(error, "adminCalendarEvents error");
  }
};

const deleteAnEventToAdminCalendar = async (
  requestId,
  adminId,
  calendarTopic
) => {
  if (requestId) {
    try {
      let request = await RequestModel.Request.findById(requestId);
      let admin = await Model.Admin.findById(adminId);
      if (!admin) {
        throw new Error("Admin not found");
      }
      if (!admin?.credentials) {
        throw new Error("You do not have any token for this operation.");
      }

      let clientSecret = fs.readFileSync("client_secret.json");

      if (clientSecret) {
        clientSecret = JSON.parse(clientSecret).web;
      }

      const { client_secret, client_id, redirect_uris } = clientSecret;

      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );

      await oAuth2Client.setCredentials(admin?.credentials);
      const calendar = await google.calendar({
        version: "v3",
        auth: oAuth2Client,
      });
      try {
        let eventId =
          calendarTopic == "MEETING"
            ? request.meetingCalendarEvent
            : calendarTopic == "STATUS"
            ? request.statusCalendarEvent
            : request.statusCalendarEvent;

        if (eventId) {
          await calendar.events.delete({
            calendarId:
              "cd24dd37a6b2608535e8a1f5609452f4f87c6cbe3ff142d9065ab08374ed52ec@group.calendar.google.com",
            eventId,
          });
        }
        console.log("silinmiştir herhalde", "calendar topic", calendarTopic);
      } catch (error) {
        console.log(error, "deleteCalendarEvents error");
      }
    } catch (error) {
      console.log(error, "adminCalendarEvents error");
    }
  }
};

const addAnEventToAdminCalendar = async (
  adminId,
  newEvent,
  requestId,
  calendarTopic
) => {
  try {
    let admin = await Model.Admin.findById(adminId);
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (!admin?.credentials) {
      throw new Error("You do not have any token for this operation.");
    }

    let clientSecret = fs.readFileSync("client_secret.json");

    if (clientSecret) {
      clientSecret = JSON.parse(clientSecret).web;
    }

    const { client_secret, client_id, redirect_uris } = clientSecret;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    await oAuth2Client.setCredentials(admin?.credentials);
    const calendar = await google.calendar({
      version: "v3",
      auth: oAuth2Client,
    });
    await calendar.events.insert(
      {
        auth: oAuth2Client,
        calendarId:
          "cd24dd37a6b2608535e8a1f5609452f4f87c6cbe3ff142d9065ab08374ed52ec@group.calendar.google.com",
        resource: {
          summary: newEvent.summary,
          location: newEvent.location,
          start: {
            dateTime: moment(newEvent.startDate).toISOString(),
            timeZone: "Europe/Istanbul",
          },
          end: {
            dateTime: moment(newEvent.startDate).toISOString(),
            timeZone: "Europe/Istanbul",
          },
          recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
          attendees: [{ email: admin.email }],
          description: newEvent.description,
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
        },
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          return;
        }
        saveCalendar(event, requestId, calendarTopic);
      }
    );

    const saveCalendar = async (calendarEvent, requestId, calendarTopic) => {
      console.log(calendarTopic, "calcalcal");
      try {
        if (calendarTopic == "MEETING") {
          await RequestModel.Request.findByIdAndUpdate(requestId, {
            $set: {
              meetingCalendarEvent: calendarEvent.data.id,
            },
          });
        } else if (calendarTopic == "WELCOME") {
          await RequestModel.Request.findByIdAndUpdate(requestId, {
            $set: {
              welcomeCalendarEvent: calendarEvent.data.id,
            },
          });
        } else if (calendarTopic == "CONSULTATION") {
          await RequestModel.Request.findByIdAndUpdate(requestId, {
            $set: {
              preConsCalendarEvent: calendarEvent.data.id,
            },
          });
        } else if (calendarTopic == "NURSE") {
          await RequestModel.Request.findByIdAndUpdate(requestId, {
            $set: {
              nurseCalendarEvent: calendarEvent.data.id,
            },
          });
        } else {
          await RequestModel.Request.findByIdAndUpdate(requestId, {
            $set: {
              statusCalendarEvent: calendarEvent.data.id,
            },
          });
        }
      } catch (err) {
        console.error(err?.data || err, "verifyGoogleAuth error 2");
      }
    };
  } catch (error) {
    console.log(error, "adminCalendarEvents error");
  }
};
const addAnEventToLeaderCalendar = async (
  adminId,
  newEvent,
  requestId,
  calendarTopic
) => {
  try {
    let admin = await Model.Admin.findOne({
      permissionGroup: "639081969df8290eb390bfe1",
    });
    console.log("addAnEventToLeaderCalendar", admin);
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (!admin?.credentials) {
      throw new Error("You do not have any token for this operation.");
    }

    let clientSecret = fs.readFileSync("client_secret.json");

    if (clientSecret) {
      clientSecret = JSON.parse(clientSecret).web;
    }

    const { client_secret, client_id, redirect_uris } = clientSecret;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    await oAuth2Client.setCredentials(admin?.credentials);
    const calendar = await google.calendar({
      version: "v3",
      auth: oAuth2Client,
    });
    await calendar.events.insert(
      {
        auth: oAuth2Client,
        calendarId:
          "cd24dd37a6b2608535e8a1f5609452f4f87c6cbe3ff142d9065ab08374ed52ec@group.calendar.google.com",
        resource: {
          summary: newEvent.summary,
          location: newEvent.location,
          start: {
            dateTime: moment(newEvent.startDate).toISOString(),
            timeZone: "Europe/Istanbul",
          },
          end: {
            dateTime: moment(newEvent.startDate).toISOString(),
            timeZone: "Europe/Istanbul",
          },
          recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
          attendees: [{ email: admin.email }],
          description: newEvent.description,
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "email", minutes: 10 },
            ],
          },
        },
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          return;
        }
        console.log(event, "calendarTopic", calendarTopic);
      }
    );
  } catch (error) {
    console.log(error, "adminCalendarEvents error");
  }
};
export default {
  setAdminPermissionGroupByAdminId,
  getAdmins,
  getAdmin,
  deleteAdmin,
  updateAdminStatusById,
  renewPassword,
  login,
  createAdmin,
  updateAdmin,
  authorizeForGoogle,
  checkGoogleAuthorize,
  verifyGoogleAuth,
  adminCalendarEvents,
  addAnEventToAdminCalendar,
  addAnEventToLeaderCalendar,
  deleteAnEventToAdminCalendar,
};
