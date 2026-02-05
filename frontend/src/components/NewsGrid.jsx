// import NewsCard from './NewsCard';
// import Loading from './Loading';

// const NewsGrid = ({ articles, loading }) => {
//   if (loading) {
//     return <Loading />;
//   }

//   if (!articles || articles.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-xl text-gray-600">No articles found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {articles.map((article) => (
//         <NewsCard key={article.id} article={article} />
//       ))}
//     </div>
//   );
// };

// export default NewsGrid;










import NewsCard from './NewsCard';
import Loading from './Loading';
import { Search, Newspaper } from 'lucide-react';

const NewsGrid = ({ articles, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-orange-600/20 blur-3xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-8 rounded-full">
            <Newspaper className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        {/* Message */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          We couldn't find any articles matching your criteria. Try adjusting your filters or search terms.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-secondary to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            🔄 Refresh Page
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-secondary transition-all"
          >
            ← Back to All News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-bold text-secondary">{articles.length}</span> articles
        </p>
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live updates</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;