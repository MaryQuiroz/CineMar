import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import useToast from '../../hooks/useToast';

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
};

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg 
                ${toastStyles[toast.type]}
                backdrop-blur-sm min-w-[300px] max-w-md
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm flex-grow">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
                aria-label="Cerrar notificación"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// ToastProvider component to wrap the app
export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toast />
    </>
  );
};

export default Toast;