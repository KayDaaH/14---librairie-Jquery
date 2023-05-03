const express = require("express");
const cors = require("cors");

const connectDB = require("./database/db");
const { trusted } = require("mongoose");
const dotenv = require("dotenv").config();
const port = 5000;

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/post", require("./routes/post.routes"));

app.listen(port, () => console.log("Le serveur à démarré au port " + port));
