export default (options) => {
  return async (req, res, next) => {
    const { admin } = req;

    try {
      if (!admin) {
        return res.json({
          status: false,
          message: JSON.stringify({
            tr: "Giriş yapılmamış.",
            en: "Not logged in!",
          }),
        });
      }

      if (!options || !options.requirePermissions) {
        return next();
      }

      if (!admin.super) {
        options.requirePermissions.map((permission) => {
          if (admin.permissions.indexOf(permission) == -1) {
            throw new Error(
              JSON.stringify({
                en: `You do not have this permission`,
                tr: `Bu yetkiye sahip değilsiniz.`,
              })
            );
          }
        });
      }

      return next();
    } catch (error) {
      console.log("routeguard error", error);
      return res.json({ status: false, message: error.message });
    }
  };
};
