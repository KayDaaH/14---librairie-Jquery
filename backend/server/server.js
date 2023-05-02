const express = require("express");
const connectDB = require("./database/db");
const dotenv = require("dotenv").config();
const port = 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/post", require("./routes/post.routes"));

app.listen(port, () => console.log("Le serveur à démarré au port " + port));
