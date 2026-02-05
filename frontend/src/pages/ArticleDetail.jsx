// import { useState, useEffect, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { newsAPI } from '../services/api';
// import { formatDistanceToNow } from 'date-fns';
// import { Bookmark, Share2, Volume2, VolumeX, Play, Pause } from 'lucide-react';
// import { useApp } from '../context/AppContext';
// import Loading from '../components/Loading';

// const ArticleDetail = () => {
//   const { id } = useParams();
//   const { toggleBookmark, isBookmarked } = useApp();
//   const [article, setArticle] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [generatingSummary, setGeneratingSummary] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const audioRef = useRef(null);
//   const speechRef = useRef(null);

//   const bookmarked = isBookmarked(id);

//   useEffect(() => {
//     fetchArticle();
    
//     return () => {
//       // Cleanup
//       if (speechRef.current) {
//         window.speechSynthesis.cancel();
//       }
//       if (audioRef.current) {
//         audioRef.current.pause();
//       }
//     };
//   }, [id]);

//   const fetchArticle = async () => {
//     setLoading(true);
//     try {
//       const data = await newsAPI.getArticle(id);
//       setArticle(data);
//       setSummary(data.aiSummary);
//       setAudioUrl(data.audioSummaryUrl);
//     } catch (error) {
//       console.error('Error fetching article:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateSummary = async () => {
//     setGeneratingSummary(true);
//     try {
//       const data = await newsAPI.generateSummary(id);
//       setSummary(data.summary);
//       setAudioUrl(data.audioUrl);
//     } catch (error) {
//       console.error('Error generating summary:', error);
//     } finally {
//       setGeneratingSummary(false);
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: article.title,
//         text: article.description,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!');
//     }
//   };

//   // Play AI-generated audio summary
//   const toggleAudioPlayback = () => {
//     if (!audioRef.current || !audioUrl) return;
    
//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current.play().catch((error) => {
//         console.error('Audio playback error:', error);
//         alert('Unable to play audio. The audio file may not be ready yet.');
//       });
//     }
//   };

//   // Read article with browser's speech synthesis
//   const toggleSpeech = () => {
//     if (!article) return;

//     if (isSpeaking) {
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//     } else {
//       const text = summary || article.description || article.title;
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = article.language === 'hi' ? 'hi-IN' : 'en-US';
//       utterance.rate = 0.9;
      
//       utterance.onend = () => setIsSpeaking(false);
//       utterance.onerror = () => setIsSpeaking(false);
      
