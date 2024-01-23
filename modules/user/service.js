import jwt from "jsonwebtoken"
import CONFIG from "../../config.js"
import { checkPassword, hashPassword } from "../utilities/bcrypt.js"
import Model from "./model.js"
import Mail from "../mail/mail.js"
import EmailVerifyTemplate from "./emailTemplates/emailVerifyTemplate.js"
import mongoose from "mongoose"
import moment from "moment"
import SMS from "../sms/sms.js"
const getUserByEmail = async (email) => {
  return Model.User.findOne({ email });
};

const getUserByPhone = async (phone) => {
  return Model.User.findOne({ phone });
};


const verifySignup = async (userId, authCode) => {
  try {
    let user = await Model.User.findById(userId)

    if (!user) {
      throw new Error(
        JSON.stringify({
          en: "User is not found.",
          tr: "Kullanıcı bulunamadı.",
        })
      );
    }

    let findAuthCode = await Model.Verification.findOne({ user: user._id, authCode })


    if (!findAuthCode) {
      throw new Error(
        JSON.stringify({
          en: "Auth code is not right.",
          tr: "Doğrulama kodu doğru değil.",
        })
      );
    }

    await Model.User.updateOne({
      _id: user._id
    }, {
      $set: {
        verified: true
      }
    })

    const token = jwt.sign(
      {
        type: "user",
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      CONFIG.JWT.secret
    );

    return {
      token,
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
    };

  } catch (error) {
    console.log("verifySignup error", error.message)
    throw new Error(error.message)
  }


}

const refreshVerification = async (userId, type) => {
  try {
    let userExists = await Model.User.findById(userId);

    if (!userExists) {

      throw new Error(
        JSON.stringify({
          en: "Kullanıcı bulunamadı",
          tr: "Kullanıcı zaten var.",
        })
      );
    }


    let hasUserAnyVerification = await Model.Verification.findOne({ user: mongoose.Types.ObjectId(userId), type })

    if (hasUserAnyVerification) {
      let distance = 180 - moment().diff(moment(hasUserAnyVerification.expireDate), "seconds")
      throw new Error(
        JSON.stringify({
          en: `You've already received the code a short time ago. Try again in ${distance} seconds.`,
          tr: `Zaten kısa bir süre önce kod aldınız. ${distance} saniye sonra tekrar deneyiniz.`,
        })
      );
    }

    let authCode = Math.floor(100000 + Math.random() * 900000)

    await new Model.Verification({
      authCode,
      user: userExists._id,
      type: "email"
    }).save()

    await Mail.sendMail(userExists.email, "E-posta adresinizi doğrulayın", undefined, EmailVerifyTemplate(authCode))

    return {
      userId: userExists._id,
    };
  } catch (error) {
    console.log("refreshVerification error", error.message);
    throw new Error(error.message);
  }
}

const signup = async (email, phone, fullName, password, consent) => {
  try {
    let user
    user = await getUserByEmail(email) || await getUserByPhone(phone);

    if (user && user.verified) {
      throw new Error(
        JSON.stringify({
          en: "User is found.",
          tr: "Kullanıcı zaten var.",
        })
      );
    }

    if (password) {
      password = await hashPassword(password)
    }

    if (user && !user.verified) {
      await Model.User.findByIdAndUpdate(user._id, { $set: { password, fullName, consent } })
    } else {
      user = await new Model.User({
        email,
        fullName,
        phone,
        password,
        consent
      }).save()
    }


    let authCode = Math.floor(100000 + Math.random() * 900000)

    await new Model.Verification({
      authCode,
      user: user._id,
      type: "email"
    }).save()

    await Mail.sendMail(email, "E-posta adresinizi doğrulayın", undefined, EmailVerifyTemplate(authCode))

    return {
      userId: user._id,
    };
  } catch (error) {
    console.log("signup error", error.message);
    throw new Error(error.message);
  }
}


const login = async (email, phone, password) => {
  try {
    let userExists

    if (email) {
      userExists = await getUserByEmail(email);
    }

    if (phone) {
      userExists = await getUserByPhone(phone);
    }

    if (!userExists) {
      throw new Error(
        JSON.stringify({
          en: "User is not found.",
          tr: "Kullanıcı bulunamadı.",
        })
      );
    }

    if (!userExists.isActive) {
      throw new Error(
        JSON.stringify({
          en: "User is not active.",
          tr: "Kullanıcı aktif değil.",
        })
      );
    }

    let check = await checkPassword(userExists.password, password);

    if (!check) {
      throw new Error(
        JSON.stringify({
          en: "Wrong password.",
          tr: "Yanlış şifre.",
        })
      );
    }

    const token = jwt.sign(
      {
        type: "user",
        userId: userExists._id,
        email: userExists.email,
        fullName: userExists.fullName,
        phone: userExists.phone,
      },
      CONFIG.JWT.secret
    );


    return {
      token,
      userId: userExists._id,
      username: userExists.email,
      fullName: userExists.fullName,
      name: userExists.name,
    };
  } catch (error) {
    console.log("login error", error.message);
    throw new Error(error.message);
  }
};


const updateUser = async (userId, userDetails) => {

  const user = await Model.User.findById(userId)

  if (!user) {
    throw new Error(
      JSON.stringify({
        en: "User is not found.",
        tr: "Kullanıcı bulunamadı.",
      })
    );
  }

  if (user.password != userDetails.password) {
    userDetails.password = await hashPassword(userDetails.password)
  }

  let updatedUser = await Model.User.findOneAndUpdate({ _id: userId }, userDetails, { new: true })
  return updatedUser

}

const checkUser = async (email, phone) => {
  let user
  if (email) {
    user = await Model.User.findOne({ email })
  }

  if (phone) {
    user = await Model.User.findOne({ phone })
  }

  return user ? { fullName: user.fullName, status: true, userId: user._id.toString() } : { status: false }

}
const getUsers = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const users = await Model.User.find(query, {}, queryOptions)
    .sort({ created_at: -1 })


  const count = await Model.User.countDocuments(query);
  return { users, count };
};

