import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen("3000");
