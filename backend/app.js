const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const URL = process.env.URL;
const PORT = process.env.PRT;

const routes = require("./src/routes");

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/v1", routes);

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("Failed to connect.");
  });
app.listen(PORT, () => {
  console.log("Server started at", PORT);
});
