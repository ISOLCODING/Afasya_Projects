import { Link } from 'react-router-dom';

const NotFound = () => {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
         <h1 className="text-9xl font-bold text-gray-200">404</h1>
         <h2 className="text-4xl font-bold text-gray-800 mt-4">Page Not Found</h2>
         <p className="text-gray-600 mt-2 max-w-md">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
         <Link to="/" className="mt-8 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Go Home</Link>
      </div>
   );
};

export default NotFound;
