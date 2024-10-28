import React from 'react';

const Header = () => {
    return (
      <header style={styles.header}>
        <div style={styles.navLeft}>
          <h1 style={styles.logo}>SEP REALTORS</h1>
        </div>
        <nav style={styles.navRight}>
          <a href="#properties" style={styles.navLink}>Properties</a>
          <a href="#services" style={styles.navLink}>Our Services</a>
          <a href="#about" style={styles.navLink}>About Us</a>
          <a href="#contact" style={styles.navLink}>Contact Us</a>
          <button style={styles.button}>Register</button>
          <button style={styles.buttonOutline}>Login</button>
        </nav>
      </header>
    );
  };
  
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#0A1A2F',
      color: '#fff',
    },
    logo: {
      fontSize: '24px',
      margin: 0,
    },
    navRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #fff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };
  
  export default Header;
  

