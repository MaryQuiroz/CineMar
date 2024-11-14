// components/ui/sheet.jsx
import React from 'react';
import { X } from 'lucide-react';

const Sheet = ({ children, open, onOpenChange }) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      {React.Children.map(children, child =>
        React.cloneElement(child, { onOpenChange })
      )}
    </>
  );
};

const SheetTrigger = ({ children, asChild, onClick }) => {
  if (asChild) {
    return React.Children.map(children, child =>
      React.cloneElement(child, { onClick })
    );
  }
  return <button onClick={onClick}>{children}</button>;
};

const SheetContent = ({ 
  children, 
  side = 'right',
  className = '',
  onOpenChange 
}) => {
  const sideStyles = {
    right: 'right-0 h-full w-3/4 max-w-sm translate-x-0',
    left: 'left-0 h-full w-3/4 max-w-sm -translate-x-0',
    top: 'top-0 w-full h-3/4 -translate-y-0',
    bottom: 'bottom-0 w-full h-[90vh] translate-y-0'
  };

  return (
    <div 
      className={`
        fixed z-50 
        ${sideStyles[side]}
        ${className}
        transition-transform duration-300 ease-in-out
      `}
    >
      <div className="h-full overflow-auto p-6 bg-cinema-dark text-white rounded-t-xl">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const SheetHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const SheetTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold ${className}`}>
    {children}
  </h2>
);

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
};