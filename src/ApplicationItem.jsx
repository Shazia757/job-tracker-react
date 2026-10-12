function ApplicationItem(props) {
    return (
        <div>
            Company: {props.application.company}
            <br />
            Position: {props.application.position}
            <br />
            Status: {props.application.status}
            <br />
            <button onClick={() => { props.setEditingId(props.application.id) }}>Edit</button>
            <button onClick={async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/${props.application.id}`, { method: 'DELETE' });
                    if (!response.ok) {
                        throw new Error("Failed to delete application");
                    }
                    const remainingApplications = props.applications.filter(
                        (app) => app.id !== props.application.id
                    )
                    props.setApplications(remainingApplications)
                } catch (error) {
                    console.error(error)
                }


            }}>Delete</button>
        </div>
    )
}

export default ApplicationItem