const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    let user = await Model.User.findById(userId);

    if (!user) {
      throw new Error(
        JSON.stringify({
          tr: "kullanıcı bulunamadı.",
          en: "User not found",
        })
      );
    }

    const check = await checkPassword(user.password, oldPassword);
    if (!check) {
      throw new Error(
        JSON.stringify({
          en: "Your old password is not right.",
          tr: "Eski şifreniz doğru değil.",
        })
      );
    }
    newPassword = await hashPassword(newPassword);
    return Model.User.findOneAndUpdate(
      { _id: user._id },
      { password: newPassword },
      { new: true }
    );
  } catch (error) {
    console.log(error.message, "user service change my password error");
    throw new Error(error.message);
  }
};





const resetPasswordRequestWithPhone = async (phone) => {
  try {
    let user = await getUserByPhone(phone);

    if (!user) {
      throw new Error(
        JSON.stringify({
          en: "User is not found.",
          tr: "Kullanıcı bulunamadı.",
        })
      );
    }

    let authCode = Math.floor(100000 + Math.random() * 900000)

    await new Model.Verification({
      authCode,
      user: user._id,
      type: "phone"
    }).save()

    await SMS.sendSMS(phone, `Şifrenizi sıfırlamak için doğrulama kodunuz: ${authCode}`, undefined, undefined)

    return {
      userId: user._id,
    };
  } catch (error) {
    console.log("signup error", error.message);
    throw new Error(error.message);
  }
}



const resetPasswordRequestWithEmail = async (email) => {
  try {
    let user = await getUserByEmail(email);

    if (!user) {
      throw new Error(
        JSON.stringify({
          en: "User is not found.",
          tr: "Kullanıcı bulunamadı.",
        })
      );
    }

    let authCode = Math.floor(100000 + Math.random() * 900000)

    await new Model.Verification({
      authCode,
      user: user._id,
      type: "email"
    }).save()

    await Mail.sendMail(email, `Şifrenizi sıfırlamak için doğrulama kodunuz: ${authCode}`, undefined, EmailVerifyTemplate(authCode, 'Şifrenizi sıfırlamak için doğrulama kodunuz:', "Lütfen kimse ile paylaşmayınız."))

    return {
      userId: user._id,
    };
  } catch (error) {
    console.log("signup error", error.message);
    throw new Error(error.message);
  }
}


const resetPasswordVerify = async (userId, authCode, newPassword) => {
  try {

    let user = await Model.User.findById(userId)

    if (!user) {
      throw new Error(
        JSON.stringify({
          en: "User is not found.",
          tr: "Kullanıcı bulunamadı.",
        })
      );
    }

    let findAuthCode = await Model.Verification.findOne({ user: user._id, authCode }).sort({ createdAt: -1 })


    if (!findAuthCode) {
      throw new Error(
        JSON.stringify({
          en: "Auth code is not right.",
          tr: "Doğrulama kodu doğru değil.",
        })
      );
    }


    newPassword = await hashPassword(newPassword);

    await Model.User.updateOne({
      _id: user._id
    }, {
      $set: {
        verified: true,
        password: newPassword
      }
    })

    const token = jwt.sign(
      {
        type: "user",
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
      },
      CONFIG.JWT.secret
    );

    return {
      token,
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
    };

  } catch (error) {
    console.log("resetPasswordVerify error", error.message)
    throw new Error(error.message)
  }
}

async function deleteUser(userId) {
  return Model.User.findByIdAndDelete(userId)
}

export default {
  login,
  signup,
  verifySignup,
  refreshVerification,
  updateUser,
  deleteUser,
  getUsers,

  //password
  changePassword,
  resetPasswordRequestWithPhone,
  resetPasswordRequestWithEmail,
  resetPasswordVerify,

  checkUser
};
