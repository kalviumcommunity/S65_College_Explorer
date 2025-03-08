const College = require("../models/CollegeModel");

const getColleges = async (req, res) => {
  try {
    const { state, city } = req.query; 
    const query = {};

    if (state) query.state = state;
    if (city) query.city = city;

    const colleges = await College.find(query);
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCollege = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name, state, city, address, courses, website, contact, email, rating, description } = req.body;

    const images = req.files?.map((file) => file.path) || [];

    const college = new College({
      name,
      state,
      city,
      address,
      courses,
      website,
      contact,
      email,
      rating,
      description,
      images,
      addedBy: req.user.id,
    });

    await college.save();
    res.status(201).json({ message: "College added successfully", college });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add the delete college function
const deleteCollege = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    await College.findByIdAndDelete(req.params.id);
    res.json({ message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add this function to your collegeController.js file

// Update college function
const updateCollege = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name, state, city, address, courses, website, contact, email, rating, description } = req.body;

    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    const updateData = {
      name, 
      state, 
      city, 
      address, 
      courses, 
      website, 
      contact, 
      email, 
      rating, 
      description
    };

    // If new images are uploaded, add them to the college
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      updateData.images = [...(college.images || []), ...newImages];
    }

    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "College updated successfully", college: updatedCollege });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the exports
module.exports = { getColleges, getCollegeById, addCollege, updateCollege, deleteCollege };