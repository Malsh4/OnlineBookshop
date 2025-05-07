import express from "express";
import { getUserData, updateUserInfo } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/ImageUploads.js";

const router = express.Router();
router.get("/data",    userAuth, getUserData);
router.put("/update",  userAuth, upload, updateUserInfo);
export default router;
