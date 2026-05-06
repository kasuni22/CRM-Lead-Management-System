import Lead from '../models/Lead.js';

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
export const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
export const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, company, status, source, assignedTo, dealValue } = req.body;

    if (!name || !email) {
      res.status(400);
      throw new Error('Name and email are required');
    }

    const lead = new Lead({
      name,
      email,
      phone,
      company,
      status,
      source,
      assignedTo,
      dealValue: dealValue ? Number(dealValue) : 0,
      notes: [],
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
  } catch (error) {
    next(error);
  }
};

// @desc    Get lead by ID
// @route   GET /api/leads/:id
// @access  Private
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (lead) {
      res.json(lead);
    } else {
      res.status(404);
      throw new Error('Lead not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
export const updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      lead.name = req.body.name ?? lead.name;
      lead.email = req.body.email ?? lead.email;
      lead.phone = req.body.phone ?? lead.phone;
      lead.company = req.body.company ?? lead.company;
      lead.status = req.body.status ?? lead.status;
      lead.source = req.body.source ?? lead.source;
      lead.assignedTo = req.body.assignedTo ?? lead.assignedTo;
      lead.dealValue = req.body.dealValue !== undefined ? Number(req.body.dealValue) : lead.dealValue;
      if (req.body.notes !== undefined) lead.notes = req.body.notes;

      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404);
      throw new Error('Lead not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (lead) {
      await lead.deleteOne();
      res.json({ message: 'Lead removed' });
    } else {
      res.status(404);
      throw new Error('Lead not found');
    }
  } catch (error) {
    next(error);
  }
};