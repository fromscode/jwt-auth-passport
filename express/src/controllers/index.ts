import { Request, Response } from "express";
import queries from "../db/queries";
import bcrypt from "bcrypt";
import createToken from "../auth/createToken";

function getHome(req: Request, res: Response) {
  res.send("This is home page");
}

function getLogin(req: Request, res: Response) {}
async function postLogin(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await queries.getUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({
      message: "Invalid credentials",
    });
    return;
  }

  const token = createToken(user);

  res.status(200).json({
    message: `User logged in succesfully`,
    token: token,
  });
}
function getRegister(req: Request, res: Response) {}
async function postRegister(req: Request, res: Response) {
  const { username, password } = req.body;

  let user = await queries.getUserByUsername(username);
  if (user) {
    res.status(400).json({
      message: "Failed to create user, username is already taken",
    });
    return;
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const id = await queries.createUser(username, hashedPass);

  const token = createToken({ id: id });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id,
      username,
    },
    token: token,
  });
}
function getProfile(req: Request, res: Response) {}
async function getDashboard(req: Request, res: Response) {
  res.json({
    username: (req as any).user.username,
  });
}
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
