import pkg from "pg";
import { validationResult } from 'express-validator';
import dbConfig from "./dbConfig.js";

const { Client } = pkg;

const client = new Client(dbConfig);


// Connection to DB
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

connectToDatabase();


// Create Player 
export const createPlayer = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      success: false,
      errors: errors.array().map(err => ({
        message: err.msg,
      })),
    });
  }

  const { id, name, team, position } = req.body;

  try {
    // Insert the new player into the database
    const result = await client.query(
      "INSERT INTO players (id, name, team, position) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, name, team, position]
    );

    // Return the inserted player data
    return res.status(200).send({
      data: {
        players: result.rows[0], // returning the inserted player
      },
      status: {
        code: 200,
        message: "Player added successfully!",
      },
    });
  } catch (err) {
    // Handle any errors during query execution
    console.error("Error executing query:", err);
    return res.status(500).json({
      data: {},
      status: {
        code: 500,
        message: "Error inserting data",
      },
      details: err.message,
    });
  }
};

// Get Player
export const getPlayersList = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM players");
    return res.status(200).send({
      data: {
        players: result.rows,
      },
      status: {
        code: 200,
        message: "Player Added Successfully!",
      },
    });
  } catch (err) {
    // Handle any errors during query execution
    console.error("Error executing query:", err);
    return res.status(500).json({
      data: {},
      status: {
        code: 500,
        message: "Error getting data",
      },
      details: err.message,
    });
  }
};

// Get PLayer by ID
export const getPlayerListId = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure id is a number
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).send({
        data: {},
        status: {
          code: 400,
          message: "Invalid ID format",
        },
      });
    }

    // Query the database to find the player by ID
    const result = await client.query("SELECT * FROM players WHERE id = $1", [
      parsedId,
    ]);

    // If no player is found, return 404
    if (result.rows.length === 0) {
      return res.status(404).send({
        data: {},
        status: {
          code: 404,
          message: "Player not found",
        },
      });
    }

    // Return the found player
    const player = result.rows[0];
    return res.status(200).send({
      data: {
        players: [player],
      },
      status: {
        code: 200,
        message: "Player fetched successfully!",
      },
    });
  } catch (err) {
    // Handle any errors during query execution
    console.error("Error executing query:", err);
    return res.status(500).json({
      data: {},
      status: {
        code: 500,
        message: "Error fetching player data",
      },
      details: err.message,
    });
  }
};

// Update Player Details
export const updatePlayerById = async (req, res) => {
  // Validate input errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: {
        code: 400,
        message: "Validation errors",
      },
      errors: errors.array(),
    });
  }

  try {
    const { id } = req.params;
    const { name, team, position } = req.body;

    // Parse the ID to ensure it's valid
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "Invalid ID format",
        },
      });
    }

    // Check if the player exists
    const result = await client.query('SELECT * FROM players WHERE id = $1', [parsedId]);

    // If player doesn't exist, return 404
    if (result.rows.length === 0) {
      return res.status(404).send({
        data: {},
        status: {
          code: 404,
          message: "Player does not exist",
        },
      });
    }

    // Update the player information
    await client.query(
      'UPDATE players SET name = $1, team = $2, position = $3 WHERE id = $4',
      [name, team, position, parsedId]
    );

    return res.status(200).send({
      success: true,
      status: {
        code: 200,
        message: "Player updated successfully!",
      },
    });
  } catch (err) {
    // Handle any errors during query execution
    console.error("Error executing query:", err);
    return res.status(500).json({
      data: {},
      status: {
        code: 500,
        message: "Error updating player",
      },
      details: err.message,
    });
  }
};

// Delete player By Id
export const deletePlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Parse the ID to ensure it's valid
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "Invalid ID format",
        },
      });
    }

    // Check if the player exists
    const result = await client.query('SELECT * FROM players WHERE id = $1', [parsedId]);

    // If player doesn't exist, return 404
    if (result.rows.length === 0) {
      return res.status(404).send({
        data: {},
        status: {
          code: 404,
          message: "Player does not exist",
        },
      });
    }

    // Delete the player from the database
    await client.query('DELETE FROM players WHERE id = $1', [parsedId]);

    return res.status(200).send({
      success: true,
      status: {
        code: 200,
        message: "Player Deleted Successfully!!",
      },
    });
  } catch (err) {
    // Handle any errors during query execution
    console.error("Error executing query:", err);
    return res.status(500).json({
      data: {},
      status: {
        code: 500,
        message: "Error deleting player",
      },
      details: err.message,
    });
  }
};



