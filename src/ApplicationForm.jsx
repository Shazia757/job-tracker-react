import { useState, useEffect } from "react"

function ApplicationForm(props) {
    const [companyValue, setCompanyValue] = useState("")
    const [currentPosition, setPositionValue] = useState("")
    const [currentStatus, setStatusValue] = useState("Applied")
    const [companyError, setCompanyError] = useState("")
    const [positionError, setPositionError] = useState("")
    const applicationToEdit = props.applications.find((application) => application.id === props.editingId)

    useEffect(() => {

        if (applicationToEdit) {
            setCompanyValue(applicationToEdit.company)
            setPositionValue(applicationToEdit.position)
            setStatusValue(applicationToEdit.status)
            setCompanyError("")
            setPositionError("")
        }
    }, [props.editingId])
    return (
        <>
            <h2>Add Job Application</h2>
            <form onSubmit={function handleSubmit(event) {
                event.preventDefault()
                const formData = new FormData(event.currentTarget);
                const company = formData.get("company").trim()

                const position = formData.get("position").trim()
                const status = formData.get("status")
                const newId = props.applications.length === 0
                    ? 1
                    : Math.max(...props.applications.map((application) => application.id)) + 1
                if (company === "") {
                    setCompanyError("Company name is required.")
                    return
                }

                if (position === "") {
                    setPositionError("Position is required.")
                    return
                }
                if (props.editingId !== null) {
                    const updatedApplications = props.applications.map((application) => {
                        if (application.id === props.editingId) {
                            return {
                                id: application.id,
                                company: company,
                                position: position,
                                status: status,
                            }

                        }
                        return application
                    })
                    props.setApplications(updatedApplications)
                    props.setEditingId(null)
                } else {
                    const application = {

                        id: newId,
                        company: company,
                        position: position,
                        status: status,
                    }
                    props.setApplications(
                        [
                            ...props.applications,
                            application
                        ]
                    )
                }
                setCompanyValue("")
                setPositionValue("")
                setStatusValue("Applied")
                setCompanyError("")
                setPositionError("")
            }}>
                <label>Company</label>

                <input id="company" name="company" placeholder="Enter company name" value={companyValue} onChange={(event) => {
                    setCompanyValue(event.target.value)
                    setCompanyError("")
                }} /><br></br>
                <p>{companyError}</p>
                <label>Position</label>


                <input id="position" name="position" placeholder="Enter position" value={currentPosition} onChange={(event) => {
                    setPositionValue(event.target.value)
                    setPositionError("")
                }} /><br></br>
                <p>{positionError}</p>
                <label>Status</label>

                <select name="status" value={currentStatus} onChange={(event) => { setStatusValue(event.target.value) }}>
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                </select>
                <br></br>
                <button id="submit-button">
                    Add Application</button>

            </form>
        </>
    )

}


export default ApplicationForm