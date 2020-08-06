require("dotenv").config();
const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss");

// prevention of DOS attack by preventing the actual payload data
app.use(express.json({ limit: "10kb" }));
// preventing cors error
app.use(cors());

app.use(helmet());

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect(`/${uuid()}`);
});

app.get("/:roomId", (req, res) => {
  res.render("room", { roomId: req.params.roomId });
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
