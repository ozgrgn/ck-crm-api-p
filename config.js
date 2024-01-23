let PRODUCTION = false
import PROD from "./config.prod.json" assert {type: "json"};
import STAGE from "./config.stage.json" assert {type: "json"};
let DATA;
if (PRODUCTION) {
  DATA = PROD;
} else {
  DATA = STAGE;
}

const CONFIG = {
  PRODUCTION,
  DATABASE: DATA.DATABASE,
  GCP: DATA.GCP,
  INTERNAL: DATA.INTERNAL,
  JWT: DATA.JWT,
  MAIL: DATA.MAIL,
};

export default CONFIG

