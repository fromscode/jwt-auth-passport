import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).header({
      "WWW-Authenticate": "Bearer",
    });

    return;
  }

  const token = authHeader.split(" ")[1];

  //TODO -  Do something with the token

  res.json({
    user: {
      username: "todo",
      password: "todo",
    },
  });
}
