import React, { useState } from 'react';
import { FaSatelliteDish, FaBrain, FaMobileAlt } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom'; // Ensure Link is imported

function LandingPage() {
    const [soilMoisture, setSoilMoisture] = useState('');
    const [temperature, setTemperature] = useState('');
    const [prediction, setPrediction] = useState('');
    const navigate = useNavigate();
    const [contactName, setContactName] = useState(''); // State for name input
    const [contactEmail, setContactEmail] = useState(''); // State for email input
    const [contactMessage, setContactMessage] = useState(''); // State for message input

    const handleMoistureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoilMoisture(event.target.value);
    };

    const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemperature(event.target.value);
    };

    const handleGetPrediction = () => {
        if (soilMoisture && temperature) {
            const moistureLevel = parseFloat(soilMoisture);
            const temp = parseFloat(temperature);
            let predictedYield = Math.random() * 20;
            if (moistureLevel > 60) predictedYield *= 1.1;
            if (temp > 20 && temp < 30) predictedYield *= 1.08;
            setPrediction(`AI Estimated Yield: ${predictedYield.toFixed(2)} tons/hectare`);
        } else {
            setPrediction('Enter soil moisture and temperature.');
        }
    };

    const handleGetStartedClick = () => {
        navigate('/login');
    };

    const handleContactSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Name:', contactName);
        console.log('Email:', contactEmail);
        console.log('Message:', contactMessage);
        // In a real application, you would send this data to your backend
        alert('Message sent (simulation)!');
        setContactName('');
        setContactEmail('');
        setContactMessage('');
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-green-600 text-white py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <span className="font-bold text-xl">AgriYield</span>
                    <div className="space-x-4">
                        <a href="#" className="hover:underline">Home</a>
                        <Link to="/about" className="hover:underline">About</Link>
                    </div>
                </div>
            </nav>
            {/* Hero Section */}
            <header className="container mx-auto py-24 text-center">
                <img
                    src="/smart-farming-hero.jpg"
                    alt="Smart Agriculture"
                    className="max-w-2xl mx-auto rounded-lg shadow-xl"
                />
                <h1 className="text-4xl font-bold mt-12 text-green-700">
                    Unlock Your Maize's Full Potential with AgriYield
                </h1>
                <p className="text-lg mt-6 text-gray-700">
                    Experience AI-powered yield predictions based on real-time environmental and field data.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                    <div className="text-gray-700">
                        Current Soil Moisture: <span className="font-semibold">68%</span>
                    </div>
                    <div className="text-gray-700">
                        Current Temperature: <span className="font-semibold">27°C</span>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        onClick={() => {
                            // Simulate prediction based on the displayed data
                            const predictedYield = Math.random() * 22 + 5; // Example simulation
                            alert(`Simulated Yield Prediction: ${predictedYield.toFixed(2)} tons/hectare`);
                        }}
                    >
                        See Prediction
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    (This is a simplified simulation. Real-time data is automatically collected via IoT sensors.)
                </p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full mt-8"
                    onClick={handleGetStartedClick} // This function will now lead to login
                >
                    Get Started for Free
                </button>
            </header>
            {/* Features Section */}
            <section className="container mx-auto py-16">
                <h2 className="text-3xl font-bold mb-10 text-center text-green-700">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="p-8 bg-white rounded-lg shadow-md text-center">
                        <div className="text-green-600 text-5xl mb-4">
                            <FaSatelliteDish />
                        </div>
                        <h3 className="font-semibold text-xl mb-2 text-green-600">Real-time IoT Monitoring</h3>
                        <p className="text-gray-600">Track vital field data like soil moisture, temperature, and more.</p>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-md text-center">
                        <div className="text-green-600 text-5xl mb-4">
                            <FaBrain />
                        </div>
                        <h3 className="font-semibold text-xl mb-2 text-green-600">AI-Powered Predictions</h3>
                        <p className="text-gray-600">Get accurate yield forecasts and actionable insights.</p>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-md text-center">
                        <div className="text-green-600 text-5xl mb-4">
                            <MdBarChart />
                        </div>
                        <h3 className="font-semibold text-xl mb-2 text-green-600">Yield Trend Analysis</h3>
                        <p className="text-gray-600">Understand your farm's performance over time with detailed reports.</p>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-md text-center">
                        <div className="text-green-600 text-5xl mb-4">
                            <FaMobileAlt />
                        </div>
                        <h3 className="font-semibold text-xl mb-2 text-green-600">Mobile-Friendly Access</h3>
                        <p className="text-gray-600">Access your dashboard and insights from any device, anywhere.</p>
                    </div>
                    {/* Add more features as needed */}
                </div>
            </section>
            {/* Dashboard Preview Section */}
            <section className="container mx-auto py-16 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-8 text-center text-green-700">See Your Data in Action</h2>
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                        src="/dashboard-preview.png" // Changed import to direct URL
                        alt="AgriYield User Dashboard Preview"
                        className="w-full"
                    />
                </div>
                <p className="mt-6 text-center text-gray-700">
                    Visualize your farm's data, track progress, and make informed decisions with our intuitive dashboard.
                </p>
            </section>
            {/* Contact Section */}
            <section className="container mx-auto py-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Contact Us</h2>
                <div className="max-w-md mx-auto">
                    <form className="space-y-6" onSubmit={handleContactSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Your Name"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Your Email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Your Message"
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-green-800 text-white py-8 text-center mt-auto">
                <div className="container mx-auto">
                    <span className="font-bold text-lg">AgriYield</span>
                    <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
                    <div className="mt-4 space-x-4">
                        <a href="privacy-policy" className="hover:underline">Privacy Policy</a>
                        <a href="terms-of-service" className="hover:underline">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;