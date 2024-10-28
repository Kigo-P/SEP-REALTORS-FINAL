import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavMenu() {
    const navigate = useNavigate();
    
    function handleLogout() {
    
        fetch(`https://sep-realtors-final.onrender.com/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify() 
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) { 
                localStorage.removeItem("access_token");
                localStorage.removeItem("user_id");
                navigate("/"); 
            } else {
                console.error("Failed to logout");
            }
        })
        .catch((error) => console.error("Error during logout:", error));
    }

    return (
        <>
            <header className="nav-header">
                <div>
                    <h1 className="logo">SEP REALTORS</h1>
                </div>
                <nav className="nav-links">
                    <ul className="nav-list">
                        <li>
                            <Link to="/" className="nav-item">Home</Link>
                        </li>
                        <li>
                            <Link to="/our-services" className="nav-item">Our Services</Link>
                        </li>
                        <li>
                            <Link to="/about-us" className="nav-item">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="nav-item">Contact Us</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout} className="nav-item">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="main-content">
            </div>
        </>
    );
}


const styles = `
.nav-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #0A1A2F;
    color: white;
    z-index: 1000;
    height: 80px;
}

.logo {
    font-size: 24px;
    margin: 0;
}

.nav-links {
    margin-left: auto;
}

.nav-list {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    color: white;
    font-size: 18px;
    text-decoration: none;
    transition: text-decoration 0.3s ease;
}

.nav-item:hover {
    text-decoration: underline;
}

.main-content {
    padding-top: 80px; /* Add top padding to prevent content overlap */
}
`;


const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default NavMenu;
