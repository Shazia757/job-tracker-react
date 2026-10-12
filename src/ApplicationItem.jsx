function ApplicationItem(props) {
    const statusClass = `status-${props.application.status.toLowerCase()}`;

    return (
        <article className="application-item">
            <div className="application-details">
                <h3 className="application-company">
                    {props.application.company}
                </h3>

                <p className="application-position">
                    {props.application.position}
                </p>

                <span className={`status-badge ${statusClass}`}>
                    {props.application.status}
                </span>
            </div>

            <div className="application-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => props.setEditingId(props.application.id)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={async () => {
                        try {
                            const response = await fetch(
                                `${import.meta.env.VITE_API_URL}/api/applications/${props.application.id}`,
                                { method: "DELETE" }
                            );

                            if (!response.ok) {
                                throw new Error("Failed to delete application");
                            }

                            const remainingApplications = props.applications.filter(
                                (app) => app.id !== props.application.id
                            );

                            props.setApplications(remainingApplications);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    Delete
                </button>
            </div>
        </article>
    );
}

export default ApplicationItem;