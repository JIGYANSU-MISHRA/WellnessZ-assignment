import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';
import Card from './Card';

const Modal = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    // Lock body scroll when modal is open so background doesn't move
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Do not render anything when the modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className={cn("relative w-full max-w-lg transform transition-all", className)}>
         <Card className="shadow-2xl border-neutral-200">
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              {children}
            </div>
         </Card>
      </div>
    </div>
  );
};

export default Modal;
