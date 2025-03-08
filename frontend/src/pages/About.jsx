import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            About College Finder
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Helping students find their perfect educational path across India
          </p>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              College Finder is dedicated to simplifying the college search process for students across India. 
              We believe that finding the right educational institution should be accessible, transparent, 
              and straightforward for everyone, regardless of their background or location.
            </p>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Comprehensive Database</h3>
                </div>
                <p className="text-gray-700 ml-16">
                  Access information on thousands of colleges across all Indian states and territories, 
                  with detailed information on courses, facilities, and admission requirements.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Smart Filtering</h3>
                </div>
                <p className="text-gray-700 ml-16">
                  Easily find colleges based on location, courses, ratings, and other important criteria 
                  to narrow down your options effectively.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Verified Information</h3>
                </div>
                <p className="text-gray-700 ml-16">
                  All college listings are carefully verified and regularly updated to ensure 
                  you have access to accurate and reliable information.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Time-Saving</h3>
                </div>
                <p className="text-gray-700 ml-16">
                  Find all the information you need in one place, eliminating the need to 
                  visit multiple websites or make numerous phone calls.
                </p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              College Finder was founded in 2023 by a team of education enthusiasts who experienced firsthand 
              the challenges of finding comprehensive and reliable information about colleges in India. 
            </p>
            <p className="text-lg text-gray-700 mb-8">
              What started as a small project has grown into a comprehensive platform that serves thousands of 
              students annually. Our team continues to expand our database and improve our features to better 
              serve the educational community across India.
            </p>
            
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us on Our Mission</h2>
              <p className="text-lg text-gray-700">
                Whether you're a student looking for the perfect college, an educational institution wanting to 
                reach more students, or simply someone who believes in the power of education, we invite you to 
                be part of our journey. Together, we can make quality education more accessible to all.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">College Finder</h3>
              <p className="text-gray-300">
                Find the perfect college for your future. Search from thousands of institutions across India.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Email: info@collegefinder.com</p>
              <p className="text-gray-300">Phone: +91 123 456 7890</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">&copy; {new Date().getFullYear()} College Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;