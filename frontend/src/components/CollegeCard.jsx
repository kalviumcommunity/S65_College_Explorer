import { Link } from 'react-router-dom';

const CollegeCard = ({ college }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
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
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{college.name}</h3>
        <div className="mt-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="ml-1 text-gray-600">{college.city}, {college.state}</span>
        </div>
        
        <div className="mt-3 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <svg 
                key={index}
                className={`h-5 w-5 ${index < Math.floor(college.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-gray-600">{college.rating}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-700">Courses:</h4>
          <div className="mt-1 flex flex-wrap gap-1">
            {college.courses.slice(0, 3).map((course, index) => (
              <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {course}
              </span>
            ))}
            {college.courses.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                +{college.courses.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <Link 
            to={`/college/${college._id}`} 
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;