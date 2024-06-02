const Cafe = require('../Models/cafes');

module.exports = {
  createCafe: async (req, res) => {
    try {
      const { name, address, subjects } = req.body; // Updated to accept 'subjects' instead of 'group'
      const newCafe = new Cafe({ name, address, subjects }); // Updated to use 'subjects'
      const savedCafe = await newCafe.save();
      res.status(201).json(savedCafe);
    } catch (err) {
      res.status(400).json({ error: err.message || "Failed to create cafe" });
    }
  },

  getCafes: async (req, res) => {
    try {
      const cafes = await Cafe.find();
      if (!cafes || cafes.length === 0) {
        return res.status(404).json({ error: "No cafes found" });
      }
      res.status(200).json(cafes);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to retrieve cafes" });
    }
  },

  queryCafeByName: async (req, res) => {
    try {
      const queryName = req.query.name;
      const cafes = await Cafe.find({ name: queryName });
      res.status(200).json(cafes);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to query cafes by name" });
    }
  },

  updateCafe: async (req, res) => {
    try {
      const cafeId = req.params.id;
      const updatedDetails = req.body;
      const updatedCafe = await Cafe.findByIdAndUpdate(cafeId, updatedDetails, { new: true });
      if (!updatedCafe) {
        return res.status(404).json({ error: `Cafe with ID ${cafeId} not found` });
      }
      res.status(200).json(updatedCafe);
    } catch (err) {
      res.status(400).json({ error: err.message || "Failed to update cafe" });
    }
  },

  deleteCafe: async (req, res) => {
    try {
      const cafeId = req.params.id;
      const deletedCafe = await Cafe.findByIdAndDelete(cafeId);
      if (!deletedCafe) {
        return res.status(404).json({ error: `Cafe with ID ${cafeId} not found` });
      }
      res.status(200).json({ message: `Cafe ${cafeId} deleted successfully` });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to delete cafe" });
    }
  },

  getCafeById: async (req, res) => {
    try {
      const cafeId = req.params.id;
      const cafe = await Cafe.findById(cafeId);
      if (!cafe) {
        return res.status(404).json({ error: `Cafe with ID ${cafeId} not found` });
      }
      res.status(200).json(cafe);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to retrieve cafe" });
    }
  }
};
