import { Request, Response } from "express";

function getHome(req: Request, res: Response) {
  res.send("This is home page");
}

function getLogin(req: Request, res: Response) {}
function postLogin(req: Request, res: Response) {
  const {username, password} = req.body;

  // TODO: Change this later to actually verify
  if (username == password)
  res.status(200).json({
    message: `User logged in succesfully`,
    token: 'some token'
  });
  
  else res.status(401).json({
    message: 'Invalid credentials'
  })
}
function getRegister(req: Request, res: Response) {}
function postRegister(req: Request, res: Response) {
  const {username, password} = req.body;

  // TODO: Change this later
  let user = {
    username, password, id: 0
  }
  if (username == password) 
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username
      },
      token: 'some random token'
    })

    else res.status(400).json({
      message: 'Failed to create user'
    })
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
