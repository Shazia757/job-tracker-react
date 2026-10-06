import './App.css'
import ApplicationForm from './ApplicationForm.jsx'
import ApplicationList from './ApplicationList.jsx'
import Header from './Header.jsx'
import { useState, useEffect } from 'react'

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications")
    if (savedApplications) {
      const parsedApplications = JSON.parse(savedApplications)
      return parsedApplications

    }
    return []
  })
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState(null)
  
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications))
  }, [applications])

  return (
    <>
      <Header />
      <ApplicationForm
        setApplications={setApplications} applications={applications}
        editingId={editingId} setEditingId={setEditingId}

      />
      <ApplicationList applications={applications}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        editingId={editingId} setEditingId={setEditingId}
        setApplications={setApplications}
      />
    </>

  )

}

export default App
