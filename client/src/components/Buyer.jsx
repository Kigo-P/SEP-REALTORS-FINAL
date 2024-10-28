import { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import Footer from './Footer'; 
import { useParams } from 'react-router-dom';
import Listing from './Listing';

const BuyerPage = () => {
    const [boughtProperties, setBoughtProperties] = useState([]);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState("");

    const params = useParams();
    const id = params.id;
    console.log(id);
    
    useEffect(() => {
        
        fetch(`https://sep-realators.onrender.com/purchase-requests/${id}`,{
            method: "GET",
            headers:{
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify()
          })
            .then((response) => response.json())
            .then((data) => setBoughtProperties(data))
            .catch((error) => console.error('Error fetching bought properties:', error));
        
        fetch(`https://sep-realators.onrender.com/users/${id}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error('Error fetching user:', error));
    }, [id]);


    const renderContent = () => {
        if (activeTab === 'dashboard') {
            return (
                <>
                    <h1 style={styles.welcomeText}>{`Welcome, ${user.first_name} ${user.last_name}!`}</h1>
                    <div style={styles.propertiesContainer}>
                        <h2 style={styles.propertiesTitle}>All Properties</h2>
                        <Listing />
                    </div>
                </>
            );
        } else if (activeTab === 'postProperty') {
            console.log(boughtProperties);
            return (
                <div>
                    <h2 style={styles.propertiesTitle}>Bought Properties</h2>
                    <div style={styles.propertiesGrid}>
                        {boughtProperties.length > 0 ? (
                            boughtProperties.map((property) => {
                                const imageUrl = property.property.images[0]?.name; 

                                return (
                                    <div key={property.id} style={styles.propertyCard}>
                                        <img 
                                            src={imageUrl || property.imageUrl} 
                                            alt={property.property.title || "Property Image"} 
                                            style={styles.propertyImage} 
                                        />
                                        <div style={styles.propertyDetails}>
                                            <h3 style={styles.propertyTitle}>{property.property.title || "No Title"}</h3>
                                            <p><strong>Location: </strong> {property.property.location || "No Location"}</p>
                                            <p><strong>Price: </strong>  Ksh {property.property.price || "0.00"}</p>
                                            <p><strong>Property Type: </strong> {property.property.property_type || "No property type"}</p>
                                            <p style={{...styles.propertyStatus, color: property.status === 'approved' ? 'green' : 'red'}}>
                                                Status: {property.status ? property.status.charAt(0).toUpperCase() + property.status.slice(1) : "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No properties bought yet.</p>
                        )}
                    </div>
                </div>
            );
        } else {
            return <p>Select a tab to see the content.</p>;
        }
    };

    return (
        <div style={styles.container}>
            <NavMenu />
            <div style={styles.content}>
                <div style={styles.sidebar}>
                    <ul>
                        <li 
                            style={{
                                ...styles.tabItem,
                                ...(activeTab === 'dashboard' ? styles.activeTab : styles.inactiveTab)
                            }} 
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Dashboard
                        </li>
                        <li 
                            style={{
                                ...styles.tabItem,
                                ...(activeTab === 'postProperty' ? styles.activeTab : styles.inactiveTab)
                            }} 
                            onClick={() => setActiveTab('postProperty')}
                        >
                            List of Bought Properties
                        </li>
                    </ul>
                </div>
                <div style={styles.mainContent}>
                    {renderContent()}
                </div>
            </div>
            <Footer /> 
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        
    },
    content: {
        display: 'flex',
        flex: 1,
    },
    sidebar: {
        width: '256px',
        backgroundColor: '#2D3748', 
        color: '#FFFFFF', 
        padding: '1.25rem', 
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh', 
        overflowY: 'auto', 
        marginTop: "80px"
    },
    tabItem: {
        cursor: 'pointer',
        padding: '0.75rem', 
        borderRadius: '0.375rem', 
        marginBottom: '0.5rem', 
    },
    activeTab: {
        backgroundColor: '#2D3748', 
        color: '#FBBF24', 
    },
    inactiveTab: {
        '&:hover': {
            backgroundColor: '#2D3748', 
            color: '#FBBF24', 
        },
    },
    mainContent: {
        flex: 1,
        marginLeft: '256px', 
        padding: '1.25rem', 
    },
    welcomeText: {
        fontSize: '1.5rem', 
        marginBottom: '1rem', 
    },
    propertiesContainer: {
        backgroundColor: '#FFFFFF', 
        padding: '1rem', 
        borderRadius: '0.375rem', 
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', 
    },
    propertiesTitle: {
        fontSize: '1.25rem', 
        fontWeight: '600',
    },
    propertiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
    },
    propertyCard: {
        backgroundColor: '#FFF',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    propertyImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '0.375rem',
    },
    propertyDetails: {
        marginTop: '0.75rem',
    },
    propertyTitle: {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    },
    propertyStatus: {
        marginTop: '0.25rem', 
    },
};

export default BuyerPage;
