export default (options) => {
  return async (req, res, next) => {
    if (!options || !options.allowedTypes) {
      if ((req.user && req.user.email) || req.admin) {
        return next();
      }
    }

    const { user } = req;
    try {
      if (!user) {
        return res.json({
          status: false,
          message: JSON.stringify({
            tr: "Giriş yapılmamış.",
            en: "Not logged in!",
          }),
        });
      }

      const isAllowedType =
        options && options.allowedTypes.find((type) => type === user.type);
      if (!isAllowedType) {
        return res.json({
          status: false,
          message: JSON.stringify({
            en: `User type ${user.type} is not allowed!`,
            tr: `Kullanıcı türünün ${user.type} izni yoktur.`,
          }),
        });
      }

      return next();
    } catch (error) {
      console.log("routeguard error", error);
      return res.json({ status: false, message: error.message });
    }
  };
};
