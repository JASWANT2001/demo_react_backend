const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

let array = [];

app.post("/", (req, res) => {
  req.body.id = array.length + 1;
  array.push(req.body);
  res.json({ message: "Data Posted Sucuessfully" });
});

app.get("/", (req, res) => {
  res.json(array);
});

app.get("/:id", (req, res) => {
  let id = req.params.id;
  let user = array.find((user) => user.id == id);
  res.json(user);
});

app.put("/:id", (req, res) => {
  let id = req.params.id;
  req.body.id = id;
  let index = array.findIndex((user) => user.id == id);
  array[index] = req.body;
  res.json({ message: "Data Updated" });
});

app.delete("/:id", (req, res) => {
  let id = req.params.id;
  let index = array.findIndex((user) => user.id == id);
  array.splice(index, 1);
  res.json({ message: "User Deleted" });
});

app.listen(3000);
