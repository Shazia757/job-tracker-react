import { useState, useEffect } from "react"

function ApiPractice() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users")

                if (response.ok === false) {
                    throw new Error("Failed to load users.")
                }
                const data = await response.json()

                setError("")
                setUsers(data)
                setLoading(false)
            } catch (error) {
                setError("Failed to load users.")
                setLoading(false)
            }



        }
        fetchUsers()
    }, [])

    return (
        <>
            <h2>API Practice</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {users.map((user) => {
                return <p key={user.id}>{user.name}</p>
            })}

        </>
    )
}

export default ApiPractice