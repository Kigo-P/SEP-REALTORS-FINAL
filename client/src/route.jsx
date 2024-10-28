import { Fragment } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import ErrorBoundary from './components/ErrorBoundary'
import Login from './components/Login'
import Home from './components/Home'
import Register from  './components/Register'
import RegisterAdmin from './components/RegisterAdmin';
import Listing from './components/Listing'
import OurServices from './components/OurServices';
import NewPropertyForm from './components/NewPropertyForm'
import NotFound from './components/NotFound'
import Property from './components/Property';
import AdminPage from './components/Admin'
import BuyerPage from './components/Buyer'
import ForgotPassword from './components/ForgotPassword';



const router = createBrowserRouter(
    createRoutesFromElements(
    <>
<Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
    <Route
    path="/login"
    element={<Login />}
    errorElement={<ErrorBoundary />}
    />
    <Route
    path="/about-us"
    element={<AboutUs />}
    errorElement={<ErrorBoundary />}
    />
    <Route
    path="/register"
    element={<Register />}
    errorElement={<ErrorBoundary />}
    />
    <Route
    path="/register-admin"
    element={<RegisterAdmin />}
    errorElement={<ErrorBoundary />}
    />
    <Route
    path="/contact-us"
    element={<ContactUs />}
    errorElement={<ErrorBoundary />}
    />

    <Route
    path="/our-services"
    element={<OurServices />}
    errorElement={<ErrorBoundary />}
    />

    <Route
    path="/listing"
    element={<Listing />}
    errorElement={<ErrorBoundary />}
    />
    <Route
    path="/property/:id"
    element={<Property />}
    errorElement={<ErrorBoundary />}
    />
    
    <Route
        path="/new-property-form"
        element={<NewPropertyForm />}
        errorElement={<ErrorBoundary />}
    />

    <Route
        path="/admin-page/:id"
        element={<AdminPage />}
        errorElement={<ErrorBoundary />}
    />

    <Route
        path="/buyer-page/:id"
        element={<BuyerPage />}
        errorElement={<ErrorBoundary />}
    />

    <Route
        path="/buyer-property"
        element={<BuyerPage />}
        errorElement={<ErrorBoundary />}
    />
    <Route
        path="/forgot-password"
        element={<ForgotPassword />}
        errorElement={<ErrorBoundary />}
    />
    <Route path="*" element={<NotFound />} errorElement={<ErrorBoundary />} />
    </>
    )
)

const Routes = () => {
return (
<Fragment>
    <RouterProvider router={router} />
</Fragment>
)
}

export default Routes
