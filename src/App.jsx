import './App.css'
import ApplicationForm from './ApplicationForm.jsx'
import ApplicationList from './ApplicationList.jsx'
import Header from './Header.jsx'
import { useState, useEffect } from 'react'

function App() {
  const [applications, setApplications] = useState([]);

  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {

    const fetchApplications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`);
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setApplications(data);

      } catch (error) {
        console.error(error)
      }
    }
    fetchApplications();
  }, [])

  return (

    <main className="app-container">
      <Header />
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Applications</div>
          <div className="stat-value">{applications.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Applied</div>
          <div className="stat-value">
            {applications.filter(app => app.status === "Applied").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Interviews</div>
          <div className="stat-value">
            {applications.filter(app => app.status === "Interview").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Rejected</div>
          <div className="stat-value">
            {applications.filter(app => app.status === "Rejected").length}
          </div>
        </div>
      </section>
      <section className="card">
        <h2 className="section-title">Manage Applications</h2>
        <ApplicationForm
          setApplications={setApplications}
          applications={applications}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      </section>
      <section>
        <ApplicationList applications={applications}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          editingId={editingId} setEditingId={setEditingId}
          setApplications={setApplications}
        />
      </section>
    </main>

  )

}

export default App
