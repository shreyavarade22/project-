import React, { useState } from "react";

// ==================== DOCTORS PAGE ====================
// This component manages doctor information and schedules
// Receptionists can view doctor details and availability

function Doctors() {
  // ==================== STATE ====================
  // Stores list of doctors
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Smith", specialization: "General Medicine", department: "General", phone: "9876543210", email: "john.smith@hospital.com", availability: "Mon-Fri", status: "Available" },
    { id: 2, name: "Dr. Sarah Johnson", specialization: "Cardiology", department: "Cardiology", phone: "9876543211", email: "sarah.johnson@hospital.com", availability: "Mon-Sat", status: "Available" },
    { id: 3, name: "Dr. Mike Williams", specialization: "Dental", department: "Dental", phone: "9876543212", email: "mike.williams@hospital.com", availability: "Tue-Sat", status: "On Leave" },
    { id: 4, name: "Dr. Emily Brown", specialization: "Neurology", department: "Neurology", phone: "9876543213", email: "emily.brown@hospital.com", availability: "Mon-Fri", status: "Available" },
    { id: 5, name: "Dr. David Lee", specialization: "Orthopedics", department: "Orthopedics", phone: "9876543214", email: "david.lee@hospital.com", availability: "Wed-Sun", status: "Available" },
    { id: 6, name: "Dr. Lisa Anderson", specialization: "Pediatrics", department: "Pediatrics", phone: "9876543215", email: "lisa.anderson@hospital.com", availability: "Mon-Fri", status: "Available" },
  ]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  // Filter by department
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // ==================== HELPER FUNCTIONS ====================
  // Get unique departments for filter dropdown
  const departments = ["All", ...new Set(doctors.map((d) => d.department))];

  // Filter doctors based on search and department
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "All" || doctor.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="doctors-page">
      {/* ==================== PAGE HEADER ==================== */}
      <div className="page-header">
        <h1>Doctors Management</h1>
        <button className="add-btn">+ Add New Doctor</button>
      </div>

      {/* ==================== SEARCH AND FILTER ==================== */}
      {/* Allows receptionist to search doctors and filter by department */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search doctors by name, specialization, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="filter-select"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept === "All" ? "All Departments" : dept}
            </option>
          ))}
        </select>
      </div>

      {/* ==================== DOCTORS GRID ==================== */}
      {/* Displays doctor cards in a responsive grid layout */}
      <div className="doctors-grid">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header">
              <div className="doctor-avatar">
                {doctor.name.split(" ").slice(1, 2)[0]?.charAt(0) || "D"}
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="specialization">{doctor.specialization}</p>
              </div>
              <span className={`status-indicator ${doctor.status.toLowerCase().replace(" ", "-")}`}>
                {doctor.status}
              </span>
            </div>
            <div className="doctor-details">
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{doctor.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Availability:</span>
                <span className="detail-value">{doctor.availability}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{doctor.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{doctor.email}</span>
              </div>
            </div>
            <div className="doctor-actions">
              <button className="view-btn">View Schedule</button>
              <button className="edit-btn">Edit</button>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== SUMMARY STATISTICS ==================== */}
      {/* Shows quick statistics about doctors */}
      <div className="summary-stats">
        <div className="summary-card">
          <h4>Total Doctors</h4>
          <p>{doctors.length}</p>
        </div>
        <div className="summary-card">
          <h4>Available Today</h4>
          <p>{doctors.filter((d) => d.status === "Available").length}</p>
        </div>
        <div className="summary-card">
          <h4>On Leave</h4>
          <p>{doctors.filter((d) => d.status === "On Leave").length}</p>
        </div>
        <div className="summary-card">
          <h4>Departments</h4>
          <p>{departments.length - 1}</p>
        </div>
      </div>
    </div>
  );
}

export default Doctors;

