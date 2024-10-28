import  { useState } from 'react';

const handleGoBack = () => {
    window.location.reload();
};

const UpdatePropertyForm = ({ property, onUpdateProperty }) => {
    const [formData, setFormData] = useState({
        title: property.title || '',
        location: property.location || '',
        price: parseInt(property.price),
        description: property.description || '',
        images: property.images || [],
        features: property.features || [],
        infrastructures: property.infrastructures || []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.price = parseInt(formData.price);
        const filteredImages = formData.images.filter(image => image !== '');
        formData.images = filteredImages;
        console.log('Submitting updated data:', formData);
        onUpdateProperty(property.id, formData);
    };

    return (
        <div style={styles.formContainer}>
            <button onClick={handleGoBack} style={styles.backButton}>
                Back
            </button>
            <h2 style={styles.heading}>Update Property</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
    
                <div style={styles.formGroup}>
                    <label style={styles.label}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>


                <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={styles.textarea}
                    />
                </div>


                <div style={styles.formGroup}>
                    <label style={styles.label}>Images</label>
                    <input
                        type="text"
                        name="images"
                        value={formData.images.join(', ')}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                images: e.target.value.split(',').map(img => img.trim())
                            });
                        }}
                        style={styles.input}
                    />
                </div>


                <div style={styles.formGroup}>
                    <label style={styles.label}>Features</label>
                    <input
                        type="text"
                        name="features"
                        value={formData.features.join(', ')}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                features: e.target.value.split(',').map(feature => feature.trim())
                            });
                        }}
                        style={styles.input}
                    />
                </div>


                <div style={styles.formGroup}>
                    <label style={styles.label}>Infrastructures</label>
                    <input
                        type="text"
                        name="infrastructures"
                        value={formData.infrastructures.join(', ')}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                infrastructures: e.target.value.split(',').map(infrastructure => infrastructure.trim())
                            });
                        }}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.submitButton}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};


const styles = {
    formContainer: {
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative', 
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center', 
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        minHeight: '100px',
    },
    backButton: {
        position: 'absolute',
        top: '10px',  
        left: '10px', 
        backgroundColor: '#f0f0f0',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '4px',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
    }
};

export default UpdatePropertyForm;
