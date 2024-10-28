import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import "./App3.css";

function NewPropertyForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    

    
    const initialValues = {
        title: '',
        description: '',
        price: '', 
        location: '',
        propertyType: '',
        features: [{ name: '' }],
        images: [{ name: '' }],
        infrastructures: [{ name: '' }],
    };

   
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().min(0, 'Price cannot be negative').required('Price is required'),
        location: Yup.string().required('Location is required'),
        propertyType: Yup.string().required('Property type is required'),
        features: Yup.array().of(
            Yup.object({ name: Yup.string().required('Feature is required') })
        ).required('At least one feature is required'),
        images: Yup.array().of(
            Yup.object({ name: Yup.string().url('Invalid URL').required('Image URL is required') })
        ).required('At least one image URL is required'),
        infrastructures: Yup.array().of(
            Yup.object({ name: Yup.string().required('Infrastructure is required') })
        ).required('At least one infrastructure is required'),
    });

    const onSubmit = (values) => {
        setIsSubmitting(true);

        const timer = setTimeout(() => {
            const dataToSubmit = {
                ...values,
                price: Number(values.price) 
            };

            fetch("https://sep-realtors-final.onrender.com/properties", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify(dataToSubmit),
            })
            .then((r) => {
                if (r.ok){
                    return r.json().then((data) => {
                        console.log("Property submitted:", data);
                        setIsSubmitting(false);
                        formik.resetForm();
                        window.location.reload()
                    })
                }
            })
            .catch((error) => {
                console.error("Error submitting property:", error);
                setIsSubmitting(false);
            });
        }, 2000);

        return () => clearTimeout(timer);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    
    const addFeatureField = () => formik.setFieldValue('features', [...formik.values.features, { name: '' }]);
    const addImageField = () => formik.setFieldValue('images', [...formik.values.images, { name: '' }]);
    const addInfrastructureField = () => formik.setFieldValue('infrastructures', [...formik.values.infrastructures, { name: '' }]);

    return (
        <div className="form-container">
            <h2>Property Listing Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title <span className="required-star">*</span></label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        {...formik.getFieldProps('title')}
                        
                    />
                    {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description <span className="required-star">*</span></label>
                    <textarea
                        id="description"
                        name="description"
                        {...formik.getFieldProps('description')}
                        
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price <span className="required-star">*</span></label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        {...formik.getFieldProps('price')}
                        min="0"
                       
                    />
                    {formik.touched.price && formik.errors.price ? <div>{formik.errors.price}</div> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location <span className="required-star">*</span></label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        {...formik.getFieldProps('location')}
                        
                    />
                    {formik.touched.location && formik.errors.location ? <div>{formik.errors.location}</div> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="propertyType">Property Type <span className="required-star">*</span></label>
                    <select
                        id="propertyType"
                        name="propertyType"
                        {...formik.getFieldProps('propertyType')}
                    
                    >
                        <option value="">Select type</option>
                        <option value="Apartments">Apartments</option>
                        <option value="Bedsitters">Bedsitters</option>
                        <option value="Block of Flats">Block of Flats</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="House">House</option>
                        <option value="Mansion">Mansion</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Studio Apartment">Studio Apartment</option>
                        <option value="Villa">Villa</option>
                    </select>
                    {formik.touched.propertyType && formik.errors.propertyType ? <div>{formik.errors.propertyType}</div> : null}
                </div>

                
                <div className="form-group">
                    <label>Features <span className="required-star">*</span></label>
                    {formik.values.features.map((feature, index) => (
                        <div key={index} className="feature-group">
                            <input
                                type="text"
                                name={`features.${index}.name`}
                                value={formik.values.features[index].name}
                                onChange={formik.handleChange}
                                placeholder="Feature Name"
                                
                            />
                            {formik.errors.features && formik.errors.features[index] ? <div>{formik.errors.features[index].name}</div> : null}
                        </div>
                    ))}
                    <button type="button" onClick={addFeatureField} style={{ marginTop: '10px', padding: '5px' }}>
                        + Add Feature
                    </button>
                </div>

                
                <div className="form-group">
                    <label>Add Image URLs <span className="required-star">*</span></label>
                    {formik.values.images.map((image, index) => (
                        <div key={index} className="image-url-group">
                            <input
                                type="url"
                                name={`images.${index}.name`}
                                value={formik.values.images[index].name}
                                onChange={formik.handleChange}
                                placeholder="Image URL"
                                
                            />
                            {formik.errors.images && formik.errors.images[index] ? <div>{formik.errors.images[index].name}</div> : null}
                        </div>
                    ))}
                    <button type="button" onClick={addImageField} style={{ marginTop: '10px', padding: '5px' }}>
                        + Add Image URL
                    </button>
                </div>

                
                <div className="form-group">
                    <label>Infrastructures <span className="required-star">*</span></label>
                    {formik.values.infrastructures.map((infra, index) => (
                        <div key={index} className="infrastructure-group">
                            <input
                                type="text"
                                name={`infrastructures.${index}.name`}
                                value={formik.values.infrastructures[index].name}
                                onChange={formik.handleChange}
                                placeholder="Infrastructure Name"
                            
                            />
                            {formik.errors.infrastructures && formik.errors.infrastructures[index] ? <div>{formik.errors.infrastructures[index].name}</div> : null}
                        </div>
                    ))}
                    <button type="button" onClick={addInfrastructureField} style={{ marginTop: '10px', padding: '5px' }}>
                        + Add Infrastructure
                    </button>
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Post Property'}
                </button>
            </form>
        </div>
    );
}

export default NewPropertyForm;
