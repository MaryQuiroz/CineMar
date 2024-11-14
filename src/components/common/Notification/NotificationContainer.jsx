import { useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { useNotification } from './NotificationContext';

const icons = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
  error: <ExclamationCircleIcon className="h-6 w-6 text-red-400" />,
  info: <InformationCircleIcon className="h-6 w-6 text-blue-400" />,
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          removeNotification(notification.id);
        }, notification.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, removeNotification]);

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            max-w-sm w-full bg-cinema-gray rounded-lg shadow-lg 
            transform transition-all duration-500 ease-in-out
            translate-x-0 opacity-100
            ${notification.isLeaving ? 'translate-x-full opacity-0' : ''}
          `}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {icons[notification.type]}
              </div>
              <div className="ml-3 w-0 flex-1">
                {notification.title && (
                  <p className="text-sm font-medium text-white">
                    {notification.title}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-300">
                  {notification.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="inline-flex text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          {notification.duration && (
            <div className="h-1 bg-cinema-dark rounded-b-lg overflow-hidden">
              <div
                className={`h-full ${
                  notification.type === 'error' ? 'bg-red-500' :
                  notification.type === 'success' ? 'bg-green-500' :
                  'bg-blue-500'
                } transition-all duration-300 ease-linear`}
                style={{
                  width: '100%',
                  animation: `shrink ${notification.duration}ms linear forwards`,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;