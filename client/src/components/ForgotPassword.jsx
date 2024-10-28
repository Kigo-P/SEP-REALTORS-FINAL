import { useState } from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        window.history.back();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            newpassword: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            if (!values.newpassword) {
                errors.newpassword = 'Required';
            }
            if (values.password !== values.newpassword) {
                errors.newpassword = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await fetch(`https://sep-realators.onrender.com/user-by-email/${values.email}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({ password: values.password }),
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success('Password updated successfully!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    toast.error(data.message || 'Failed to update password.');
                }
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
                console.error('Error updating password:', error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div style={styles.container}>
            <ToastContainer />
            <button
                onClick={handleGoBack}
                style={styles.backButton}
            >
                Back
            </button>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Forgot Password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div style={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={styles.input}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div style={styles.error}>{formik.errors.email}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={styles.input}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div style={styles.error}>{formik.errors.password}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="password"
                            name="newpassword"
                            placeholder="Confirm new password"
                            value={formik.values.newpassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={styles.input}
                        />
                        {formik.touched.newpassword && formik.errors.newpassword && (
                            <div style={styles.error}>{formik.errors.newpassword}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={styles.submitButton}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7fafc',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#007bff',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
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
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
    },
};

export default ForgotPassword;
