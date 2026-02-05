import { useApp } from '../context/AppContext';

const categories = [
  { id: '', name: 'All' },
  { id: 'general', name: 'General' },
  { id: 'technology', name: 'Technology' },
  { id: 'business', name: 'Business' },
  { id: 'sports', name: 'Sports' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
];

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;





// import { useApp } from '../context/AppContext';
// import { useRef, useEffect } from 'react';

// const categories = [
//   { id: '', name: 'All', icon: '📰', color: 'from-indigo-500 to-purple-600' },
//   { id: 'general', name: 'General', icon: '🌐', color: 'from-blue-500 to-cyan-600' },
//   { id: 'technology', name: 'Technology', icon: '💻', color: 'from-green-500 to-emerald-600' },
//   { id: 'business', name: 'Business', icon: '💼', color: 'from-yellow-500 to-orange-600' },
//   { id: 'sports', name: 'Sports', icon: '⚽', color: 'from-red-500 to-pink-600' },
//   { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'from-purple-500 to-fuchsia-600' },
//   { id: 'health', name: 'Health', icon: '🏥', color: 'from-teal-500 to-cyan-600' },
//   { id: 'science', name: 'Science', icon: '🔬', color: 'from-violet-500 to-purple-600' },
// ];

// const CategoryFilter = () => {
//   const { selectedCategory, setSelectedCategory } = useApp();
//   const scrollContainerRef = useRef(null);

//   // Auto-scroll to selected category
//   useEffect(() => {
//     if (scrollContainerRef.current) {
//       const selectedButton = scrollContainerRef.current.querySelector(`[data-category="${selectedCategory}"]`);
//       if (selectedButton) {
//         selectedButton.scrollIntoView({ 
//           behavior: 'smooth', 
//           inline: 'center', 
//           block: 'nearest' 
//         });
//       }
//     }
//   }, [selectedCategory]);

//   return (
//     <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 transition-colors">
//       <div className="container mx-auto px-3 sm:px-4 lg:px-6">
//         <div className="relative py-3 sm:py-4">
//           {/* Scrollable container */}
//           <div 
//             ref={scrollContainerRef}
//             className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-proximity"
//             style={{
//               scrollbarWidth: 'thin',
//               scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent'
//             }}
//           >
//             {categories.map((cat) => {
//               const isActive = selectedCategory === cat.id;
              
//               return (
//                 <button
//                   key={cat.id}
//                   data-category={cat.id}
//                   onClick={() => setSelectedCategory(cat.id)}
//                   className="group relative flex-shrink-0 snap-center"
//                 >
//                   {/* Main button */}
//                   <div
//                     className={`relative overflow-hidden px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-300 flex items-center gap-2 sm:gap-2.5 ${
//                       isActive
//                         ? 'text-white shadow-xl scale-105 ring-2 ring-white/20 dark:ring-gray-700/50'
//                         : 'text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md'
//                     }`}
//                   >
//                     {/* Gradient background for active state */}
//                     {isActive && (
//                       <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} animate-gradient`} />
//                     )}
                    
//                     {/* Content */}
//                     <span className="relative z-10 text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110">
//                       {cat.icon}
//                     </span>
//                     <span className="relative z-10">
//                       {cat.name}
//                     </span>
                    
//                     {/* Ripple effect on click */}
//                     <span className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 bg-white/30 transition-opacity duration-150" />
//                   </div>
                  
//                   {/* Active indicator dot */}
//                   {isActive && (
//                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
          
//           {/* Scroll hint for mobile */}
//           <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none sm:hidden" />
//         </div>
//       </div>
      
//       {/* Custom styles */}
//       <style jsx>{`
//         @keyframes gradient {
//           0%, 100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }
        
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
        
//         /* Webkit scrollbar styling */
//         div::-webkit-scrollbar {
//           height: 6px;
//         }
        
//         div::-webkit-scrollbar-track {
//           background: transparent;
//         }
        
//         div::-webkit-scrollbar-thumb {
//           background: rgba(156, 163, 175, 0.3);
//           border-radius: 3px;
//         }
        
//         div::-webkit-scrollbar-thumb:hover {
//           background: rgba(156, 163, 175, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CategoryFilter;
