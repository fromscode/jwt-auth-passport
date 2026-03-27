import { Request, Response } from "express";

function getHome(req: Request, res: Response) {
  res.send("This is home page");
}

function getLogin(req: Request, res: Response) {}
function postLogin(req: Request, res: Response) {
  res.json({
    message: 'Login data was received'
  });
}
function getRegister(req: Request, res: Response) {}
function postRegister(req: Request, res: Response) {}
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
