import { matchedData, validationResult } from "express-validator"

export default (req, res, next) => {
  const { errors } = validationResult(req);
  let _errors = [];
  if (errors.length > 0) {
    let errorString = "";
    errors.map((error, index) => {
      if (_errors.indexOf(error.param) == -1) {
        _errors = [..._errors, error.param];
        if (index > 0) {
          errorString = errorString + "," + error.param;
        } else {
          errorString = errorString + error.param;
        }
      }
    });

    return res.json({
      status: false,
      message: JSON.stringify({
        tr: `Hatalı alanlar :  ${errorString}`,
        en: `Wrong fields :  ${errorString} `,
      }),
      errors,
    });
  }

  req.query = matchedData(req, { locations: ["query"] });
  req.params = matchedData(req, { locations: ["params"] });
  req.body = matchedData(req, { locations: ["body"] });

  return next();
};
