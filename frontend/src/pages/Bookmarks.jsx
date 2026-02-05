// import { useState, useEffect } from 'react';
// import { newsAPI } from '../services/api';
// import { useApp } from '../context/AppContext';
// import NewsGrid from '../components/NewsGrid';
// import { Bookmark } from 'lucide-react';

// const Bookmarks = () => {
//   const { bookmarks } = useApp();
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBookmarkedArticles();
//   }, [bookmarks]);

//   const fetchBookmarkedArticles = async () => {
//     if (bookmarks.length === 0) {
//       setArticles([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       const fetchedArticles = await Promise.all(
//         bookmarks.map(async (id) => {
//           try {
//             return await newsAPI.getArticle(id);
//           } catch (error) {
//             console.error(`Error fetching article ${id}:`, error);
//             return null;
//           }
//         })
//       );
//       setArticles(fetchedArticles.filter(article => article !== null));
//     } catch (error) {
//       console.error('Error fetching bookmarks:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center space-x-3 mb-8">
//           <Bookmark className="w-8 h-8 text-secondary fill-secondary" />
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             My Bookmarks
//           </h1>
//           <span className="text-gray-600 dark:text-gray-400">
//             ({bookmarks.length} saved)
//           </span>
//         </div>

//         {bookmarks.length === 0 ? (
//           <div className="text-center py-20">
//             <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//               No bookmarks yet
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               Start bookmarking articles to read them later
//             </p>
//           </div>
//         ) : (
//           <NewsGrid articles={articles} loading={loading} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Bookmarks;





import { useState, useEffect } from 'react';
import { newsAPI } from '../services/api';
import { useApp } from '../context/AppContext';
import NewsGrid from '../components/NewsGrid';
import { Bookmark, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const { bookmarks } = useApp();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarkedArticles();
  }, [bookmarks]);

  const fetchBookmarkedArticles = async () => {
    if (bookmarks.length === 0) {
      setArticles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const fetchedArticles = await Promise.all(
        bookmarks.map(async (id) => {
          try {
            return await newsAPI.getArticle(id);
          } catch (error) {
            console.error(`Error fetching article ${id}:`, error);
            return null;
          }
        })
      );
      setArticles(fetchedArticles.filter(article => article !== null));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>

          {/* Title with icon */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-orange-600 rounded-2xl blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-br from-secondary to-orange-600 p-3 rounded-2xl shadow-lg">
                  <Bookmark className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  My Bookmarks
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {bookmarks.length === 0 
                    ? 'No saved articles yet' 
                    : `${bookmarks.length} article${bookmarks.length !== 1 ? 's' : ''} saved`
                  }
                </p>
              </div>
            </div>

            {/* Stats badge */}
            {bookmarks.length > 0 && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                <Heart className="w-4 h-4 text-secondary fill-secondary" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Reading List
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            {/* Illustration */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-orange-600/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-12 rounded-full">
                <Bookmark className="w-20 h-20 text-gray-400 dark:text-gray-500" />
              </div>
            </div>

            {/* Message */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              No bookmarks yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 px-4">
              Start saving articles you want to read later. Your bookmarked articles will appear here.
            </p>

            {/* CTA */}
            <Link
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-secondary to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              📰 Explore News
            </Link>

            {/* Tips */}
            <div className="mt-12 max-w-md mx-auto">
              <p className="text-sm text-gray-500 dark:text-gray-500 text-center mb-4 font-medium">
                💡 How to bookmark articles:
              </p>
              <div className="space-y-3">
                {[
                  'Tap the bookmark icon on any article card',
                  'Access your saved articles anytime from this page',
                  'Your bookmarks are saved locally on your device'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex-shrink-0 w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Articles Grid */
          <div>
            {/* Info banner */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                <span className="text-lg">💡</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                  Your bookmarks are stored locally. Tap the bookmark icon again to remove articles from this list.
                </p>
              </div>
            </div>

            <NewsGrid articles={articles} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;