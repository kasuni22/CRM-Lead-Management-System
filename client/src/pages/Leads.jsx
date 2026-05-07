import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import api from "../services/api";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    assignedTo: '',
    search: '',
  });

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads");
      setLeads(res.data);
      setFilteredLeads(res.data);
    } catch (error) {
      toast.error(error.message || 'Unable to load leads. Please try again.');
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await api.delete(`/leads/${id}`);
        toast.success('Lead deleted successfully');
        fetchLeads();
      } catch (error) {
        toast.error(error.message || 'Unable to delete lead. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    let filtered = leads;

    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }
    if (filters.source) {
      filtered = filtered.filter(lead => lead.source === filters.source);
    }
    if (filters.assignedTo) {
      filtered = filtered.filter(lead => lead.assignedTo === filters.assignedTo);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.company.toLowerCase().includes(searchLower)
      );
    }

    setFilteredLeads(filtered);
  }, [leads, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      source: '',
      assignedTo: '',
      search: '',
    });
  };

  return (
    <div>
      <h1 className="page-title">Leads</h1>

      <div className="filters-section">
        <input
          type="text"
          name="search"
          placeholder="Search by name, email, or company"
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />

        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
          <option value="Converted">Converted</option>
        </select>

        <select name="source" value={filters.source} onChange={handleFilterChange}>
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Social Media">Social Media</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Trade Show">Trade Show</option>
        </select>

        <input
          type="text"
          name="assignedTo"
          placeholder="Assigned To"
          value={filters.assignedTo}
          onChange={handleFilterChange}
          className="filter-input"
        />

        <button onClick={clearFilters} className="clear-filters-btn">Clear Filters</button>
      </div>

      <div className="leads-list">
        {filteredLeads.length === 0 ? (
          <div className="empty-state-card">
            {leads.length === 0 ? (
              <>
                <h2>No leads added yet</h2>
                <p>
                  Start building your pipeline by adding your first lead. Once added, you can
                  update status, assign ownership, and track deal value.
                </p>
                <Link to="/leads/add" className="form-button">
                  Add a new lead
                </Link>
              </>
            ) : (
              <>
                <h2>No leads match your filters</h2>
                <p>
                  Try clearing the filters or using a broader search term to find matching leads.
                </p>
                <button onClick={clearFilters} className="form-button">
                  Clear filters
                </button>
              </>
            )}
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div className="lead-card" key={lead._id}>
              <div className="lead-content">
                <h3 className="lead-name">{lead.name}</h3>
                <p className="lead-info">{lead.email} • {lead.company}</p>
                <span className={`lead-status ${lead.status.toLowerCase().replace(' ', '-')}`}>{lead.status}</span>
              </div>
              <div className="lead-actions">
                <Link to={`/leads/${lead._id}`}>View</Link>
                <Link to={`/leads/edit/${lead._id}`}>Edit</Link>
                <button onClick={() => deleteLead(lead._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}