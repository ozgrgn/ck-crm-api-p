import adminRouter from "./admin/routes.js";
import Services from "./services/index.js";
import treatmentRouter from "./treatment/routes.js";
import groupRouter from "./group/routes.js";
import reservationRouter from "./reservation/routes.js";
import patientRouter from "./patient/routes.js";
import referenceCatRouter from "./referenceCat/routes.js";
import referenceRouter from "./reference/routes.js";
import hotelRouter from "./hotel/routes.js";
import staffRouter from "./staff/routes.js";
import carRouter from "./car/routes.js";
import bagRouter from "./bag/routes.js";
import timelineItemRouter from "./timelineItem/routes.js";
import appointmentItemRouter from "./appointmentItem/routes.js";
import taskRouter from "./task/routes.js";

import requestRouter from "./request/routes.js";
import wpTextRouter from "./wpText/routes.js";
import mailTextRouter from "./mailText/routes.js";
import patientMailRouter from "./patientMail/routes.js";
import noteRouter from "./note/routes.js";
import priceNoteRouter from "./priceNote/routes.js";
import ticketRouter from "./ticket/routes.js";
import paymentRouter from "./payment/routes.js";
// import landingPageRouter from "./landingPage/routes.js";


export default function (app) {
  app.use("/admin", adminRouter);
  app.use("/patient", patientRouter);
  app.use("/referenceCat", referenceCatRouter);
  app.use("/reference", referenceRouter);
  app.use("/hotel", hotelRouter);
  app.use("/staff", staffRouter);
  app.use("/car", carRouter);
  app.use("/bag", bagRouter);
  app.use("/timelineItem", timelineItemRouter);
  app.use("/appointmentItem", appointmentItemRouter);
  app.use("/task", taskRouter);

  app.use("/request", requestRouter);
  app.use("/wpText", wpTextRouter);
  app.use("/mailText", mailTextRouter);
  app.use("/patientMail", patientMailRouter);
  app.use("/note", noteRouter);
  app.use("/priceNote", priceNoteRouter);
  app.use("/ticket", ticketRouter);
  app.use("/payment", paymentRouter);
  // app.use("/landingPage", landingPageRouter);

  
  app.use("/group", groupRouter);
  app.use("/reservation", reservationRouter);
  app.use("/treatment", treatmentRouter);
  app.use("/services", Services.router);
  app.get("/", async (req, res) => {
    return res.json({ message: "Hello World !" });
  });
}
