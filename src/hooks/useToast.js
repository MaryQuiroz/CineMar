import { create } from 'zustand';




const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    // Auto remove toast after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, toast.duration || 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export const useToast = () => {
  const { addToast, removeToast, toasts } = useToastStore();

  const showToast = (
    type,
    message,
    duration = 3000
  ) => {
    addToast({ type, message, duration });
  };

  return {
    toasts,
    showToast,
    removeToast,
  };
};

export default useToast;