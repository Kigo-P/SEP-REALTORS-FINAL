import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ closeModal }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(values)
        });
        const data = await response.json();
        setLoading(false);

        if (data.user_data) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user_id", data.user_data.id);
          if (data.user_data.user_role === "admin") {
              navigate(`/admin-page/${localStorage.getItem("user_id")}`);
          } else if (data.user_data.user_role === "buyer") {
              navigate(`/buyer-page/${localStorage.getItem("user_id")}`);
          }
          toast.success("Login successful!");
        } else {
          toast.error("You are not a user");
        }
      } catch (error) {
        setLoading(false);
        setError('Something went wrong. Please try again.');
        toast.error('Something went wrong. Please try again.');
        console.error('Error logging in:', error);
      }
    },
  });

  return (
    <div style={styles.modal}>
      <ToastContainer /> 
      <div style={styles.modalContent}>
        <span style={styles.close} onClick={closeModal}>&times;</span>
        <h2 style={styles.modalTitle}>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              
              style={styles.input}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={styles.error}>{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            style={styles.submitButton}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.forgotPassword}>
          <a href="/forgot-password" style={styles.link}>Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  modal: {
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  close: {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  modalTitle: {
    textAlign: 'center',
    margin: '0 0 20px 0',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
  },
};

export default Login;
