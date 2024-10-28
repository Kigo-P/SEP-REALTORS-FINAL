import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavMenu from './NavMenu';
import Footer from './Footer';

const Property = () => {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();


  const handleGoBack = () => {
    window.history.back();
};

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://sep-realtors-final.onrender.com/properties/${id}`,{
          method: "GET",
          headers:{
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
          body: JSON.stringify()
        }); 
        if (!res.ok) {
          throw new Error('Property not found');
        }
        const data = await res.json();
        setProperty(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <>
    <NavMenu />
    <button
                onClick={handleGoBack}
                style={styles.backButton}
            >
                Back
            </button>
    <div style={styles.container}>
      <div style={styles.gridContainer}>

        <div style={styles.imageContainer}>
          {property.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`${property.title}`} 
              style={styles.image}
            />
          ))}
        </div>


        <div style={styles.detailsContainer}>
          <div>
            <h1 style={styles.title}>{property.title}</h1>
            <p style={styles.price}>Ksh {property.price}</p>
            <p style={styles.location}><strong>Location:</strong> {property.location}</p>
            <p style={styles.description}><strong>Description:</strong> {property.description}</p>
          </div>

          <div style={styles.featuresSection}>
            <h3 style={styles.sectionTitle}>Features</h3>
            <ul style={styles.list}>
              {property.features.map((feature, index) => (
                <li key={index} style={styles.listItem}>{feature}</li>
              ))}
            </ul>
          </div>


          <div style={styles.infrastructuresSection}>
            <h3 style={styles.sectionTitle}>Infrastructures</h3>
            <ul style={styles.list}>
              {property.infrastructures.map((infrastructure, index) => (
                <li key={index} style={styles.listItem}>{infrastructure}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer style={styles.footer} />
    </>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    
    backgroundColor: '#f9f9f9',
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    justifyContent: 'center', 
    alignItems: 'center',
    flexGrow: 1,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  image: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  price: {
    fontSize: '1.8em',
    color: 'green',
    marginBottom: '10px',
  },
  location: {
    fontSize: '1.2em',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2em',
    color: '#333',
    marginBottom: '20px',
  },
  featuresSection: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  listItem: {
    fontSize: '1.1em',
    color: '#555',
  },
  infrastructuresSection: {
    marginBottom: '20px',
  },
  footer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '60px',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
  },
    backButton: {
    padding: '10px 20px',
    borderRadius: '8px', 
    border: '2px solid #333', 
    fontSize: '16px',
    color: '#333', 
    cursor: 'pointer', 
    backgroundColor: 'transparent', 
    transition: 'all 0.3s ease',  
  },
  backButtonHover: {
    color: '#fff',              
    backgroundColor: '#333',
     
  },
};

export default Property;
