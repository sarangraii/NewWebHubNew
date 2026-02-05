// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = [];
//   const maxVisible = 5;

//   let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//   let endPage = Math.min(totalPages, startPage + maxVisible - 1);

//   if (endPage - startPage < maxVisible - 1) {
//     startPage = Math.max(1, endPage - maxVisible + 1);
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="flex items-center justify-center space-x-2 mt-8">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
//       >
//         Previous
//       </button>

//       {startPage > 1 && (
//         <>
//           <button
//             onClick={() => onPageChange(1)}
//             className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
//           >
//             1
//           </button>
//           {startPage > 2 && <span className="px-2">...</span>}
//         </>
//       )}

//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-4 py-2 rounded-lg ${
//             currentPage === page
//               ? 'bg-secondary text-white'
//               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       {endPage < totalPages && (
//         <>
//           {endPage < totalPages - 1 && <span className="px-2">...</span>}
//           <button
//             onClick={() => onPageChange(totalPages)}
//             className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
//           >
//             {totalPages}
//           </button>
//         </>
//       )}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Reduce visible pages on mobile
  const isMobile = window.innerWidth < 640;
  const maxVisible = isMobile ? 3 : 5;

  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8 px-4">
      {/* Page Info - Always visible */}
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
        Page <span className="text-secondary font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center min-w-[44px] h-11 px-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-secondary transition-all shadow-sm active:scale-95"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline ml-1 font-medium">Prev</span>
        </button>

        {/* Desktop: First page + ellipsis */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="hidden sm:flex items-center justify-center min-w-[44px] h-11 px-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-secondary transition-all shadow-sm font-medium active:scale-95"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="hidden sm:inline px-2 text-gray-400 dark:text-gray-600 font-bold">···</span>
            )}
          </>
        )}

        {/* Page Numbers - Bigger touch targets */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center min-w-[44px] h-11 px-4 rounded-lg transition-all shadow-sm font-medium active:scale-95 ${
              currentPage === page
                ? 'bg-gradient-to-r from-secondary to-orange-600 text-white border-2 border-secondary shadow-lg scale-110 font-bold'
                : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-secondary'
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Desktop: Ellipsis + last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="hidden sm:inline px-2 text-gray-400 dark:text-gray-600 font-bold">···</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="hidden sm:flex items-center justify-center min-w-[44px] h-11 px-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-secondary transition-all shadow-sm font-medium active:scale-95"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center min-w-[44px] h-11 px-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-secondary transition-all shadow-sm active:scale-95"
          aria-label="Next page"
        >
          <span className="hidden sm:inline mr-1 font-medium">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;