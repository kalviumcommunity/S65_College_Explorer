const express = require("express");
const { getColleges, getCollegeById, addCollege, updateCollege, deleteCollege } = require("../controllers/collegeController.js");
const { verifyToken } = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/upload.js");

const router = express.Router();

router.get("/", getColleges);
router.get("/:id", getCollegeById);
router.post("/", verifyToken, upload.array("images", 5), addCollege);
router.put("/:id", verifyToken, upload.array("images", 5), updateCollege); // Add this line
router.delete("/:id", verifyToken, deleteCollege);

module.exports = router;