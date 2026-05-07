import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "./EditLead.css";

export default function EditLead() {
  const { id } = useParams();
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

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await api.get(`/leads/${id}`);
        const leadData = res.data;

        setFormData({
          name: leadData.name || "",
          email: leadData.email || "",
          phone: leadData.phone || "",
          company: leadData.company || "",
          status: leadData.status || "",
          source: leadData.source || "",
          assignedTo: leadData.assignedTo || "",
          dealValue: leadData.dealValue || "",
        });

        setNotes(leadData.notes || []);
      } catch (error) {
        toast.error(error.message || "Unable to load lead details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/leads/${id}`, formData);
      toast.success("Lead updated successfully");
      navigate("/leads");
    } catch (error) {
      toast.error(error.message || "Unable to update lead.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!newNote.trim()) return;

    setAddingNote(true);

    try {
      await api.post(`/leads/${id}/notes`, {
        content: newNote,
      });

      const updatedLead = await api.get(`/leads/${id}`);

      setNotes(updatedLead.data.notes || []);
      setNewNote("");

      toast.success("Note added successfully");
    } catch (error) {
      toast.error(error.message || "Unable to add note.");
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      {/* LEFT SIDE */}
      <div className="edit-form-card">
        <h2 className="page-title">Edit Lead</h2>

        <form className="lead-form" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="form-button"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Lead"}
          </button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="notes-card">
        <h3 className="notes-title">Notes</h3>

        <form onSubmit={handleAddNote} className="add-note-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="note-textarea"
          />

          <button
            type="submit"
            className="note-button"
            disabled={addingNote}
          >
            {addingNote ? "Adding..." : "Add Note"}
          </button>
        </form>

        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-notes">
              No notes added yet.
            </div>
          ) : (
            notes.map((note, index) => (
              <div key={index} className="note-item">
                <p>{note.content}</p>

                <div className="note-meta">
                  <span>{note.createdBy || "Admin"}</span>
                  <span>
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}