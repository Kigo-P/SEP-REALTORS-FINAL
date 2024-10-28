import NavMenu from './NavMenu'
import Footer from './Footer'

function OurServices() {
const services = [
{
image: 'https://www.rubygroup.co.ke/uploads/img/pages/real-estate.webp',
title: 'Property Sales',
description: 'We help you find and buy the perfect property.',
},
{
image: 'https://valuehomzgroup.com/wp-content/uploads/2023/11/image-17.png',
title: 'Property Rentals',
description: 'Find the best rental properties that suit your needs.',
},
{
image: 'https://www.bankrate.com/2012/09/07142726/relocation-company.jpg',
title: 'Relocation Services',
description: 'We coordinate moving services and offer relocation tips',
},
{
image:
    'https://cloudinary.hbs.edu/hbsit/image/upload/s--pnRTY3lh--/f_auto,c_fill,h_375,w_750,/v20200101/228C2094E72B14B2BC1F1FA90E5E82C8.jpg',
title: 'Investment Advice',
description: 'Maximize your real estate returns with our expert investment advice and strategic insights.',
},
{
image: 'https://archistar.ai/wp-content/uploads/2020/09/M31-2-1.png',
title: 'Feasibility studies',
description: 'Evaluate project viability with our concise and insightful feasibility studies.',
},
{
image:
    'https://m.foolcdn.com/media/dubs/original_images/GettyImages-1221500644.jpg',
title: 'Property Letting and Management',
description: 'Streamline your property and letting management with our expert, hassle-free services.',
},
]


const testimonials = [
{
name: 'Alex Kinoti',
testimonial:
    'The team provided excellent service and helped me find the perfect home!',
},
{
name: 'Natalie Malwa',
testimonial:
    'finding our dream home was effortless. Their expertise and dedication truly set them apart. Highly recommend!"',
},
{
name: 'Angela Muringo',
testimonial:
    'Professional and efficient. They made the buying process smooth and stress-free.',
},
]

const realtors = [
{
name: 'Mercy Wanjiru',
image:
    'data:image/jpeg;base64,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',
bio: 'Mercy is a seasoned realtor with over 10 years of experience in the industry.',
},
{
name: 'James Onyango',
image:
    'https://i0.hippopx.com/photos/541/318/413/man-person-portrait-face-preview.jpg',
bio: 'James specializes in property management and is known for his attention to detail.',
},
{
name: 'Joy Chirchir',
image:
    'https://www.shutterstock.com/image-photo/portrait-real-black-african-woman-260nw-505353634.jpg',
bio: 'Joy has a deep understanding of the local market and provides personalized service.',
},
]


return (
<>
    <NavMenu />
    <div style={styles.container}>
    <h1 style={styles.title}>Our Services</h1>
    <div style={styles.cardsContainer}>
        {services.map((service, index) => (
        <div key={index} style={styles.card}>
            <img
            src={service.image}
            alt={service.title}
            style={styles.image}
            />
            <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <p style={styles.cardDescription}>{service.description}</p>
            </div>
        </div>
        ))}
    </div>

    <h2 style={styles.subTitle}>What Our Clients Say</h2>
    <div style={styles.testimonialsContainer}>
        {testimonials.map((testimonial, index) => (
        <div key={index} style={styles.testimonialCard}>
            <p style={styles.testimonialText}>"{testimonial.testimonial}"</p>
            <p style={styles.testimonialAuthor}>- {testimonial.name}</p>
        </div>
        ))}
    </div>

    <h2 style={styles.subTitle}>Meet Our Realtors</h2>
    <div style={styles.realtorsContainer}>
        {realtors.map((realtor, index) => (
        <div key={index} style={styles.realtorCard}>
            <img
            src={realtor.image}
            alt={realtor.name}
            style={styles.realtorImage}
            />
            <div style={styles.realtorContent}>
            <h3 style={styles.realtorName}>{realtor.name}</h3>
            <p style={styles.realtorBio}>{realtor.bio}</p>
            </div>
        </div>
        ))}
    </div>
    </div>
    <Footer/>
</>
)
}

const styles = {
container: {
padding: '40px',
maxWidth: '1200px',
margin: '0 auto',
textAlign: 'center',
},
title: {
fontSize: '2.5em',
fontWeight: 'bold',
marginBottom: '30px',
color: '#333',
},
subTitle: {
fontSize: '2em',
fontWeight: 'bold',
margin: '30px 0',
color: '#555',
},
cardsContainer: {
display: 'flex',
flexWrap: 'wrap',
justifyContent: 'center',
gap: '20px',
marginBottom: '40px',
},
card: {
maxWidth: '300px',
border: '1px solid #ddd',
borderRadius: '12px',
boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
overflow: 'hidden',
backgroundColor: '#fff',
transition: 'transform 0.3s ease, box-shadow 0.3s ease',
cursor: 'pointer',
':hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
},
},
image: {
width: '100%',
height: '200px',
objectFit: 'cover',
borderBottom: '1px solid #ddd',
},
cardContent: {
padding: '20px',
},
cardTitle: {
fontSize: '1.7em',
margin: '0',
color: '#333',
},
cardDescription: {
fontSize: '1em',
color: '#777',
margin: '10px 0 0',
},
testimonialsContainer: {
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
gap: '20px',
margin: '30px 0',
},
testimonialCard: {
maxWidth: '600px',
border: '1px solid #ddd',
borderRadius: '12px',
padding: '20px',
boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
backgroundColor: '#fff',
textAlign: 'center',
position: 'relative',
':before': {
    content: '""',
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '10px',
    borderStyle: 'solid',
    borderColor: '#fff transparent transparent transparent',
},
},
testimonialText: {
fontSize: '1.2em',
fontStyle: 'italic',
color: '#555',
margin: '0 0 10px',
},
testimonialAuthor: {
fontSize: '1em',
color: '#777',
margin: '0',
},
realtorsContainer: {
display: 'flex',
flexWrap: 'wrap',
justifyContent: 'center',
gap: '20px',
},
realtorCard: {
maxWidth: '300px',
border: '1px solid #ddd',
borderRadius: '12px',
boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
overflow: 'hidden',
backgroundColor: '#fff',
textAlign: 'center',
padding: '15px',
},
realtorImage: {
width: '100px',
height: '100px',
borderRadius: '50%',
objectFit: 'cover',
marginBottom: '10px',
},
realtorContent: {
padding: '10px',
},
realtorName: {
fontSize: '1.3em',
margin: '0 0 10px',
color: '#333',
},
realtorBio: {
fontSize: '1em',
color: '#666',
margin: '0',
},
}


export default OurServices
