import React, { useState } from "react";

const ManagerDashboard = () => {
  const [workers, setWorkers] = useState([
    { id: "CM001", name: "John Miner", role: "Miner", shift: "Morning", location: "Zone A", healthStatus: "Healthy", safetyCompliance: "Compliant" },
    { id: "CM002", name: "Jane Safety", role: "Safety Officer", shift: "Night", location: "Shaft 3", healthStatus: "Healthy", safetyCompliance: "Compliant" },
  ]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const filtered = workers.filter(
    w => w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase())
  );

  const openForm = (worker = {}) => {
    setFormData(worker);
    setEditing(!!worker.id);
    setShowForm(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      setWorkers(ws => ws.map(w => (w.id === formData.id ? formData : w)));
    } else {
      if (workers.find(w => w.id === formData.id)) return alert("ID must be unique");
      setWorkers(ws => [...ws, formData]);
    }
    setShowForm(false);
  };

  const deleteWorker = id => {
    if (window.confirm("Delete worker?")) {
      setWorkers(ws => ws.filter(w => w.id !== id));
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", backgroundColor: "#222", color: "#eee", minHeight: "100vh" }}>
      <h1>Coal Mine Manager Dashboard</h1>
      <input
        placeholder="Search by ID or name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 6, marginBottom: 12, width: 250 }}
      />
      <button onClick={() => openForm()} style={{ marginLeft: 10 }}>Add Worker</button>

      <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #555" }}>
            <th>ID</th><th>Name</th><th>Role</th><th>Shift</th><th>Location</th><th>Health</th><th>Safety</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? <tr><td colSpan={8} style={{ textAlign: "center" }}>No workers found.</td></tr> :
            filtered.map(w => (
              <tr key={w.id} style={{ borderBottom: "1px solid #555" }}>
                <td>{w.id}</td><td>{w.name}</td><td>{w.role}</td><td>{w.shift}</td><td>{w.location}</td><td>{w.healthStatus}</td><td>{w.safetyCompliance}</td>
                <td>
                  <button onClick={() => openForm(w)} style={{ marginRight: 5 }}>Edit</button>
                  <button onClick={() => deleteWorker(w.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: 20, background: "#333", padding: 15, borderRadius: 8 }}>
          <input
            placeholder="ID"
            required
            value={formData.id || ""}
            disabled={editing}
            onChange={e => setFormData({ ...formData, id: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 6 }}
          />
          <input
            placeholder="Name"
            required
            value={formData.name || ""}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 6 }}
          />
          <input
            placeholder="Role"
            value={formData.role || ""}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 6 }}
          />
          <input
            placeholder="Shift"
            value={formData.shift || ""}
            onChange={e => setFormData({ ...formData, shift: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 6 }}
          />
          <input
            placeholder="Location"
            value={formData.location || ""}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 6 }}
          />
          <input
            placeholder="Health Status"
            value={formData.healthStatus || ""}
            onChange={e => setFormData({ ...formData, healthStatus: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 6 }}
          />
          <input
            placeholder="Safety Compliance"
            value={formData.safetyCompliance || ""}
            onChange={e => setFormData({ ...formData, safetyCompliance: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 6 }}
          />

          <button type="submit" style={{ marginRight: 10 }}>{editing ? "Update" : "Add"}</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ManagerDashboard;
