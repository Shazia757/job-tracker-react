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
            <button onClick={() => {
                const remainingApplications = props.applications.filter(
                    (app) => app.id !== props.application.id
                )
                props.setApplications(remainingApplications)

            }}>Delete</button>
        </div>
    )
}

export default ApplicationItem