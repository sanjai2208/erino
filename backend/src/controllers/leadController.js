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

    const query = {user: req.user.id};

    const stringFilters = ["first_name", "last_name", "email", "company","city","state"];

    stringFilters.forEach(field => {
        if(req.query[field]){

            
            query[field] = {$regex : req.query[field], $options: 'i'};
        }
    });

    const enumFilters = ["source", "status"];
    enumFilters.forEach(field => {
        if(req.query[field]){
        query[field] = req.query[field];
        }
    })
    if(req.query.is_qualified){
        query.is_qualified = req.query.is_qualified === "true"
    }

    if(req.query.score){
        query.score = {};
        if(req.query.score.gt){
            query.score.$gt = Number(req.query.score.gt);
        }
        if(req.query.score.lt){
            query.score.$lt = Number(req.query.score.lt);
        }
        if(req.query.score.equals){
            query.score.$eq = Number(req.query.score.equals);
        }
    }



    const page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 20;

    if(limit > 100){
        limit = 100;
    }

    const startIndex = (page -1)*limit;
    const total = await Lead.countDocuments(query)
    const leads = await Lead.find(query)
                            .sort({ createdAt: -1 }) 
                            .limit(limit)
                            .skip(startIndex);
    res.status(200).json({
      success: true,
      data: leads,
      page: page,
      limit: limit,
      total: total,
      totalPages: Math.ceil(total / limit),
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
