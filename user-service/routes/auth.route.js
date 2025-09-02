import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { checkAuth, restrictTo } from "../middlewares/checkAuth.js";
const router = express.Router();

router.post('/register', registerUser);
router.post("/login", loginUser);
router.get("/user-dashboard", checkAuth, restrictTo("user"), (req, res) => {
    return res.status(200).json({ message: `Welcome User ${req.user.firstName}` });
});
router.get("/admin-dashboard", checkAuth, restrictTo("admin"), (req, res) => {
    return res.status(200).json({ message: `Welcome Admin ${req.user.firstName}` });
});

export default router;