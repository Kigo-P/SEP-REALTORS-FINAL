import './App1.css';
import NavMenu from './NavMenu';



function AboutUs() {
    return (
        <>
            <NavMenu />
            <div className="container mx-auto px-4 py-8 max-w-screen-xl">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    About SEP REALTORS
                </h1>

                <div className="tabs space-y-8">
                    {/* History Section */}
                    <div className="tab-content" data-value="history">
                        <div className="card mb-8 border border-gray-200 p-6 rounded-lg">
                            <div className="card-header">
                                <h2 className="text-2xl font-semibold">
                                    Our History
                                </h2>
                            </div>
                            <div className="card-content">
                                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                                    <img
                                        src="https://media.istockphoto.com/id/1175964604/photo/real-estate-houses-gold-logo-design-in-black-brick-wall-3d-rendering-illustration.jpg?b=1&s=612x612&w=0&k=20&c=jS9rGsfbwcOu6poJp3cIrW_OTo594-qNIkUSHyV2wFc="
                                        alt="Founding of SEP REALTORS"
                                        className="w-72 h-48 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="text-gray-600 leading-6">
                                            SEP REALTORS was founded in 1985 by Sarah E. Peterson, a visionary in the real estate industry. 
                                            What started as a small, family-owned business in downtown has grown into one of the most 
                                            respected real estate firms in the region.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <span className="inline-block bg-yellow-300 text-yellow-800 px-3 py-1 rounded-md font-medium text-sm">
                                        Est. 1985
                                    </span>
                                    <p className="text-gray-600 leading-6">
                                        Over the past four decades, we have helped thousands of families find their dream homes and assisted 
                                        countless investors in making smart property decisions.
                                    </p>
                                    <ul className="list-disc pl-6 text-gray-600 leading-6 space-y-2">
                                        <li>1995: Opening of our first branch office</li>
                                        <li>2005: Launch of our commercial real estate division</li>
                                        <li>2015: Expansion into property management services</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Mission Section */}
                    <div className="tab-content" data-value="mission">
                        <div className="card mb-8 border border-gray-200 p-6 rounded-lg">
                            <div className="card-header">
                                <h2 className="text-2xl font-semibold">Our Mission</h2>
                            </div>
                            <div className="card-content">
                                <img 
                                    src="https://images.pexels.com/photos/4427431/pexels-photo-4427431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                    alt="Team of SEP REALTORS professionals" 
                                    className="w-full h-64 md:w-96 md:h-64 rounded-lg object-cover mb-4"
                                />
                                <p className="text-gray-600 leading-6">
                                    At SEP REALTORS, our mission is to guide our clients through the complex world of real estate 
                                    with expertise, integrity, and personalized service. We are committed to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2 leading-6">
                                    <li>Providing unparalleled customer service and support throughout the entire real estate process</li>
                                    <li>Leveraging cutting-edge technology and market insights to give our clients a competitive edge</li>
                                    <li>Upholding the highest standards of professionalism and ethical conduct in all our dealings</li>
                                    <li>Contributing positively to the communities we serve through active involvement and giving back</li>
                                    <li>Continuously educating ourselves and our clients to make informed real estate decisions</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Our Vision Section */}
                    <div className="tab-content" data-value="vision">
                        <div className="card mb-8 border border-gray-200 p-6 rounded-lg">
                            <div className="card-header">
                                <h2 className="text-2xl font-semibold">Our Vision</h2>
                            </div>
                            <div className="card-content">
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="flex-1">
                                        <p className="text-gray-600 leading-6">
                                            At SEP REALTORS, we envision a future where every individual and family has access to their 
                                            ideal living space. We strive to be at the forefront of innovation in real estate, leveraging 
                                            technology and human expertise to create seamless, enjoyable property experiences.
                                        </p>
                                        <p className="mt-4 text-gray-600 leading-6">
                                            Our vision extends beyond just buying and selling properties. We aim to:
                                        </p>
                                        <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-2 leading-6">
                                            <li>Build sustainable communities</li>
                                            <li>Foster long-term relationships with our clients</li>
                                            <li>Set new standards for excellence in the real estate industry</li>
                                        </ul>
                                    </div>
                                    <img 
                                        src="https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=2048x2048&w=is&k=20&c=tdKe-wvhnPGrt8G632TO-1eiU0u75bTBcAfLuOBaG9A="
                                        alt="Modern cityscape"
                                        className="w-72 h-72 rounded-lg object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Team Section */}
                    <div className="tab-content" data-value="team">
                        <div className="card mb-8 border border-gray-200 p-6 rounded-lg">
                            <div className="card-header">
                                <h2 className="text-2xl font-semibold text-center">Our Team</h2>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex flex-col items-center">
                                    <img 
                                        src="https://images.pexels.com/photos/27022874/pexels-photo-27022874/free-photo-of-portrait-of-bald-man-in-elegant-suit-sitting-in-armchair.jpeg?auto=compress&cs=tinysrgb&w=600" 
                                        alt="Peter"
                                        className="w-full h-44 rounded-lg object-cover mb-2"
                                    />
                                    <h3 className="font-semibold mt-2 text-lg">Peter</h3>
                                    <p className="text-gray-600 text-sm">Founder, CEO</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <img 
                                        src="https://images.pexels.com/photos/5648043/pexels-photo-5648043.jpeg?auto=compress&cs=tinysrgb&w=600" 
                                        alt="James"
                                        className="w-full h-44 rounded-lg object-cover mb-2"
                                    />
                                    <h3 className="font-semibold mt-2 text-lg">James</h3>
                                    <p className="text-gray-600 text-sm">Co-founder, COO</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <img 
                                        src="https://images.pexels.com/photos/7841788/pexels-photo-7841788.jpeg?auto=compress&cs=tinysrgb&w=600" 
                                        alt="Emmanuel"
                                        className="w-full h-44 rounded-lg object-cover mb-2"
                                    />
                                    <h3 className="font-semibold mt-2 text-lg">Emmanuel</h3>
                                    <p className="text-gray-600 text-sm">Chief Marketing Officer</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <img 
                                        src="https://images.pexels.com/photos/4427431/pexels-photo-4427431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt="The A Team"
                                        className="w-full h-44 rounded-lg object-cover mb-2"
                                    />
                                    <h3 className="font-semibold mt-2 text-lg">The A Team</h3>
                                    <p className="text-gray-600 text-sm text-center">
                                        Agents, Secretaries, Customer Service, and other personnel
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
