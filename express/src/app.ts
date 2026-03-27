import express from "express";
import route from "./routes";

const app = express();

const PORT = 3000;

app.use(route);

app.listen("3000", (err) => {
  if (err) console.error(err);
  else console.log(`Server up and running at port ${PORT}`);
});
