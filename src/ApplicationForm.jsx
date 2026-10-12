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
            <form onSubmit={async function handleSubmit(event) {
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
                        const response = await fetch(`${import.meta.env.VITE_API_URL}/${props.editingId}`, {
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
                        const response = await fetch(import.meta.env.VITE_API_URL, {
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