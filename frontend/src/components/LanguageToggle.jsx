// import { useApp } from '../context/AppContext';

// const LanguageToggle = () => {
//   const { language, setLanguage } = useApp();

//   return (
//     <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 transition-colors">
//       <button
//         onClick={() => setLanguage('en')}
//         className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//           language === 'en'
//             ? 'bg-secondary text-white'
//             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//         }`}
//       >
//         English
//       </button>
//       <button
//         onClick={() => setLanguage('hi')}
//         className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//           language === 'hi'
//             ? 'bg-secondary text-white'
//             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//         }`}
//       >
//         हिंदी
//       </button>
//     </div>
//   );
// };

// export default LanguageToggle;







import { useApp } from '../context/AppContext';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { language, setLanguage } = useApp();

  return (
    <div className="relative flex items-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl p-1 shadow-inner transition-all">
      {/* Background slider */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-secondary to-orange-600 rounded-lg shadow-md transition-all duration-300 ease-out ${
          language === 'en' ? 'left-1' : 'left-[calc(50%+3px)]'
        }`}
      ></div>
      
      {/* English Button */}
      <button
        onClick={() => setLanguage('en')}
        className={`relative z-10 flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 min-w-[100px] justify-center ${
          language === 'en'
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <span className="text-base">🇬🇧</span>
        <span>English</span>
      </button>
      
      {/* Hindi Button */}
      <button
        onClick={() => setLanguage('hi')}
        className={`relative z-10 flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 min-w-[100px] justify-center ${
          language === 'hi'
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <span className="text-base">🇮🇳</span>
        <span>हिंदी</span>
      </button>
      
      {/* Globe icon decoration */}
      <div className="absolute -right-2 -top-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
        <Globe className="w-3 h-3 text-secondary animate-pulse" />
      </div>
    </div>
  );
};

export default LanguageToggle;