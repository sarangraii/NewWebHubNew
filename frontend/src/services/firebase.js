import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDWkrSa70xhaIkRSFfFrqhBxJtUD0vfqQw",
  authDomain: "myappnotifications-c2e0c.firebaseapp.com",
  projectId: "myappnotifications-c2e0c",
  storageBucket: "myappnotifications-c2e0c.appspot.com",
  messagingSenderId: "181458792338",
  appId: "1:181458792338:web:6b3ce16c0edd09d8a25b4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

/**
 * Get current FCM token from localStorage
 */
export const getCurrentToken = () => {
  return localStorage.getItem('fcm_token');
};

/**
 * Request notification permission and get FCM token
 */
export const requestNotificationPermission = async () => {
  try {
    console.log('📱 Requesting notification permission...');
    
    // Check if browser supports notifications
    if (!('Notification' in window)) {
      console.log('❌ Browser does not support notifications');
      return null;
    }

    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
      console.log('❌ Notification permission denied');
      return null;
    }

    console.log('✅ Notification permission granted');

    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          '/firebase-messaging-sw.js'
        );
        console.log('✅ Service Worker registered');
        await navigator.serviceWorker.ready;
      } catch (error) {
        console.log('⚠️ Service Worker registration failed:', error);
      }
    }

    // Get FCM token
    try {
      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'BJUujjv9dUW3r6DZAyuxzNeMI6Vx9jgr1hp9Ujef_zlESiHNUGpVUghURf_jNfy7xjnJ0GU37zGhkp1XNj14uBU';
      
      const token = await getToken(messaging, {
        vapidKey: vapidKey,
        serviceWorkerRegistration: await navigator.serviceWorker.ready
      });

      if (token) {
        console.log('🎫 FCM Token obtained');
        localStorage.setItem('fcm_token', token);
        
        // Send token to backend
        await sendTokenToBackend(token);
        
        return token;
      } else {
        console.log('⚠️ No FCM token available');
        return null;
      }
    } catch (error) {
      console.error('❌ Error getting FCM token:', error);
      return null;
    }
  } catch (error) {
    console.error('❌ Error in requestNotificationPermission:', error);
    return null;
  }
};

/**
 * Send FCM token to backend
 */
const sendTokenToBackend = async (token) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/notifications/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });
    
    if (response.ok) {
      console.log('✅ Token sent to backend successfully');
      return true;
    } else {
      console.log('⚠️ Failed to send token to backend');
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending token to backend:', error);
    return false;
  }
};

/**
 * Unsubscribe from notifications
 */
export const unsubscribeFromNotifications = async () => {
  try {
    const token = getCurrentToken();
    if (!token) {
      console.log('⚠️ No token to unsubscribe');
      return false;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/notifications/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });

    if (response.ok) {
      localStorage.removeItem('fcm_token');
      console.log('✅ Unsubscribed successfully');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Unsubscribe error:', error);
    return false;
  }
};

/**
 * Listen for foreground messages
 */
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('🔔 Foreground message received:', payload);
      
      // Show browser notification
      if (Notification.permission === 'granted' && payload.notification) {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: '/vite.svg',
          badge: '/vite.svg',
          tag: 'news-notification'
        });
      }
      
      resolve(payload);
    });
  });

export { messaging };