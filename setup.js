import db from "./db.js";
import CONFIG from "./config.js";
import AdminModel from "./modules/admin/model.js"
import { hashPassword } from "./modules/utilities/bcrypt.js";
const setup = async () => {
  try {
    console.log("------ creating super admin -----");
    let password = await hashPassword(CONFIG.INTERNAL.SUPER_PASSWORD);

    let savedSuper = await AdminModel.Admin.findOneAndUpdate({ email: CONFIG.INTERNAL.SUPER_EMAIL }, {
      fullName: CONFIG.INTERNAL.SUPER_NAME,
      email: CONFIG.INTERNAL.SUPER_EMAIL,
      password,
      super: true,
    }, { upsert: true, new: true })

    console.log("------ successfully created super admin -----", savedSuper);
    process.exit()
  } catch (error) {
    console.log("setup error", error);
  }
};
db.on("connected", async () => {
  console.log("DB connected for setup");
  setup();
});
