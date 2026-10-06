import ApplicationItem from "./ApplicationItem"

function ApplicationList(props) {
    const filteredApplications = props.applications.filter(
        (application) =>
            (props.statusFilter === "All" ||
                application.status === props.statusFilter) &&
            (application.company.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
                application.position.toLowerCase().includes(props.searchTerm.toLowerCase()))
    )
    return (
        <>
            <h2>Applications: {props.applications.length}</h2>
            <h3>Applied: {props.applications.filter((application) => {
                return application.status.toLowerCase() === 'applied'
            }).length} | Interview: {props.applications.filter((application) => {
                return application.status.toLowerCase() === 'interview'
            }).length} | Rejected: {props.applications.filter((application) => {
                return application.status.toLowerCase() === 'rejected'
            }).length}</h3>
            <select onChange={(event) => { props.setStatusFilter(event.target.value) }} value={props.statusFilter}>
                <option>All</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Rejected</option>
            </select>
            <input placeholder="Search company or position" value={props.searchTerm} onChange={(event) => { props.setSearchTerm(event.target.value) }}></input>
            {props.applications.length === 0 && (
                <p>No applications yet. Add your first application!</p>
            )}

            {props.applications.length > 0 && filteredApplications.length === 0 && (
                <p>No applications match your search/filter.</p>
            )}
            {filteredApplications.map((application) => {
                return (
                    <ApplicationItem
                        key={application.id}
                        application={application}
                        applications={props.applications}
                        setEditingId={props.setEditingId}
                        setApplications={props.setApplications}
                    />)
            })}


        </>
    )
}
export default ApplicationList