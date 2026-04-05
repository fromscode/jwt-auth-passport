import express from "express";
import controller from "../controllers";
import passport from "passport";

const router = express.Router();

router.get("/", controller.getHome);
router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

router.get("/register", controller.getRegister);
router.post("/register", controller.postRegister);

router.get("/logout", controller.getLogout);

router.get(
  "/dashboard",
  passport.authenticate("jwt", {
    session: false,
  }),
  controller.getDashboard,
);

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  controller.getProfile,
);

export default router;
