let items = [
  {
    id: 1,
    name: "Lionel Messi",
    team: "Inter Miami",
    position: "Forward",
    goals: 32,
  },
  {
    id: 2,
    name: "Cristiano Ronaldo",
    team: "Al Nassr",
    position: "Forward",
    goals: 30,
  },
  {
    id: 3,
    name: "Kevin De Bruyne",
    team: "Manchester City",
    position: "Midfielder",
    assists: 20,
  },
  {
    id: 4,
    name: "Virgil van Dijk",
    team: "Liverpool",
    position: "Defender",
    tackles: 50,
  },
  {
    id: 5,
    name: "Manuel Neuer",
    team: "Bayern Munich",
    position: "Goalkeeper",
    clean_sheets: 18,
  },
];

exports.getAllItems = (req, res) => {
  res?.send({
    success: true,
    message: "Data Fetched Successfully!",
    data: items,
  });
};

exports.getItemById = (req, res) => {
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

exports.createItem = (req, res) => {
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

exports.updateItem = (req, res) => {
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


exports.deleteItem = (req, res) => {
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
