import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const existingLead = await Lead.findOne({
      user: req.user.id,
      email: req.body.email,
    });
    if (existingLead) {
      return res
        .status(400)
        .json({ success: false, error: "Lead with this email already exists" });
    }
    const lead = await Lead.create(req.body);

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: "lead not found" });
    }

    if (lead.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: "Not authorized to access this lead" });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
export const updateLead = async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: "Lead not found" });
    }

    if (lead.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: "Not authorized to update this lead" });
    }
    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: "Lead not found" });
    }
    if (lead.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: "Not authorized to delete this lead" });
    }
    await lead.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
