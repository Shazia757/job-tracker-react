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
            <h2 className="section-title">
                {props.editingId !== null ? "Edit Job Application" : "Add Job Application"}
            </h2>
            <form className="application-form" onSubmit={async function handleSubmit(event) {
                event.preventDefault()
                const formData = new FormData(event.currentTarget);
                const company = formData.get("company").trim()

                const position = formData.get("position").trim()
                const status = formData.get("status")

                if (company === "") {
                    setCompanyError("Company name is required.")
                    return
                }

                if (position === "") {
                    setPositionError("Position is required.")
                    return
                }
                if (props.editingId !== null) {
                    try {
                        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${props.editingId}`, {
                            method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ company, position, status })
                        })
                        if (!response.ok) {
                            throw new Error("Failed to update application");

                        } const responseJson = await response.json();
                        props.setApplications(props.applications.map((application) => {
                            if (props.editingId === application.id) {
                                return responseJson
                            }

                            return application
                        }))
                        props.setEditingId(null)
                        setCompanyValue("")
                        setPositionValue("")
                        setStatusValue("Applied")
                        setCompanyError("")
                        setPositionError("")
                    }
                    catch (error) { console.error(error) }

                } else {
                    try {
                        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
                            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ company, position, status })
                        });
                        if (!response.ok) {
                            throw new Error("Unsuccessful");
                        }
                        const responseJson = await response.json();
                        props.setApplications([...props.applications, responseJson])
                        setCompanyValue("")
                        setPositionValue("")
                        setStatusValue("Applied")
                        setCompanyError("")
                        setPositionError("")
                    } catch (error) {
                        console.error(error)
                    }
                }

            }}>
                <div className="form-group">
                    <label htmlFor="company">Company</label>

                    <input id="company" name="company" placeholder="Enter company name" value={companyValue} onChange={(event) => {
                        setCompanyValue(event.target.value)
                        setCompanyError("")
                    }} />
                    {companyError && <p className="field-error">{companyError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="position">Position</label>


                    <input id="position" name="position" placeholder="Enter position" value={currentPosition} onChange={(event) => {
                        setPositionValue(event.target.value)
                        setPositionError("")
                    }} />
                    {positionError && <p className="field-error">{positionError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>

                    <select id="status" name="status" value={currentStatus} onChange={(event) => { setStatusValue(event.target.value) }}>
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Rejected</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" id="submit-button">
                        {props.editingId !== null ? "Save Changes" : "Add Application"}
                    </button>
                    {props.editingId !== null && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                props.setEditingId(null);
                                setCompanyValue("");
                                setPositionValue("");
                                setStatusValue("Applied");
                                setCompanyError("");
                                setPositionError("");
                            }}
                        >
                            Cancel
                        </button>
                    ) }
                </div>
                </form>
                </>
    )}


                export default ApplicationForm