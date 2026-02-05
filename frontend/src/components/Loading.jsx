const Loading = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary"></div>
    </div>
  );
};

export default Loading;

// const Loading = () => {
//   return (
//     <div className="flex flex-col items-center justify-center py-20 space-y-6">
//       {/* Main spinner with gradient */}
//       <div className="relative">
//         {/* Outer glow ring */}
//         <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-orange-600 blur-xl opacity-30 animate-pulse"></div>
        
//         {/* Spinning gradient ring */}
//         <div className="relative w-20 h-20">
//           <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
//           <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary border-r-orange-600 animate-spin"></div>
          
//           {/* Center icon */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <span className="text-3xl animate-pulse">📰</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Loading text with dots animation */}
//       <div className="flex items-center space-x-2">
//         <span className="text-gray-600 dark:text-gray-400 font-medium">Loading</span>
//         <div className="flex space-x-1">
//           <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
//           <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
//           <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
//         </div>
//       </div>
      
//       {/* Subtle hint text */}
//       <p className="text-xs text-gray-500 dark:text-gray-500 animate-pulse">
//         Fetching the latest news for you...
//       </p>
//     </div>
//   );
// };

// export default Loading;