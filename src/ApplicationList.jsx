import ApplicationItem from "./ApplicationItem";

function ApplicationList(props) {
    const filteredApplications = props.applications.filter(
        (application) =>
            (props.statusFilter === "All" ||
                application.status === props.statusFilter) &&
            (application.company.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
                application.position.toLowerCase().includes(props.searchTerm.toLowerCase()))
    );

    return (
        <section className="applications-section">
            <div className="applications-header">
                <div>
                    <h2 className="section-title">Your Applications</h2>
                    <p className="applications-subtitle">
                        Manage and track your job search progress.
                    </p>
                </div>

                <span className="application-count">
                    {props.applications.length} total
                </span>
            </div>

            <div className="application-controls">
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search company or position..."
                    aria-label="Search company or position"
                    value={props.searchTerm}
                    onChange={(event) =>
                        props.setSearchTerm(event.target.value)
                    }
                />

                <select
                    className="filter-select"
                    aria-label="Filter applications by status"
                    value={props.statusFilter}
                    onChange={(event) =>
                        props.setStatusFilter(event.target.value)
                    }
                >
                    <option>All</option>
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                </select>
            </div>

            {props.applications.length === 0 && (
                <div className="empty-state">
                    <h3>No applications yet</h3>
                    <p>
                        Add your first application to start tracking your job search.
                    </p>
                </div>
            )}

            {props.applications.length > 0 &&
                filteredApplications.length === 0 && (
                    <div className="empty-state">
                        <h3>No matching applications</h3>
                        <p>
                            Try a different search term or status filter.
                        </p>
                    </div>
                )}

            {filteredApplications.length > 0 && (
                <div className="application-list">
                    {filteredApplications.map((application) => (
                        <ApplicationItem
                            key={application.id}
                            application={application}
                            applications={props.applications}
                            setEditingId={props.setEditingId}
                            setApplications={props.setApplications}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ApplicationList;