// import { Link } from 'react-router-dom';
// import { formatDistanceToNow } from 'date-fns';
// import { Bookmark, Share2 } from 'lucide-react';
// import { useApp } from '../context/AppContext';

// const NewsCard = ({ article }) => {
//   const { toggleBookmark, isBookmarked } = useApp();
//   const bookmarked = isBookmarked(article.id);

//   // VALIDATION - Don't render if essential data is missing
//   if (!article.title || !article.description) {
//     return null;
//   }

//   const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
//     addSuffix: true,
//   });

//   const handleBookmark = (e) => {
//     e.preventDefault();
//     toggleBookmark(article.id);
//   };

//   const handleShare = (e) => {
//     e.preventDefault();
//     if (navigator.share) {
//       navigator.share({
//         title: article.title,
//         text: article.description,
//         url: window.location.origin + `/article/${article.id}`,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
//       alert('Link copied!');
//     }
//   };

//   return (
//     <div className="block group relative">
//       <Link to={`/article/${article.id}`}>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
//           {article.urlToImage && (
//             <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
//               <img
//                 src={article.urlToImage}
//                 alt={article.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                 }}
//               />
//             </div>
//           )}

//           <div className="p-4">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs font-semibold text-secondary uppercase">
//                 {article.category}
//               </span>
//               <span className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</span>
//             </div>

//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
//               {article.title}
//             </h3>

//             <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
//               {article.description}
//             </p>

//             <div className="flex items-center justify-between">
//               <span className="text-xs text-gray-500 dark:text-gray-400">
//                 {article.source?.name || 'Unknown'}
//               </span>
//               {article.language === 'hi' && (
//                 <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
//                   हिंदी
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </Link>

//       <div className="absolute top-4 right-4 flex space-x-2">
//         <button
//           onClick={handleBookmark}
//           className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//         >
//           <Bookmark
//             className={`w-4 h-4 ${bookmarked ? 'fill-secondary text-secondary' : 'text-gray-700 dark:text-gray-300'}`}
//           />
//         </button>
//         <button
//           onClick={handleShare}
//           className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//         >
//           <Share2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewsCard;







import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Bookmark, Share2, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NewsCard = ({ article }) => {
  const { toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(article.id);

  // VALIDATION - Don't render if essential data is missing
  if (!article.title || !article.description) {
    return null;
  }

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.origin + `/article/${article.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
      // Show brief toast instead of alert
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn';
      toast.textContent = '✓ Link copied!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  };

  return (
    <div className="group relative">
      <Link to={`/article/${article.id}`} className="block">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 md:hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
          {/* Image Container with Overlay */}
          {article.urlToImage && (
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Gradient overlay - always visible on mobile, hover on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Category badge on image */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-secondary to-orange-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span className="uppercase">{article.category}</span>
                </span>
              </div>

              {/* Action buttons - ALWAYS visible on mobile, hover on desktop */}
              <div className="absolute top-3 right-3 flex space-x-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleBookmark}
                  className="p-2.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all active:scale-95 touch-manipulation"
                  title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                >
                  <Bookmark
                    className={`w-5 h-5 transition-colors ${
                      bookmarked 
                        ? 'fill-secondary text-secondary' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all active:scale-95 touch-manipulation"
                  title="Share article"
                >
                  <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Meta Info */}
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{timeAgo}</span>
              </div>
              {article.language === 'hi' && (
                <span className="flex items-center space-x-1 text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2.5 py-1 rounded-full font-semibold shadow-sm">
                  <span>🇮🇳</span>
                  <span>हिंदी</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-secondary transition-colors leading-tight">
              {article.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
              {article.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span className="truncate max-w-[150px]">{article.source?.name || 'Unknown'}</span>
              </span>
              
              {/* Read more indicator */}
              <span className="text-xs font-semibold text-secondary group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span className="hidden sm:inline">Read more</span>
                <span>→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;