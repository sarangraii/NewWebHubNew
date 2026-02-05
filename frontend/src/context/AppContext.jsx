import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    setDarkMode(savedDarkMode);
    setBookmarks(savedBookmarks);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleBookmark = (articleId) => {
    let newBookmarks;
    if (bookmarks.includes(articleId)) {
      newBookmarks = bookmarks.filter(id => id !== articleId);
    } else {
      newBookmarks = [...bookmarks, articleId];
    }
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const isBookmarked = (articleId) => bookmarks.includes(articleId);

  const value = {
    language,
    setLanguage,
    selectedCategory,
    setSelectedCategory,
    darkMode,
    toggleDarkMode,
    bookmarks,
    toggleBookmark,
    isBookmarked,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};