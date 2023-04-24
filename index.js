const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Salut à tous !");
});

app.listen(3005);
console.log("Attente de requête au port 3005");
