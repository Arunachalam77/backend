const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Import the routes
const routes = require("./routes");

app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
