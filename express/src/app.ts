import express from "express";
import route from "./routes";

import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use(route);

app.listen("3000", (err) => {
  if (err) console.error(err);
  else console.log(`Server up and running at port ${PORT}`);
});
