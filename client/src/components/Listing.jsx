import { useState, useEffect } from 'react';
import SearchAndFilter from './SearchAndFilter';
import { useParams } from 'react-router-dom';


const Listing = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        propertyType: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState("")

    const params = useParams();
    const id = params.id

    useEffect(() => {

        fetch(`https://sep-realtors-final.onrender.com/users/${id}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error('Error fetching bought properties:', error));
    }, [id]);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://sep-realtors-final.onrender.com/properties",{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify()
        })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                }
                throw r;
            })
            .then((data) => {
                setProperties(data);
                setFilteredProperties(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);


    useEffect(() => {
        const filtered = properties.filter((property) => {
            const matchesLocation = filters.location
                ? property.location.toLowerCase().includes(filters.location.toLowerCase())
                : true;
            const matchesMinPrice = filters.minPrice ? property.price >= parseFloat(filters.minPrice) : true;
            const matchesMaxPrice = filters.maxPrice ? property.price <= parseFloat(filters.maxPrice) : true;
            const matchesPropertyType = filters.propertyType ? property.property_type.toLowerCase() === filters.propertyType.toLowerCase() : true;
            const matchesSearchTerm = property.title.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesPropertyType && matchesSearchTerm;
        });

        setFilteredProperties(filtered);
    }, [filters, properties, searchTerm]);

   
    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };
    
    const handleBuyProperty = (propertyId, userId) => {
        fetch(`https://sep-realtors-final.onrender.com/properties/${propertyId}/purchase`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({
                user_id: userId,
                property_id: propertyId,
                status: "pending"
            })
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            
            setProperties((prevProperties) =>
                prevProperties.map((property) => {
                    if (property.id === propertyId) {
                        return {
                            ...property,
                            purchase_requests: [...property.purchase_requests, {
                                status: "pending",
                                
                            }]
                        };
                    }
                    return property;
                })
            );
            window.location.reload()
        })
        .catch(error => {
            console.error('Error buying property:', error);
        });
    };
    
   
    return (
        <>

            <div className="listing-container">
                <SearchAndFilter filters={filters} updateFilters={updateFilters} onSearchChange={setSearchTerm} />
                <div className="property-list">
                    {!isLoading && properties.length === 0 ? (
                        <div className="no-properties">No Property Listing Yet!</div>
                    ) : !isLoading && filteredProperties.length === 0 ? (
                        <div className="no-properties">No Property Matching the Filter Yet!</div>
                    ) : (
                        <div className="property-grid">
                            {isLoading
                                ? Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="property-card loading">Loading...</div>
                                ))
                                : filteredProperties.map((item, i) => (
                                    <div key={i} className="property-card">
                                        <img
                                            src={`${item.images[0]}?id=${Math.floor(Math.random() * 11)}` || `https://picsum.photos/200/300?id=${item.id}`}
                                            alt=""
                                        />
                                        <div className="property-info">
                                            <h2><b>{item.title}</b></h2>
                                            <p className="price">Ksh {item.price}</p>
                                            <div className="features">
                                                <span><b>Location: </b>{item.location}</span>
                                            </div>
                                            <div className="features">
                                                <span><b>Property Type: </b>{item.property_type}</span>
                                            </div>
                                            
                                            <a href={`/property/${item.id}`} className="view-details">View Details</a>
                                            
                                            {
                                                item.purchase_requests.length > 0 ? (
                                                    <button 
                                                        className={`buy ${
                                                            item.purchase_requests[item.purchase_requests.length - 1].status === 'pending' ||
                                                            item.purchase_requests[item.purchase_requests.length - 1].status === 'approved' 
                                                            ? 'disabled:opacity-50' : ''
                                                        }`} 
                                                        onClick={() => {
                                                            if (item.purchase_requests[item.purchase_requests.length - 1].status === 'rejected') {
                                                                handleBuyProperty(item.id, user.id);
                                                            }
                                                            
                                                        }}
                                                        disabled={item.purchase_requests[item.purchase_requests.length - 1].status === 'pending' || 
                                                                item.purchase_requests[item.purchase_requests.length - 1].status === 'approved'}
                                                    >
                                                        {   
                                                            item.purchase_requests[item.purchase_requests.length - 1].status === 'pending' 
                                                                ? 'Pending' 
                                                                : item.purchase_requests[item.purchase_requests.length - 1].status === "approved" 
                                                                ? "Bought" 
                                                                : "Buy"
                                                        }
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className="buy" 
                                                        onClick={() => handleBuyProperty(item.id, user.id)}
                                                    >
                                                        Buy
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>




                <style>{`
                    .listing-container {
                        font-family: Arial, sans-serif;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 12px;
                    }

                    .property-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                        gap: 20px;
                    }

                    .property-card {
                        background-color: #fff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .property-card img {
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                    }

                    .property-info {
                        padding: 0.3rem;
                    }

                    .property-info h2 {
                        margin: 0 0 10px;
                        font-size: 18px;
                        color: #333;
                    }

                    .price {
                        font-size: 20px;
                        font-weight: bold;
                        color: #4CAF50;
                        margin-bottom: 10px;
                    }

                    .features {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        margin-bottom: 10px;
                        font-size: 14px;
                        color: #666;
                    }

                    .description {
                        font-size: 14px;
                        color: #666;
                        margin-bottom: 15px;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .buy {
                        display: inline-block;
                        padding: 8px 16px;
                        margin-left: 170px;
                        background-color: red;
                        color: white;
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 14px;
                        transition: background-color 0.3s;
                    }

                    .view-details {
                        display: inline-block;
                        padding: 8px 16px;
                        background-color: #4CAF50;
                        color: white;
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 14px;
                        transition: background-color 0.3s;
                    }

                    .view-details:hover {
                        background-color: #45a049;
                    }

                    .no-properties {
                        text-align: center;
                        color: #666;
                        font-size: 18px;
                        margin-top: 50px;
                    }

                    .loading {
                        height: 300px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #f0f0f0;
                        color: #666;
                    }

                    @media (max-width: 768px) {
                        .property-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
            </div>
        </>
    );
};

export default Listing;
