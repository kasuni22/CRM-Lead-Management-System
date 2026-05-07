import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      const res = await api.get(`/leads/${id}`);
      setLead(res.data);
    };
    fetchLead();
  }, [id]);

  if (!lead) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="page-title">Lead Details</h1>
      <div className="lead-details">
        <div className="lead-info-card">
          <h2>{lead.name}</h2>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{lead.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone</span>
            <span className="info-value">{lead.phone || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Company</span>
            <span className="info-value">{lead.company}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="info-value">{lead.status}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Source</span>
            <span className="info-value">{lead.source || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Assigned To</span>
            <span className="info-value">{lead.assignedTo || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Deal Value</span>
            <span className="info-value">
              {lead.dealValue ? '$' + lead.dealValue.toLocaleString() : 'N/A'}
            </span>
          </div>
        </div>
        <div className="notes-card">
          <h3>Notes</h3>
          {lead.notes && lead.notes.length > 0 ? (
            <div className="notes-list">
              {lead.notes.map((note, index) => (
                <div key={index} className="note-item">
                  <p>{note.content}</p>
                  <div className="note-meta">
                    <span className="note-author">{note.createdBy}</span>
                    <span className="note-date">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <h4>No notes yet</h4>
              <p>
                This lead has no notes yet. Keep the team aligned by adding updates directly when
                you return to the edit page.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}