function Header() {
    return (

        <header className="app-header">
            <div className="header-icon" aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="7" width="18" height="14" rx="2" />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M3 12h18M10 12v2h4v-2" />
                </svg>
            </div>
            <div className="header-content">
                <h1>Job Application Tracker</h1>

                <p>Track your applications and stay organized.</p>

            </div>
        </header>
    )
}

export default Header