import "module-alias/register";

import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";

import PassportConfig from "./utils/passport";

import User from "./routes/user";
import { config } from "@utils/db";

dotenv.config();
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.dir("Database is connected");
  },
  err => {
    console.dir("Cannot connet to DB cause: " + err);
  }
);

const app = express();
app.use(passport.initialize());
PassportConfig(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", User);

app.get("/", (_req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.dir(`Server is running on PORT ${PORT}`);
});
