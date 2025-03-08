import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CollegeList from '../components/CollegeList';

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const [featuredColleges, setFeaturedColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({ state: '', city: '' });
  const [stats, setStats] = useState({
    totalColleges: 0,
    totalStates: 0,
    totalCities: 0
  });

  // Popular states for quick searching
  const popularStates = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh"];

  const fetchColleges = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      if (params.state) queryParams.append('state', params.state);
      if (params.city) queryParams.append('city', params.city);
      
      const response = await fetch(`https://s65-college-explorer.onrender.com/college?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setColleges(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching colleges:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch featured colleges (top rated)
  const fetchFeaturedColleges = async () => {
    try {
      // We could add a specific endpoint for featured colleges in the backend
      // For now, we'll just fetch all and sort by rating
      const response = await fetch('https://s65-college-explorer.onrender.com/college');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Sort by rating and take top 3
      const featured = [...data].sort((a, b) => b.rating - a.rating).slice(0, 3);
      setFeaturedColleges(featured);
      
      // Set stats
      const uniqueStates = new Set(data.map(college => college.state));
      const uniqueCities = new Set(data.map(college => college.city));
      
      setStats({
        totalColleges: data.length,
        totalStates: uniqueStates.size,
        totalCities: uniqueCities.size
      });
      
    } catch (err) {
      console.error('Error fetching featured colleges:', err);
    }
  };

  useEffect(() => {
    fetchColleges();
    fetchFeaturedColleges();
  }, []);

  const handleSearch = (params) => {
    setSearchParams(params);
    fetchColleges(params);
  };

  const handlePopularStateClick = (state) => {
    setSearchParams({ state, city: '' });
    fetchColleges({ state });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white text-center mb-6">
            Find Your Dream College in India
          </h1>
          <p className="text-xl text-blue-100 text-center mb-8">
            Explore thousands of colleges across India and find the perfect fit for your future
          </p>
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.totalColleges}</p>
            <p className="text-gray-600 mt-2">Colleges</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.totalStates}</p>
            <p className="text-gray-600 mt-2">States</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.totalCities}</p>
            <p className="text-gray-600 mt-2">Cities</p>
          </div>
        </div>
        
        {/* Popular States Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Popular States</h2>
          <div className="flex flex-wrap gap-3">
            {popularStates.map(state => (
              <button
                key={state}
                onClick={() => handlePopularStateClick(state)}
                className="px-4 py-2 bg-white text-blue-600 rounded-full shadow-sm hover:bg-blue-50 border border-blue-200 transition-colors"
              >
                {state}
              </button>
            ))}
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        
        {/* Featured Colleges Section */}
        {featuredColleges.length > 0 && !searchParams.state && !searchParams.city && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Rated Colleges</h2>
            <CollegeList colleges={featuredColleges} loading={false} />
          </div>
        )}
        
        {/* Search Results */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {searchParams.state || searchParams.city ? 
              `Search Results for ${[searchParams.state, searchParams.city].filter(Boolean).join(', ')}` : 
              'All Colleges'}
          </h2>
          <CollegeList colleges={colleges} loading={loading} />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-12">
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

export default Home;