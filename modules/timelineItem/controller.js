import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addTimelineItem = async (req, res) => {
  const { name, title, description, image, custom } = req.body;

  try {
    let timelineItem = await Service.addTimelineItem(
      name,
      title,
      description,
      image,
      custom
    );

    return res.json({
      status: true,
      timelineItem,
    });
  } catch (error) {
    console.log(error.message, "addTimelineItem error");
    return res.json({ status: false, message: error.message });
  }
};

const updateTimelineItem = async (req, res) => {
  const { timelineItem } = req.body;
  const { timelineItemId } = req.params;
  try {
    let updatedTimelineItem = await Service.updateTimelineItem(
      timelineItemId,
      timelineItem
    );

    return res.json({
      status: true,
      updatedTimelineItem,
    });
  } catch (error) {
    console.log(error.message, "updateTimelineItem error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteTimelineItem = async (req, res) => {
  const { timelineItemId } = req.params;

  try {
    await Service.deleteTimelineItem(timelineItemId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteTimelineItem error");
    return res.json({ status: false, message: error.message });
  }
};

const getTimelineItems = async (req, res) => {
  const { limit, skip, custom } = req.query;

  try {
    const timelineQuery = _.omitBy(
      {
        custom,
      },
      (a) => a === undefined
    );
    let timelineItems = await Service.getTimelineItems(timelineQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...timelineItems });
  } catch (error) {
    console.log(error.message, "getTimelineItems error");
    return res.json({ status: false, message: error.message });
  }
};

const getTimelineItem = async (req, res) => {
  try {
    const TimelineItemQuery = _.omitBy(
      {
        _id: req.params.timelineItemId,
      },
      (a) => a === undefined
    );

    let timelineItem = await Service.getTimelineItem(TimelineItemQuery);
    return res.json({ status: true, timelineItem });
  } catch (error) {
    console.log(error.message, "getTimelineItem error");
    return res.json({ status: false, message: error.message });
  }
};

const getTimelineItemViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let timelineItem = await Service.getTimelineItemViaPerma(EventQuery);
    return res.json({ status: true, timelineItem });
  } catch (error) {
    console.log(error.message, "getTimelineItem error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addTimelineItem,
  updateTimelineItem,
  deleteTimelineItem,
  getTimelineItems,
  getTimelineItem,
  getTimelineItemViaPerma,
};
