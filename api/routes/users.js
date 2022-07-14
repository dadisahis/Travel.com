import express from "express";
import {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkAuthentication", verifyToken, (req, res, next) => {
//   res.send("You are authenticated");
// });

// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("You are authenticated and can delete your account");
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("You are admin and can delete all accounts");
// });

//UPDATE
router.put("/update/:id", verifyUser, updateUser);
//DELETE
router.delete("/delete/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUserById);
//GETALL
router.get("/", verifyAdmin, getAllUsers);

export default router;
