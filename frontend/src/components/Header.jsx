// import { Link } from "react-router-dom";
// import { Moon, Sun, Bookmark, Bell, Menu, X } from "lucide-react";
// import { useState } from "react";
// import { useApp } from "../context/AppContext";
// import LanguageToggle from "./LanguageToggle";
// import SearchBar from "./SearchBar";

// const Header = () => {
//   const { darkMode, toggleDarkMode, bookmarks } = useApp();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
//             <div className="text-2xl">📰</div>
//             <h1 className="text-xl font-bold text-primary dark:text-white">NewsHub</h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <SearchBar />

//             {/* Bookmarks */}
//             <Link
//               to="/bookmarks"
//               className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               title="Bookmarks"
//             >
//               <Bookmark className="w-5 h-5 dark:text-white" />
//               {bookmarks.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
//                   {bookmarks.length}
//                 </span>
//               )}
//             </Link>

//             {/* Notifications */}
//             <Link
//               to="/notifications"
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               title="Notifications"
//             >
//               <Bell className="w-5 h-5 dark:text-white" />
//             </Link>

//             {/* Dark Mode Toggle */}
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               title={darkMode ? "Light mode" : "Dark mode"}
//             >
//               {darkMode ? (
//                 <Sun className="w-5 h-5 text-yellow-400" />
//               ) : (
//                 <Moon className="w-5 h-5 text-gray-700" />
//               )}
//             </button>

//             <LanguageToggle />
//           </div>

//           {/* Mobile: Right Section */}
//           <div className="md:hidden flex items-center space-x-2">
//             <SearchBar />
            
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               aria-label="Menu"
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-6 h-6 dark:text-white" />
//               ) : (
//                 <Menu className="w-6 h-6 dark:text-white" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-4 animate-fadeIn">
//             {/* Bookmarks */}
//             <Link
//               to="/bookmarks"
//               onClick={() => setMobileMenuOpen(false)}
//               className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               <div className="flex items-center space-x-3">
//                 <Bookmark className="w-5 h-5 dark:text-white" />
//                 <span className="dark:text-white font-medium">Bookmarks</span>
//               </div>
//               {bookmarks.length > 0 && (
//                 <span className="bg-secondary text-white text-xs rounded-full px-2 py-1 font-semibold">
//                   {bookmarks.length}
//                 </span>
//               )}
//             </Link>

//             {/* Notifications */}
//             <Link
//               to="/notifications"
//               onClick={() => setMobileMenuOpen(false)}
//               className="flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               <Bell className="w-5 h-5 dark:text-white" />
//               <span className="dark:text-white font-medium">Notifications</span>
//             </Link>

//             {/* Dark Mode Toggle */}
//             <button
//               onClick={() => {
//                 toggleDarkMode();
//                 setMobileMenuOpen(false);
//               }}
//               className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               <div className="flex items-center space-x-3">
//                 {darkMode ? (
//                   <Sun className="w-5 h-5 text-yellow-400" />
//                 ) : (
//                   <Moon className="w-5 h-5 text-gray-700" />
//                 )}
//                 <span className="dark:text-white font-medium">
//                   {darkMode ? "Light Mode" : "Dark Mode"}
//                 </span>
//               </div>
//             </button>

//             {/* Language Toggle */}
//             <div className="px-3">
//               <LanguageToggle />
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;










import { Link } from "react-router-dom";
import { Moon, Sun, Bookmark, Bell, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import LanguageToggle from "./LanguageToggle";
import SearchBar from "./SearchBar";

const Header = () => {
  const { darkMode, toggleDarkMode, bookmarks } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-50 transition-all duration-300 border-b-2 border-secondary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Enhanced with gradient and animation */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-orange-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative text-3xl md:text-4xl bg-gradient-to-br from-secondary to-orange-600 p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                📰
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                NewsHub
              </h1>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
                <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                  AI-Powered News
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            <SearchBar />

            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Bookmarks - Enhanced with badge */}
              <Link
                to="/bookmarks"
                className="relative group p-2.5 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                title="Bookmarks"
              >
                <Bookmark className="w-5 h-5 dark:text-white group-hover:text-secondary transition-colors" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-secondary to-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {bookmarks.length > 9 ? '9+' : bookmarks.length}
                  </span>
                )}
              </Link>

              {/* Notifications - Enhanced with bell animation */}
              <Link
                to="/notifications"
                className="relative group p-2.5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                title="Notifications"
              >
                <Bell className="w-5 h-5 dark:text-white group-hover:text-blue-600 group-hover:animate-swing transition-colors" />
              </Link>

              {/* Dark Mode Toggle - Enhanced with glow effect */}
              <button
                onClick={toggleDarkMode}
                className="relative group p-2.5 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-amber-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                title={darkMode ? "Light mode" : "Dark mode"}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Language Toggle - Enhanced */}
              <div className="ml-2">
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Mobile: Right Section - Enhanced */}
          <div className="md:hidden flex items-center space-x-2">
            <SearchBar />
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 shadow-sm"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced with animations */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-3 animate-slideDown">
            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:from-orange-50 hover:to-red-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Bookmark className="w-5 h-5 text-secondary" />
                </div>
                <span className="dark:text-white font-medium">Saved Articles</span>
              </div>
              {bookmarks.length > 0 && (
                <span className="bg-gradient-to-r from-secondary to-orange-600 text-white text-xs rounded-full px-3 py-1 font-bold shadow-md">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Notifications */}
            <Link
              to="/notifications"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <span className="dark:text-white font-medium">Notifications</span>
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                toggleDarkMode();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:from-yellow-50 hover:to-amber-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </div>
                <span className="dark:text-white font-medium">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </button>

            {/* Language Toggle */}
            <div className="px-2">
              <LanguageToggle />
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(15deg);
          }
          75% {
            transform: rotate(-15deg);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .group:hover .animate-swing {
          animation: swing 0.5s ease-in-out;
        }
      `}</style>
    </header>
  );
};

export default Header;