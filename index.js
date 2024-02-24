const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const dotenv = require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: "https://form-seven-lovat.vercel.app"
  })
);
const URL = process.env.DB;


app.post("/", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("user");
    const obj = await db.collection("userdata").insertOne(req.body);
    await connection.close();
    res.json({ message: "Data posted Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("user");
    const obj = await db.collection("userdata").find().toArray();
    await connection.close();
    res.json(obj);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messaage: "Something went wrong" });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("user");
    const objid = new ObjectId(req.params.id);
    const obj = await db.collection("userdata").findOne({ _id: objid });
    await connection.close();
    res.json(obj);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("user");
    const objid = new ObjectId(req.params.id);
    const obj = await db
      .collection("userdata")
      .findOneAndUpdate(
        { _id: objid },
        { $set: { ...req.body } },
        { returnOriginal: false }
      );
    await connection.close();
    res.json({ messaage: "Data updated Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("user");
    const objid = new ObjectId(req.params.id);
    const obj = await db.collection("userdata").deleteOne({ _id: objid });
    await connection.close();
    res.json({ message: "Data Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(3001);

//kjaswant2305
//DsSayBOfyHvurmRo