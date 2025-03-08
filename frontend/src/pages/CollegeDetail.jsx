import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CollegeDetail = () => {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const response = await fetch(`https://s65-college-explorer.onrender.com/college/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setCollege(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching college details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
          <div className="mt-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Not Found:</strong>
            <span className="block sm:inline"> College not found</span>
          </div>
          <div className="mt-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="h-80 overflow-hidden relative">
            {college.images && college.images.length > 0 ? (
              <img 
                src={college.images[0]} 
                alt={college.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h1 className="text-3xl font-bold text-white">{college.name}</h1>
              <p className="text-white mt-2">{college.city}, {college.state}</p>
            </div>
          </div>
          
          <div className="p-6">
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <svg 
                    key={index}
                    className={`h-6 w-6 ${index < Math.floor(college.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-xl">{college.rating}</span>
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">College Information</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                    <p>{college.address}</p>
                  </div>
                  {college.website && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Website</h3>
                      <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {college.website}
                      </a>
                    </div>
                  )}
                  {college.email && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <a href={`mailto:${college.email}`} className="text-blue-600 hover:underline">
                        {college.email}
                      </a>
                    </div>
                  )}
                  {college.contact && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                      <p>{college.contact}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Courses Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {college.courses.map((course, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Description */}
            {college.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About the College</h2>
                <p className="text-gray-700">{college.description}</p>
              </div>
            )}
            
            {/* Image Gallery (if multiple images) */}
            {college.images && college.images.length > 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {college.images.map((image, index) => (
                    <div key={index} className="h-48 overflow-hidden rounded-lg">
                      <img src={image} alt={`${college.name} - ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;