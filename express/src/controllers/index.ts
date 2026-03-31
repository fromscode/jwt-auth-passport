import { Request, Response } from "express";
import queries from "../db/queries";

function getHome(req: Request, res: Response) {
  res.send("This is home page");
}

function getLogin(req: Request, res: Response) {}
async function postLogin(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await queries.getUserByUsername(username);

  // TODO - implement hashing

  if (!user || user.password != password) {
    res.status(401).json({
      message: "Invalid credentials",
    });
    return;
  }

  // TODO - Generate token

  res.status(200).json({
    message: `User logged in succesfully`,
    token: "some token",
  });
}
function getRegister(req: Request, res: Response) {}
async function postRegister(req: Request, res: Response) {
  const { username, password } = req.body;

  let user = await queries.getUserByUsername(username);
  console.log(username);
  console.log(user);
  if (user) {
    res.status(400).json({
      message: "Failed to create user, username is already taken",
    });
    return;
  }

  // TODO- implement hashing

  const id = await queries.createUser(username, password);

  // TODO - implement hashing

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id,
      username,
    },
    token: "generated token",
  });
}
function getProfile(req: Request, res: Response) {}
function getDashboard(req: Request, res: Response) {}
function getLogout(req: Request, res: Response) {}

export default {
  getHome,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getProfile,
  getDashboard,
  getLogout,
};
