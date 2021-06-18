const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
/* app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
}); */

// routes
app.use("/api/parcels", orderRoutes);
app.use("/api/auth", authRoutes);

app.get("/api", (req, res) => {
  res.send("Welcome to Safe Courier!");
});

// Listen to connection
app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
