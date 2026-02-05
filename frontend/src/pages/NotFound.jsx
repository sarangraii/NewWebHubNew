// import { Link } from 'react-router-dom';

// const NotFound = () => {
//   return (
//     <div className="container mx-auto px-4 py-20 text-center">
//       <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
//       <p className="text-xl text-gray-600 mb-8">Page not found</p>
//       <Link
//         to="/"
//         className="inline-block bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
//       >
//         Go back home
//       </Link>
//     </div>
//   );
// };

// export default NotFound;











import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 transition-colors">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-orange-600/20 blur-3xl"></div>
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-secondary to-orange-600 bg-clip-text text-transparent mb-4 animate-pulse">
              404
            </h1>
            <div className="text-6xl mb-6">📰🔍</div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto">
          The page you're looking for seems to have wandered off. Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-secondary to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-secondary transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
            🔍 Quick Links:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Home', path: '/', icon: '🏠' },
              { name: 'Bookmarks', path: '/bookmarks', icon: '📑' },
              { name: 'Notifications', path: '/notifications', icon: '🔔' },
              { name: 'Search', path: '/?search=', icon: '🔍' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105 active:scale-95"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Fun Error Codes */}
        <div className="mt-8 text-xs text-gray-400 dark:text-gray-600 font-mono">
          ERROR_CODE: PAGE_NOT_FOUND_404 | STATUS: LOST_IN_SPACE 🚀
        </div>
      </div>
    </div>
  );
};

export default NotFound;