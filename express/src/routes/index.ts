import express from "express";
import controller from "../controllers";

const router = express.Router();

router.get("/", controller.getHome);
router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

router.get("/register", controller.getRegister);
router.post("/register", controller.postRegister);

router.get("/logout", controller.getLogout);

router.get("/dashboard", controller.getDashboard);

router.get("/profile", controller.getProfile);

export default router;
