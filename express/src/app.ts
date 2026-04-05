import express from "express";
import route from "./routes";

import "./config/passport";

import cors from "cors";
import passport from "passport";

const app = express();
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

const PORT = 3000;

app.use(route);

app.listen("3000", (err) => {
  if (err) console.error(err);
  else console.log(`Server up and running at port ${PORT}`);
});
