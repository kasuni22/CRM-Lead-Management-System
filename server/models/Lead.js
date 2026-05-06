import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    createdBy: { type: String, default: 'User' },
  },
  { timestamps: true }
);

const leadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    phone: { type: String },
    company: { type: String },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost', 'Converted'],
      default: 'New',
    },
    source: { type: String },
    assignedTo: { type: String },
    dealValue: { type: Number, default: 0 },
    notes: [noteSchema],
  },
  { timestamps: true }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;