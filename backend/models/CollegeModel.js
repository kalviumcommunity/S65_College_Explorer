const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true }, 
    city: { type: String, required: true },
    address: { type: String, required: true },
    courses: [{ type: String, required: true }], 
    website: { type: String },
    contact: { type: String },
    email: { type: String }, 
    rating: { type: Number, default: 0 },
    description: { type: String }, 
    images: [{ type: String }], 
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);