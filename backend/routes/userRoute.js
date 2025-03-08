const express = require("express");
const { registerAdmin, loginAdmin, refreshToken, logout, checkAuth } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginAdmin);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.get("/check-auth", checkAuth);  

module.exports = router;