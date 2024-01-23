import Model from "./model.js";

const getTimelineItems = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const timelineItems = await Model.TimelineItem.find(
    query,
    {},
    queryOptions
  ).sort({ name: 1 });
  console.log(query, "getTimeLineItems query");
  const count = await Model.TimelineItem.countDocuments(query);

  return { timelineItems, count };
};

const getTimelineItem = async (query) => {
  return Model.TimelineItem.findOne(query);
};

const addTimelineItem = async (name, title, description, image, custom) => {
  try {
    return new Model.TimelineItem({
      name,
      title,
      description,
      image,
      custom,
    }).save();
  } catch (error) {
    console.log("addTimelineItem service error", error);
    throw new Error(error.message);
  }
};

const updateTimelineItem = async (timelineItemId, timelineItem) => {
  try {
    let isExistTimelineItem = await Model.TimelineItem.findById(timelineItemId);

    if (!isExistTimelineItem) {
      throw new Error(
        JSON.stringify({
          en: "TimelineItem is not found.",
          tr: "TimelineItem bulunamadı.",
        })
      );
    }

    return Model.TimelineItem.findOneAndUpdate(
      { _id: isExistTimelineItem._id },
      { ...timelineItem },
      { new: true }
    );
  } catch (error) {
    console.log("updateTimelineItem service error", error);
    throw new Error(error.message);
  }
};

const deleteTimelineItem = async (timelineItemId) => {
  try {
    return Model.TimelineItem.deleteOne({ _id: timelineItemId });
  } catch (error) {
    console.log("deleteTimelineItem service error", error);
    throw new Error(error.message);
  }
};

const getTimelineItemViaPerma = async (query) => {
  return Model.TimelineItem.findOne(query);
};

export default {
  addTimelineItem,
  updateTimelineItem,
  deleteTimelineItem,
  getTimelineItems,
  getTimelineItem,
  getTimelineItemViaPerma,
};
