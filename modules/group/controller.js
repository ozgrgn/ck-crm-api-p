import Service from "./service.js";
import _ from "lodash";
const addGroup = async (req, res) => {
  const {
    lang,
    title,
    description,
    description2,
    department,
    svg,
    perma,
    text,
    image,
    order
  } = req.body;

  try {
    let group = await Service.addGroup(
      lang,
      title,
      description,
      description2,
      department,
      svg,
      perma,
      text,
      image,
      order
    );

    return res.json({
      status: true,
      group,
    });
  } catch (error) {
    console.log(error.message, "addGroup error");
    return res.json({ status: false, message: error.message });
  }
};

const updateGroup = async (req, res) => {
  const { group } = req.body;
  const { groupId } = req.params;
  console.log(group, "sdsfsfsdfsdsf");
  try {
    let updatedGroup = await Service.updateGroup(groupId, group);

    return res.json({
      status: true,
      updatedGroup,
    });
  } catch (error) {
    console.log(error.message, "updateGroup error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    await Service.deleteGroup(groupId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteGroup error");
    return res.json({ status: false, message: error.message });
  }
};

const getGroups = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const groupsQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let groups = await Service.getGroups(groupsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...groups });
  } catch (error) {
    console.log(error.message, "getGroups error");
    return res.json({ status: false, message: error.message });
  }
};

const getGroup = async (req, res) => {
  try {
    const GroupQuery = _.omitBy(
      {
        _id: req.params.groupId,
      },
      (a) => a === undefined
    );

    let group = await Service.getGroup(GroupQuery);
    return res.json({ status: true, group });
  } catch (error) {
    console.log(error.message, "getGroup error");
    return res.json({ status: false, message: error.message });
  }
};

const getGroupViaPerma = async (req, res) => {
  try {
    const GroupQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let group = await Service.getGroupViaPerma(GroupQuery);
    return res.json({ status: true, group });
  } catch (error) {
    console.log(error.message, "getGroup error");
    return res.json({ status: false, message: error.message });
  }
};


export default {
  addGroup,
  updateGroup,
  deleteGroup,
  getGroups,
  getGroup,
  getGroupViaPerma
};
