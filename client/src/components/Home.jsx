import { useState } from 'react';
import Footer from './Footer';
import ImageSrc from './Images/pexels-robertkso-20296315.jpg'; 
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <>
      <div style={styles.container}>
        <main style={styles.mainContent}>
          <div style={styles.imageContainer}>
            <img
              src={ImageSrc}
              alt="Modern cityscape with tall buildings"
              style={styles.image}
            />
              
            <div style={styles.overlay}>
            <h1 style={styles.view}>SEP REALTORS</h1>
              <h1 style={styles.headline}>Find Your Dream Home</h1>
              <p style={styles.subheadline}>
                "Home is where love resides, memories are created, friends always belong, and laughter never ends."
              </p>
              <div style={styles.navRight}>
                <button style={styles.buttonOutline} onClick={handleLoginClick}>
                  Login
                </button>
                <button style={styles.buttonOutline} onClick={handleRegisterClick}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </main>
        {showLoginModal && <Login closeModal={closeModal} />} 
        {showRegisterModal && <Register onClose={closeModal} />}
        <ToastContainer />
        <Footer />
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '800px',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  view: {
    fontSize: '5rem',
    fontWeight: 'bold',
    color: '#FFD701',
  
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  headline: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: 0,
  },
  subheadline: {
    fontSize: '18px',
    marginTop: '10px',
    maxWidth: '600px',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
};

export default Home;