//       window.speechSynthesis.speak(utterance);
//       setIsSpeaking(true);
//       speechRef.current = utterance;
//     }
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   if (!article) {
//     return (
//       <div className="container mx-auto px-4 py-20 text-center">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Article not found</h2>
//         <Link to="/" className="text-secondary hover:underline mt-4 inline-block">
//           Go back to home
//         </Link>
//       </div>
//     );
//   }

//   const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
//     addSuffix: true,
//   });

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
//       <div className="container mx-auto px-4 py-8">
//         <Link
//           to="/"
//           className="inline-flex items-center text-secondary hover:underline mb-6"
//         >
//           ← Back to news
//         </Link>

//         <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors">
//           {article.urlToImage && (
//             <img
//               src={article.urlToImage}
//               alt={article.title}
//               className="w-full h-96 object-cover"
//               onError={(e) => {
//                 e.target.src = 'https://via.placeholder.com/1200x600?text=No+Image';
//               }}
//             />
//           )}

//           <div className="p-8">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-4">
//                 <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
//                   {article.category}
//                 </span>
//                 {article.language === 'hi' && (
//                   <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
//                     हिंदी
//                   </span>
//                 )}
//               </div>

//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => toggleBookmark(id)}
//                   className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                   title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
//                 >
//                   <Bookmark
//                     className={`w-5 h-5 ${bookmarked ? 'fill-secondary text-secondary' : 'dark:text-white'}`}
//                   />
//                 </button>
//                 <button
//                   onClick={handleShare}
//                   className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                   title="Share"
//                 >
//                   <Share2 className="w-5 h-5 dark:text-white" />
//                 </button>
//                 <button
//                   onClick={toggleSpeech}
//                   className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                   title={isSpeaking ? 'Stop reading' : 'Read aloud'}
//                 >
//                   {isSpeaking ? (
//                     <VolumeX className="w-5 h-5 text-secondary" />
//                   ) : (
//                     <Volume2 className="w-5 h-5 dark:text-white" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               {article.title}
//             </h1>

//             <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
//               <span className="font-medium">{article.source.name}</span>
//               <span className="mx-2">•</span>
//               <span>{timeAgo}</span>
//             </div>

//             {summary && (
//               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-secondary p-6 mb-6 rounded">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                     🤖 AI Summary
//                   </h3>
//                   {audioUrl && (
//                     <button
//                       onClick={toggleAudioPlayback}
//                       className="flex items-center space-x-2 px-3 py-1 bg-secondary text-white rounded-lg hover:bg-orange-600 transition-colors"
//                     >
//                       {isPlaying ? (
//                         <>
//                           <Pause className="w-4 h-4" />
//                           <span className="text-sm">Pause</span>
//                         </>
//                       ) : (
//                         <>
//                           <Play className="w-4 h-4" />
//                           <span className="text-sm">Play Audio</span>
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300">{summary}</p>
//                 {audioUrl && (
//                   <audio
//                     ref={audioRef}
//                     src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${audioUrl}`}
//                     onEnded={() => setIsPlaying(false)}
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                     onError={(e) => {
//                       console.error('Audio error:', e);
//                       setIsPlaying(false);
//                     }}
//                     className="hidden"
//                   />
//                 )}
//               </div>
//             )}

//             {!summary && (
//               <button
//                 onClick={handleGenerateSummary}
//                 disabled={generatingSummary}
//                 className="bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors mb-6 disabled:opacity-50"
//               >
//                 {generatingSummary ? 'Generating AI Summary...' : 'Generate AI Summary with Voice'}
//               </button>
//             )}

//             {article.description && (
//               <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
//                 {article.description}
//               </p>
//             )}

//             {article.content && (
//               <div className="prose max-w-none text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
//                 <p>{article.content}</p>
//               </div>
//             )}

//             <div className="flex flex-wrap gap-3 mt-8">
//               <a
//                 href={article.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
//               >
//                 Read full article →
//               </a>

//               <button
//                 onClick={handleShare}
//                 className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 transition-colors"
//               >
//                 <Share2 className="w-4 h-4" />
//                 <span>Share</span>
//               </button>
//             </div>
//           </div>
//         </article>
//       </div>
//     </div>
//   );
// };

// export default ArticleDetail;









import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsAPI } from '../services/api';
import { formatDistanceToNow } from 'date-fns';
import { Bookmark, Share2, Volume2, VolumeX, Play, Pause, ArrowLeft, Clock, Eye, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Loading from '../components/Loading';

const ArticleDetail = () => {
  const { id } = useParams();
  const { toggleBookmark, isBookmarked } = useApp();
  const [article, setArticle] = useState(null);
  const [summary, setSummary] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);
  const speechRef = useRef(null);

  const bookmarked = isBookmarked(id);

  useEffect(() => {
    fetchArticle();
    
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [id]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const data = await newsAPI.getArticle(id);
      setArticle(data);
      setSummary(data.aiSummary);
      setAudioUrl(data.audioSummaryUrl);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    setGeneratingSummary(true);
    try {
      const data = await newsAPI.generateSummary(id);
      setSummary(data.summary);
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg z-50 animate-fadeIn flex items-center space-x-2';
      toast.innerHTML = '<span>✓</span><span>Link copied!</span>';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  };

  const toggleAudioPlayback = () => {
    if (!audioRef.current || !audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Audio playback error:', error);
      });
    }
  };

  const toggleSpeech = () => {
    if (!article) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const text = summary || article.description || article.title;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = article.language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      speechRef.current = utterance;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Article not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">This article may have been removed or doesn't exist.</p>
          <Link to="/" className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Back Button - Floating on mobile, inline on desktop */}
      <div className="sticky top-[64px] md:top-[80px] z-30 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors border border-gray-100 dark:border-gray-700">
          {/* Hero Image */}
          {article.urlToImage && (
            <div className="relative aspect-video md:aspect-[21/9] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x600?text=No+Image';
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          )}

          <div className="p-4 sm:p-6 md:p-8">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
              <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-secondary to-orange-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                <Eye className="w-3 h-3" />
                <span className="uppercase">{article.category}</span>
              </span>
              {article.language === 'hi' && (
                <span className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md">
                  <span>🇮🇳</span>
                  <span>हिंदी</span>
                </span>
              )}
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeAgo}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Source & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center space-x-2 text-sm sm:text-base">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span className="font-semibold text-gray-900 dark:text-white">{article.source.name}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleBookmark(id)}
                  className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all active:scale-95 touch-manipulation"
                  title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                >
                  <Bookmark
                    className={`w-5 h-5 ${bookmarked ? 'fill-secondary text-secondary' : 'text-gray-700 dark:text-gray-300'}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all active:scale-95 touch-manipulation"
                  title="Share"
                >
                  <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={toggleSpeech}
                  className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all active:scale-95 touch-manipulation"
                  title={isSpeaking ? 'Stop reading' : 'Read aloud'}
                >
                  {isSpeaking ? (
                    <VolumeX className="w-5 h-5 text-secondary animate-pulse" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {/* AI Summary */}
            {summary && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-200 dark:border-blue-800 p-4 sm:p-6 mb-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span className="text-2xl">🤖</span>
                    <span>AI Summary</span>
                  </h3>
                  {audioUrl && (
                    <button
                      onClick={toggleAudioPlayback}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary to-orange-600 text-white rounded-xl hover:shadow-lg transition-all active:scale-95 font-semibold text-sm touch-manipulation"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>Pause Audio</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Play Audio</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{summary}</p>
                {audioUrl && (
                  <audio
                    ref={audioRef}
                    src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${audioUrl}`}
                    onEnded={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={(e) => {
                      console.error('Audio error:', e);
                      setIsPlaying(false);
                    }}
                    className="hidden"
                  />
                )}
              </div>
            )}

            {/* Generate Summary Button */}
            {!summary && (
              <button
                onClick={handleGenerateSummary}
                disabled={generatingSummary}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-secondary to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all mb-6 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 touch-manipulation"
              >
                {generatingSummary ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Generating...</span>
                  </span>
                ) : (
                  '🤖 Generate AI Summary with Voice'
                )}
              </button>
            )}

            {/* Description */}
            {article.description && (
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-medium">
                {article.description}
              </p>
            )}

            {/* Content */}
            {article.content && (
              <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                <p>{article.content}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
              >
                <span>Read Full Article</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleShare}
                className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 transition-all active:scale-95 touch-manipulation"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;