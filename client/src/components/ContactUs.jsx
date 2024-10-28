import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Footer from './Footer';
import NavMenu from './NavMenu';

function ContactUs() {
  const formik = useFormik({
    initialValues: {
      date: '',
      name: '',
      email: '',
      phone: '',
      hearAboutUs: '',
      apartmentType: '',
      message: '',
      agreeToComms: false
    },
    validationSchema: Yup.object({
      date: Yup.date().required('Required'),
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string().required('Required'),
      hearAboutUs: Yup.string().required('Required'),
      apartmentType: Yup.string().required('Required'),
      message: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      
      const payload = {
        date: values.date,
        name: values.name,
        email: values.email,
        contact: values.phone, 
        about_us: values.hearAboutUs, 
        looking_for: values.apartmentType, 
        message: values.message,
      };

      try {
       
        const response = await fetch('https://sep-realators.onrender.com/contact-uss', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success('Your information submitted successfully!');
          resetForm();
        } else {
          toast.error('Error submitting form');
        }
      } catch (error) {
        toast.error('Request failed, please try again.');
      }
    },
  });

  return (
    <>
      <NavMenu />
      <div style={{ padding: '40px 0', background: 'linear-gradient(to right, #1e3c72, #ff5f6d)', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ margin: '0', fontSize: '3rem' }}>Contact Us</h1>
      </div>
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px', color: '#ff5f6d' }}>Reach Out To Us</h2>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>All fields marked with * are mandatory</p>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Date*</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: formik.touched.date && formik.errors.date ? '1px solid red' : '1px solid #ddd' }}
            />
            {formik.touched.date && formik.errors.date ? <div style={{ color: 'red' }}>{formik.errors.date}</div> : null}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: formik.touched.name && formik.errors.name ? '1px solid red' : '1px solid #ddd' }}
            />
            {formik.touched.name && formik.errors.name ? <div style={{ color: 'red' }}>{formik.errors.name}</div> : null}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: formik.touched.email && formik.errors.email ? '1px solid red' : '1px solid #ddd' }}
              />
              {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
            </div>
            <div>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Phone number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: formik.touched.phone && formik.errors.phone ? '1px solid red' : '1px solid #ddd' }}
              />
              {formik.touched.phone && formik.errors.phone ? <div style={{ color: 'red' }}>{formik.errors.phone}</div> : null}
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="hearAboutUs" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>How Did You Hear About Us*</label>
            <select
              name="hearAboutUs"
              value={formik.values.hearAboutUs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: formik.touched.hearAboutUs && formik.errors.hearAboutUs ? '1px solid red' : '1px solid #ddd' }}
            >
              <option value="">Please Select</option>
              <option value="search">Search Engine</option>
              <option value="social">Social Media</option>
              <option value="friend">Friend Referral</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.hearAboutUs && formik.errors.hearAboutUs ? <div style={{ color: 'red' }}>{formik.errors.hearAboutUs}</div> : null}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="apartmentType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>What Type Of Property Are You Looking For*</label>
            <select
              name="apartmentType"
              value={formik.values.apartmentType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: formik.touched.apartmentType && formik.errors.apartmentType ? '1px solid red' : '1px solid #ddd' }}
            >
              
              <option value="Apartments">Apartments</option>
              <option value="Bedsitters">Bedsitters</option>
              <option value="Blocka of Flats">Block of Flats</option>
              <option value="Bungalow">Bungalow</option>
              <option value="House">House</option>
              <option value="Mansion">Mansion</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Studio Apartment">Studio Apartment</option>
              <option value="Villa">Villa</option>
            </select>
            {formik.touched.apartmentType && formik.errors.apartmentType ? <div style={{ color: 'red' }}>{formik.errors.apartmentType}</div> : null}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px', resize: 'vertical' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ backgroundColor: '#e94b4b', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', width: '100%' }}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <ToastContainer /> 
    </>
  );
}

export default ContactUs;
