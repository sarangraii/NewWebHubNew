import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { onMessageListener } from './services/firebase';
import Header from './components/Header';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Bookmarks from './pages/Bookmarks';
import NotificationSettings from './components/NotificationSettings';
import NotFound from './pages/NotFound';

function App() {
  useEffect(() => {
    // Listen for foreground notifications
    const setupNotifications = async () => {
      try {
        const payload = await onMessageListener();
        
        // Show browser notification for foreground messages
        if (payload?.notification) {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: '/vite.svg',
            data: payload.data
          });
        }
      } catch (error) {
        console.log('Notification listener setup complete');
      }
    };

    setupNotifications();
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/notifications" element={<NotificationSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;