import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

function RegisterAdmin({ onClose, setActiveTab }) {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            contact: '',
            user_role: 'admin',
        },
        validate: (values) => {
            const errors = {};
            if (!values.firstname) errors.firstname = 'First name is required';
            if (!values.lastname) errors.lastname = 'Last name is required';
            if (!values.email) errors.email = 'Email is required';
            if (!values.password) errors.password = 'Password is required';
            if (!values.contact) errors.contact = 'Contact is required';
            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);

            try {
                const response = await fetch('https://sep-realtors-final.onrender.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    },
                    body: JSON.stringify({
                        first_name: values.firstname,
                        last_name: values.lastname,
                        email: values.email,
                        password: values.password,
                        contact: values.contact,
                        user_role: 'admin',
                    }),
                });

                const data = await response.json();
                setLoading(false);

                if (response.ok) {
                    toast.success(`Registration Successful! Redirecting to Admin List...`);
                    formik.resetForm();


                    setActiveTab('deleteAdmins');
                    
                    setTimeout(() => {
                        onClose();
                    }, 1000); 
                } else {
                    toast.error(data.error || 'Registration failed. Please try again.');
                }
            } catch (error) {
                setLoading(false);
                toast.error('Something went wrong. Please try again.');
                console.error('Error registering:', error);
            }
        },
    });

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContainer}>
                <h2 style={styles.title}>Register Admin</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            style={styles.input}
                        />
                        {formik.errors.firstname && (
                            <div style={styles.errorText}>{formik.errors.firstname}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            style={styles.input}
                        />
                        {formik.errors.lastname && (
                            <div style={styles.errorText}>{formik.errors.lastname}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            style={styles.input}
                        />
                        {formik.errors.email && (
                            <div style={styles.errorText}>{formik.errors.email}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            style={styles.input}
                        />
                        {formik.errors.password && (
                            <div style={styles.errorText}>{formik.errors.password}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact"
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            style={styles.input}
                        />
                        {formik.errors.contact && (
                            <div style={styles.errorText}>{formik.errors.contact}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={styles.submitButton}
                    >
                        {loading ? 'Registering...' : 'Register Admin'}
                    </button>
                </form>

                <button onClick={onClose} style={styles.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
}

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '400px',
        position: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#4a5568', 
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        outline: 'none',
        transition: 'border 0.3s',
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff', 
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    closeButton: {
        marginTop: '10px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#007bff', 
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    errorText: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
};

export default RegisterAdmin;
