import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import dbConfig from './dbConfig.js';
import router from './routes/index.js';

// Destructure the Client from the pg package
const { Client } = pkg;

// Initialize the app and load environment variables
dotenv.config();
const app = express();

app.use(express.json());

const port = process.env.PORT;

// Create PostgreSQL client instance
const client = new Client(dbConfig);
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

process.on('exit', () => client.end());

// Define a route
app.use("/", router);


// Route to get players
// app.get('/get_players', async (req, res) => {
//   try {
//     const result = await client.query('SELECT * FROM players');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error executing query', err.stack);
//     res.status(500).send('Error fetching data');
//   }
// });






// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
