import { items } from "./utils/constants.js";
const getAllItems = (req, res) => {
  res?.send({
    success: true,
    message: "Data Fetched Successfully!",
    data: items,
  });
};

const getItemById = (req, res) => {
  const { id } = req?.params;
  const item = items?.find((i) => i?.id === parseInt(id));
  if (!item) {
    return res?.status(400).send({
      success: false,
      message: "Item Not Found",
    });
  }
  res?.status(200).send({
    success: true,
    message: "Data Fetched Successfully!",
    data: item,
  });
};

const createItem = (req, res) => {
  const { name, team, position, goals, assists, tackles, clean_sheets } = req?.body;

  if (!name || !team || !position) {
    return res?.status(400)?.send({
      success: false,
      errors: [
        { field: "name", message: "Name field is required" },
        { field: "team", message: "Team field is required" },
        { field: "position", message: "Position field is required" },
      ],
    });
  }

  const newItem = {
    id: items?.length + 1,
    name,
    team,
    position,
    goals: goals || 0,
    assists: assists || 0,
    tackles: tackles || 0,
    clean_sheets: clean_sheets || 0,
  };
  items?.push(newItem);

  res?.status(200)?.send({
    success: true,
    message: "Data Added Successfully!",
    data: newItem,
  });
};

const updateItem = (req, res) => {
  const { id } = req?.params;
  const { name, position, team, goals, assists, tackles, clean_sheets } = req?.body;
  const item = items?.find((i) => i?.id === parseInt(id));

  if (!item) {
    return res?.status(404)?.send({
      success: false,
      message: "Item Not Found",
    });
  }

  // Check if name and position are provided
  if (!name || !position) {
    return res?.status(400)?.send({
      success: false,
      message: "Both name and position fields are required",
      errors: [
        { field: "name", message: "Name field is required" },
        { field: "position", message: "Position field is required" },
      ],
    });
  }

  item.name = name;
  item.position = position;

  if (team !== undefined) item.team = team;
  if (goals !== undefined) item.goals = goals;
  if (assists !== undefined) item.assists = assists;
  if (tackles !== undefined) item.tackles = tackles;
  if (clean_sheets !== undefined) item.clean_sheets = clean_sheets;

  res?.status(200).send({
    success: true,
    message: "Item Updated Successfully!",
    data: item,
  });
};

const deleteItem = (req, res) => {
  const { id } = req?.params;
  const itemIndex = items?.findIndex((i) => i?.id === parseInt(id));

  if (itemIndex === -1) {
    return res?.status(404)?.send({
      success: false,
      message: "Item Not Found",
    });
  }

  items?.splice(itemIndex, 1);

  res?.status(200)?.send({
    success: true,
    message: "Data Deleted Successfully!",
  });
};


export default {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};