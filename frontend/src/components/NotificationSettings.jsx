import { useState, useEffect } from 'react';
import { Bell, BellOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { requestNotificationPermission, unsubscribeFromNotifications, getCurrentToken } from '../services/firebase';

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // success, error, info

  const topics = [
    {"id": "breaking_news", "name": "Breaking News", "icon": "🚨"},
    {"id": "technology", "name": "Technology", "icon": "💻"},
    {"id": "business", "name": "Business", "icon": "💼"},
    {"id": "sports", "name": "Sports", "icon": "⚽"},
    {"id": "entertainment", "name": "Entertainment", "icon": "🎬"},
    {"id": "health", "name": "Health", "icon": "🏥"},
    {"id": "science", "name": "Science", "icon": "🔬"},
  ];

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = () => {
    const fcmToken = getCurrentToken();
    const permissionGranted = Notification.permission === 'granted';
    setNotificationsEnabled(!!fcmToken && permissionGranted);

    const saved = JSON.parse(localStorage.getItem('subscribed_topics') || '[]');
    setSubscribedTopics(saved);
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleEnableNotifications = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Check browser support
      if (!('Notification' in window)) {
        showMessage('❌ Your browser does not support notifications', 'error');
        setLoading(false);
        return;
      }

      // Check if already blocked
      if (Notification.permission === 'denied') {
        showMessage('⚠️ Notifications are blocked. Please enable them in your browser settings.', 'error');
        setLoading(false);
        return;
      }

      const token = await requestNotificationPermission();
      
      if (token) {
        setNotificationsEnabled(true);
        showMessage('🎉 Notifications enabled successfully! You\'ll now receive news updates.', 'success');
      } else {
        showMessage('❌ Failed to enable notifications. Please try again or check browser settings.', 'error');
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      showMessage('❌ An error occurred: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    if (!window.confirm('Are you sure you want to disable notifications? You will no longer receive news updates.')) {
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const success = await unsubscribeFromNotifications();
      
      if (success) {
        setNotificationsEnabled(false);
        setSubscribedTopics([]);
        localStorage.removeItem('subscribed_topics');
        showMessage('✅ Notifications disabled successfully.', 'success');
      } else {
        showMessage('⚠️ Failed to disable notifications. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error disabling notifications:', error);
      showMessage('❌ Error: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTopic = (topicId) => {
    let updated;
    if (subscribedTopics.includes(topicId)) {
      updated = subscribedTopics.filter(t => t !== topicId);
    } else {
      updated = [...subscribedTopics, topicId];
    }
    setSubscribedTopics(updated);
    localStorage.setItem('subscribed_topics', JSON.stringify(updated));
    
    // Show brief confirmation
    showMessage(`Topic ${updated.includes(topicId) ? 'added' : 'removed'}`, 'info');
  };

  const handleTestNotification = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/notifications/test`, {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.success > 0) {
          showMessage(`✅ Test notification sent successfully! Check your notifications.`, 'success');
        } else {
          showMessage(`⚠️ Notification sent but delivery failed. Please check your settings.`, 'error');
        }
      } else {
        showMessage('❌ Failed to send test notification: ' + (data.detail || 'Unknown error'), 'error');
      }
    } catch (error) {
      console.error('Test notification error:', error);
      showMessage('❌ Network error. Please check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🔔 Notification Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your news notification preferences
          </p>
        </div>

        {/* Status Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-start space-x-3 animate-fadeIn ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                : message.type === 'error'
                ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                : 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
            }`}
          >
            {message.type === 'success' && <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
            {message.type === 'error' && <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
            {message.type === 'info' && <Bell className="w-5 h-5 mt-0.5 flex-shrink-0" />}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          {!notificationsEnabled ? (
            /* Disabled State */
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BellOff className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Enable Notifications
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Stay updated with breaking news alerts and updates on topics you care about. 
                  Notifications work even when the app is closed.
                </p>
              </div>

              <button
                onClick={handleEnableNotifications}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-secondary to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-secondary transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Enabling...</span>
                  </span>
                ) : (
                  '🔔 Enable Notifications'
                )}
              </button>
            </div>
          ) : (
            /* Enabled State */
            <div>
              {/* Status Banner */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-green-900 dark:text-green-100 font-bold">Notifications Active</p>
                    <p className="text-xs text-green-700 dark:text-green-300">You're all set to receive updates</p>
                  </div>
                </div>
                <Bell className="w-6 h-6 text-green-600 animate-pulse" />
              </div>

              {/* Topics Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Choose Your Topics
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Select topics to personalize your news notifications
                </p>

                <div className="space-y-2">
                  {topics.map((topic) => (
                    <label
                      key={topic.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all hover:border-secondary group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{topic.icon}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {topic.name}
                        </span>
                      </div>

                      <input
                        type="checkbox"
                        checked={subscribedTopics.includes(topic.id)}
                        onChange={() => handleToggleTopic(topic.id)}
                        className="w-6 h-6 text-secondary rounded-lg focus:ring-2 focus:ring-secondary cursor-pointer transition-transform hover:scale-110"
                      />
                    </label>
                  ))}
                </div>

                {/* Subscription Summary */}
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>📊 Status:</strong> You're subscribed to <span className="font-bold text-secondary">{subscribedTopics.length}</span> topic{subscribedTopics.length !== 1 ? 's' : ''}
                    {subscribedTopics.length === 0 && '. Select topics above to start receiving notifications.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Test Notification */}
                <button
                  onClick={handleTestNotification}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Bell className="w-5 h-5" />
                  <span>{loading ? 'Sending...' : 'Send Test Notification'}</span>
                </button>

                {/* Disable Notifications */}
                <button
                  onClick={handleDisableNotifications}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border-2 border-red-600 dark:border-red-400 rounded-xl font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>{loading ? 'Disabling...' : 'Disable Notifications'}</span>
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  You can re-enable notifications anytime
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Browser Permission Warning */}
        {Notification.permission === 'denied' && (
          <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                  ⚠️ Notifications Blocked
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-3">
                  You have blocked notifications for this site. To enable them:
                </p>
                <ol className="text-sm text-yellow-800 dark:text-yellow-300 list-decimal list-inside space-y-2 ml-2">
                  <li>Click the lock/info icon in your browser's address bar</li>
                  <li>Find "Notifications" in the permissions list</li>
                  <li>Change the setting to "Allow"</li>
                  <li>Reload this page and try again</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <span>💡</span>
            <span>About Notifications</span>
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start space-x-2">
              <span className="text-secondary mt-0.5">•</span>
              <span>Get instant alerts when new articles are published in your selected topics</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-secondary mt-0.5">•</span>
              <span>Notifications work even when the app is closed or minimized</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-secondary mt-0.5">•</span>
              <span>You can disable notifications at any time from this page</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-secondary mt-0.5">•</span>
              <span>Your preferences are saved locally and synced across sessions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;