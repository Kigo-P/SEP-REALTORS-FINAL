import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative pt-4 bg-[#0A1A2F] text-white h-64 flex flex-col overflow-hidden items-center">
      <div className="w-full max-w-4xl flex justify-between pl-64 px-4 ">
        
        <div className="text-left">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <div className="flex items-center mb-1 p-2">
            <span className="mr-2">📍</span>
            <span>The Nest Business Park</span>
          </div>
          <div className="flex items-center mb-1 p-2">
            <span className="mr-2">📞</span>
            <span>0745712570</span>
          </div>
          <div className="flex items-center p-2">
            <span className="mr-2">📧</span>
            <span>sep-realtors.co.ke</span>
          </div>
        </div>

        
        <div className="text-left">
          <h3 className="text-lg font-semibold">Related Links</h3>
          <ul className="list-none p-0">
            {["Find your home", "Search", "All Properties", "Recommended for you", "About Us", "Contact Us"].map((link, index) => (
              <li key={index} className="mb-1">
                <Link to="/" className="text-white no-underline hover:underline">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        
        <div className="bg-gray-200 text-gray-800 p-4 rounded text-center self-center ">
          <h4 className="mb-1">Contact Us:</h4>
          <p className="m-0 text-lg font-bold">0740 712 579</p>
        </div>
      </div>

      <div className="mt-4 text-center text-sm">
        Achieving your home ownership dream is easier when you work with SEP REALTORS.
      </div>

      <div className="mt-6 text-center text-xs bg-[#003366] w-full py-2">
        <p className="m-0">© SEP REALTORS - All rights reserved</p>
        <div className="mt-2 flex justify-center">
          <a href="/" className="text-white mx-2">
            <FaFacebookF />
          </a>
          <a href="/" className="text-white mx-2">
            <FaTwitter />
          </a>
          <a href="/" className="text-white mx-2">
            <FaWhatsapp />
          </a>
          <a href="/" className="text-white mx-2">
            <FaLinkedinIn />
          </a>
          <a href="/" className="text-white mx-2">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
