const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());

// routes
app.use("/parcels", orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Safe Courier!");
});

// Listen to connection
app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
