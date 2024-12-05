const Service = require("../models/service");

// Get all services.
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.json({ message: "Failed to retrieve services", error: err.message });
  }
};

// Get a service by name.
const getServiceByName = async (req, res) => {
  try {
    const { name } = req.params;

    const service = await Service.findOne({ name }); // Find the service by name.
    if (!service) {
      return res.json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    res.json({ message: "Failed to retrieve service", error: err.message });
  }
};

// Create a new service.
const createService = async (req, res) => {
  try {
    const { serviceName, category, price } = req.body;

    const service = new Service({
      serviceName,
      category,
      price,
    });

    await service.save();

    res.json({ message: "Service created successfully", service });
  } catch (err) {
    res.json({ message: "Failed to create service", error: err.message });
  }
};

module.exports = {
  getAllServices,
  getServiceByName,
  createService,
};
