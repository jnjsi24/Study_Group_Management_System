const Subject = require('../Models/subjects');
const Cafe = require('../Models/cafes');

module.exports = {
  createSubject: async (req, res) => {
    try {
      // Log the request body to debug the input
      console.log('Request Body:', req.body);

      const { name, customers, cafeId, startTime, endTime, date } = req.body;
      
      // Validate cafeId
      if (!cafeId) {
        return res.status(400).json({ error: "Cafe ID is required" });
      }

      // Check if cafe exists
      const cafe = await Cafe.findById(cafeId);
      if (!cafe) {
        return res.status(404).json({ error: "Cafe not found" });
      }
      
      // Create new subject
      const newSubject = new Subject({ 
        name, 
        customers, 
        cafe: cafeId,
        startTime,
        endTime,
        date 
      });
      
      // Save subject to the database
      const savedSubject = await newSubject.save();
      res.status(201).json(savedSubject);
    } catch (err) {
      res.status(400).json({ error: err.message || "Failed to create subject" });
    }
  },

  getSubjects: async (req, res) => {
    try {
      const subjects = await Subject.find().populate('customers').populate('cafe');
      if (!subjects || subjects.length === 0) {
        return res.status(404).json({ error: "No subjects found" });
      }
      res.status(200).json(subjects);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to retrieve subjects" });
    }
  },

  getSubjectById: async (req, res) => {
    try {
      const subjectId = req.params.id;
      const subject = await Subject.findById(subjectId).populate('customers').populate('cafe');
      if (!subject) {
        return res.status(404).json({ error: `Subject with ID ${subjectId} not found` });
      }
      res.status(200).json(subject);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to retrieve subject" });
    }
  },

  getSubjectByName: async (req, res) => {
    try {
      const { name } = req.query;
      const subject = await Subject.findOne({ name }).populate('customers').populate('cafe');
      if (!subject) {
        return res.status(404).json({ error: `Subject with name ${name} not found` });
      }
      res.status(200).json(subject);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to retrieve subject" });
    }
  },

  updateSubject: async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;
      const updatedSubject = await Subject.findByIdAndUpdate(id, update, { new: true });
      if (!updatedSubject) {
        return res.status(404).json({ error: `Subject with ID ${id} not found` });
      }
      res.status(200).json(updatedSubject);
    } catch (err) {
      res.status(400).json({ error: err.message || "Failed to update subject" });
    }
  },

  deleteSubject: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSubject = await Subject.findByIdAndDelete(id);
      if (!deletedSubject) {
        return res.status(404).json({ error: `Subject with ID ${id} not found` });
      }
      res.status(200).json({ message: `Subject with ID ${id} deleted successfully` });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to delete subject" });
    }
  }
};
