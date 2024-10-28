import { useState, useEffect } from 'react';
import NewPropertyForm from './NewPropertyForm';
import Footer from './Footer';
import NavMenu from './NavMenu'; 
import UpdatePropertyForm from './UpdatedPropertyForm';
import { useParams } from 'react-router-dom';
import Listing from './Listing';
import RegisterAdmin from './RegisterAdmin';
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [properties, setProperties] = useState([]);
    const [purchaseRequests, setPurchaseRequests] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [user, setUser] = useState(null);
    const [admins, setAdmins] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [disabledRequests, setDisabledRequests] = useState([]);

    const params = useParams();
    const id = params.id
    console.log(id)


    const navigate = useNavigate()
    

    useEffect(() => {
        fetch(`/users/${id}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error('Error fetching bought properties:', error));
    }, [id]);


    useEffect(() => {
        if (activeTab === 'boughtProperties') {
            fetch('/bought-properties',{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify()
            }) 
                .then(response => response.json())
                .then(data => setPurchaseRequests(data))
                .catch(error => console.error('Error fetching purchase requests:', error));

        } else if (activeTab === 'updateProperty' || activeTab === 'deleteProperty') {
            fetch('/properties', {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify()
            }) 
                .then(response => response.json())
                .then(data => {
                    setProperties(data)
                    
                })
                .catch(error => console.error('Error fetching properties:', error));
        } else if (activeTab === 'approvePurchases') {
            fetch('/purchases',{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify()
            }) 
                .then(response => response.json())
                .then(data => setPurchaseRequests(data))
                .catch(error => console.error('Error fetching purchase requests:', error));        
        }else if (activeTab === 'deleteAdmins'){
            fetch('/admins',{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify()
            })
                .then(response => response.json())
                .then(data => setAdmins(data))
                .catch(error => console.error('Error fetching admins:', error)); 
        }
        else if (activeTab === 'contactUs'){
            fetch('/contact-uss',{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify()
            })
                .then(response => response.json())
                .then(data => setContacts(data))
                .catch(error => console.error('Error fetching admins:', error)); 
        }
    }, [activeTab]);

    const handleUpdateProperty = (propertyId, updatedData) => {
        fetch(`/properties/${propertyId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedData),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
        })
        .then(response => response.json())
        .then(data => {
            setProperties(prevProperties => prevProperties.map(prop => 
                prop.id === propertyId ? { ...prop, ...updatedData } : prop
                
            ));
            setActiveTab('updateProperty');
            navigate(`/property/${propertyId}`)
          
        })
        .catch(error => console.error('Error updating property:', error));
    };

    const handleDeleteProperty = (propertyId) => {
        fetch(`/properties/${propertyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete property');
            }
            setProperties((prevProperties) => prevProperties.filter(property => property.id !== propertyId));
        })
        .catch(error => console.error('Error deleting property:', error));
    };


    function handleApproveRequest(id){

        setDisabledRequests((prev) => [...prev, id]);

        fetch(`/purchase-requests/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({status: "approved"})
        })
        .then((response)=>(response.json()))
        .then(data =>{
            console.log(data)
            
        })
        .catch((error) => {
            console.error('Error approving purchase:', error);
            alert('Failed to approve purchase.');
        });
    }
    

        function handleRejectRequest(id){

            setDisabledRequests((prev) => [...prev, id]);
            
            fetch(`/purchase-requests/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({status: "rejected"})
            })
            .then((response)=>(response.json()))
            .then(data =>{
                console.log(data)
                
            })
            .catch((error) => {
                console.error('Error approving purchase:', error);
                alert('Failed to approve purchase.');
            });
        }
    const handleDeleteAdmin = (id) => {
        fetch(`/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
        })
        .then((response) => {
            if (response.ok) {
                setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== id));
            } else {
                throw new Error('Failed to delete admin');
            }
            setActiveTab('deleteAdmins');
            
        })
        .catch(error => console.error('Error deleting admin:', error));
    };
    

    const renderContent = () => {
        if (!user) {
            return <div>Loading...</div>;  
        }
    
        if (activeTab === 'dashboard') {
            return  <div className="p-4">
            <h1 className="text-2xl mb-4">{`Welcome, ${user.first_name} ${user.last_name}!`}</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">All Properties</h2>
                <Listing />
            </div>
        </div>
        }else if (activeTab === 'postProperty') {
            return (
                <div>
                    <NewPropertyForm />
                </div>
            );
        } else if (activeTab === 'updateProperty') {
            if (selectedProperty) {
                return (
                    <UpdatePropertyForm
                        property={selectedProperty}
                        onUpdateProperty={handleUpdateProperty}
                    />
                );
            }
            return (
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Update Property</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {properties.map((property) => (
                            <div 
                                key={property.id} 
                                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200"
                            >
                                <img
                                    src={`${property.images[0]}?id=${Math.floor(Math.random() * 11)}` || `https://picsum.photos/200/300?id=${property.id}`}
                                    alt={property.title}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                                <p className="text-gray-600"><strong>Location: </strong>{property.location}</p>
                                <p className="text-gray-800 "><strong>Price: </strong>Ksh {property.price}</p>
                                <p className="text-gray-700 mb-4"><strong>Property Type: </strong>{property.property_type}</p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => {
                                            setSelectedProperty(property);
                                            setActiveTab('updateProperty');
                                        }}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Update Property
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === 'deleteProperty') {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Delete Property</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {properties.map((property) => (
                            <div 
                                key={property.id}
                                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200"
                            >
                                <img
                                    src={`${property.images[0]}?id=${Math.floor(Math.random() * 11)}` || `https://picsum.photos/200/300?id=${property.id}`}
                                    alt={property.title}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                                <p className="text-gray-600"><strong>Location: </strong> {property.location}</p>
                                <p className="text-gray-800 "><strong>Price: </strong>Ksh {property.price}</p>
                                <p className="text-gray-700 mb-4"><strong>Property Type: </strong>{property.property_type}</p>
                                <div className="mt-4">
                                    <button 
                                        onClick={() => handleDeleteProperty(property.id)} 
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete Property
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === 'addAdmin') {
            return (
                <div>
                    <RegisterAdmin onClose={() => setActiveTab('deleteAdmins')} setActiveTab={setActiveTab} />
                </div>
            );
        }else if (activeTab === 'deleteAdmins') {
    return (
<div>
{console.log(admins)}
{admins.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
            <div 
                key={admin.id} 
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {admin.first_name} {admin.last_name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                        <strong>Email: </strong>{admin.email}
                    </p>
                    <p className="text-gray-600 mb-4">
                        <strong>Contact: </strong>{admin.contact}
                    </p>
                    <button 
                        onClick={() => handleDeleteAdmin(admin.id)} 
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition w-full"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>
) : (
    <p>No admins available</p>
)}

</div>
    );
    }else if (activeTab === 'approvePurchases') {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Approve Purchases</h2>
                    {purchaseRequests.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {purchaseRequests.map((request) => (
                                <div key={request.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200">
                                    <img
                                        src={request.property.images[0]?.name}
                                        alt={request.property.title}
                                        className="w-full h-48 object-cover rounded mb-4"
                                    />
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{request.property.title}</h3>
                                    <p className="text-gray-600"><strong>Property Location: </strong>{request.property.location}</p>
                                    <p className="text-gray-600"><strong>Price: </strong>Ksh {request.property.price}</p><br/>
                                    <h3><strong>Buyer Details: </strong></h3>
                                    <p className="text-gray-600">Name: {`${request.buyer.user.first_name} ${request.buyer.user.last_name}`}</p>
                                    <p className="text-gray-600">Email: {request.buyer.email}</p>
                                    <p className="text-gray-600">Contact: {request.buyer.user.contact}</p>
                                    <div className="mt-4">
                                    <button 
                                        onClick={() => handleApproveRequest(request.id)} 
                                        className={`px-4 py-2 rounded mr-2 
                                            ${disabledRequests.includes(request.id) 
                                                ? "bg-green-500 text-white opacity-50 cursor-not-allowed" 
                                                : "bg-green-500 text-white hover:bg-green-600"}`
                                        }
                                        disabled={disabledRequests.includes(request.id)}
                                    >
                                        Approve
                                    </button>
                                        <button 
                                            onClick={() => handleRejectRequest(request.id)} 
                                            className={`px-4 py-2 rounded 
                                                ${disabledRequests.includes(request.id) 
                                                    ? "bg-red-500 text-white opacity-50 cursor-not-allowed" 
                                                    : "bg-red-500 text-white hover:bg-red-600"}`
                                            }
                                            disabled={disabledRequests.includes(request.id)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No pending purchase requests.</p>
                    )}
                </div>
            );
        }
        else if (activeTab === 'boughtProperties') {
            return (
                <div>
                <h2 className="text-2xl font-bold mb-4">Bought Properties</h2>
                {purchaseRequests.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {purchaseRequests.map((request) => (
                            <div
                                key={request.id}
                                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200"
                            >
                                <img
                                    src={request.property.images[0]?.name}
                                    alt={request.property.title}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{request.property.title}</h3>
                                <p className="text-gray-600"><strong>Property Location: </strong>{request.property.location}</p>
                                <p className="text-gray-600"><strong>Price: </strong>Ksh {request.property.price}</p><br/>
                                <h3><strong>Buyer Details: </strong></h3>
                                <p className="text-gray-600">Name: {`${request.buyer.user.first_name} ${request.buyer.user.last_name}`}</p>
                                <p className="text-gray-600">Email: {request.buyer.email}</p>
                                <p className="text-gray-600">Contact: {request.buyer.user.contact}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No bought properties available.</p>
                )}
            </div>
            );
        }else if (activeTab === 'contactUs') {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contact Us Information</h2>
                    {contacts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{contact.name}</h3>
                            <p className="text-gray-600"><strong>Date:</strong> {contact.date}</p>
                            <p className="text-gray-600"><strong>Email:</strong> {contact.email}</p>
                            <p className="text-gray-600"><strong>Contact:</strong> {contact.contact}</p>
                            <p className="text-gray-600"><strong>Looking For:</strong> {contact.looking_for}</p>
                            <p className="text-gray-600"><strong>Message:</strong> {contact.message}</p>
                            <p className="text-gray-600"><strong>How Did You Hear About Us:</strong> {contact.about_us}</p>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p>No contact information available.</p>
                    )}
                </div>
            );
        }               
        return <div><h2>Welcome, {user.first_name}!</h2></div>;
    };

    return (
        <>
            <NavMenu />
            
            <div className="flex flex-col h-screen ">
                <div className="flex flex-1">
                    <div className="w-64 bg-gray-800 text-white p-4">
                        <ul className="space-y-4">
                            <li 
                                onClick={() => setActiveTab('dashboard')}
                                className={`cursor-pointer py-2 ${activeTab === 'dashboard' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Dashboard
                            </li>
                            <li 
                                onClick={() => setActiveTab('postProperty')}
                                className={`cursor-pointer py-2 ${activeTab === 'postProperty' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Post Property
                            </li>
                            <li 
                                onClick={() => setActiveTab('updateProperty')}
                                className={`cursor-pointer py-2 ${activeTab === 'updateProperty' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Update Property
                            </li>
                            <li 
                                onClick={() => setActiveTab('deleteProperty')}
                                className={`cursor-pointer py-2 ${activeTab === 'deleteProperty' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Delete Property
                            </li>
                            <li 
                                onClick={() => setActiveTab('addAdmin')}
                                className={`cursor-pointer py-2 ${activeTab === 'addAdmin' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Add Admin
                            </li>
                            <li 
                                onClick={() => setActiveTab('deleteAdmins')}
                                className={`cursor-pointer py-2 ${activeTab === 'deleteAdmins' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Delete Admin
                            </li>
                            <li 
                                onClick={() => setActiveTab('approvePurchases')}
                                className={`cursor-pointer py-2 ${activeTab === 'approvePurchases' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Approve Purchases
                            </li>
                            <li 
                                onClick={() => setActiveTab('boughtProperties')}
                                className={`cursor-pointer py-2 ${activeTab === 'boughtProperties' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Bought Properties
                            </li>
                            <li 
                                onClick={() => setActiveTab('contactUs')}
                                className={`cursor-pointer py-2 ${activeTab === 'contactUs' ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-yellow-300'}`}
                            >
                                Contact Us Information
                            </li>


                        </ul>
                    </div>
                    <div className="flex-1 p-6">
                        {renderContent()}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AdminPage;
