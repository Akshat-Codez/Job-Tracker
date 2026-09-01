const Application = require("../models/Application");

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};

const createApplication = async (req, res) => {
  try {
    const { company, role, status, dateApplied, notes } = req.body;
    const application = await Application.create({
      company,
      role,
      status: status || "Applied",
      dateApplied,
      notes: notes || ""
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: "Failed to create application", error: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: "Failed to update application", error: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApplication = await Application.findByIdAndDelete(id);
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({ message: "Application deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete application", error: error.message });
  }
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication
};
