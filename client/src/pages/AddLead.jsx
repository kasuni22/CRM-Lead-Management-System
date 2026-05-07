import { useState } from "react";
import { toast } from 'react-toastify';
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddLead() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "",
    source: "",
    assignedTo: "",
    dealValue: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/leads", formData);
      toast.success('Lead created successfully');
      navigate("/leads");
    } catch (error) {
      toast.error(error.message || 'Unable to create lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="lead-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add New Lead</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            className="form-input"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            className="form-input"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        <div className="form-group">
          <label>Source</label>
          <select
            name="source"
            className="form-input"
            value={formData.source}
            onChange={handleChange}
          >
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Trade Show">Trade Show</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            className="form-input"
            value={formData.assignedTo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Deal Value</label>
          <input
            type="number"
            name="dealValue"
            className="form-input"
            value={formData.dealValue}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Saving lead...' : 'Add Lead'}
        </button>
      </form>
    </div>
  );
}