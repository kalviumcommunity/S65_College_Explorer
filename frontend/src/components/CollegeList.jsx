import CollegeCard from './CollegeCard';

const CollegeList = ({ colleges, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!colleges || colleges.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <h3 className="text-xl font-medium text-gray-700">No colleges found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college) => (
        <CollegeCard key={college._id} college={college} />
      ))}
    </div>
  );
};

export default CollegeList;