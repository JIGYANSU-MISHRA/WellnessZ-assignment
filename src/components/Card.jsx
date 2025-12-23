import React from 'react';
import { cn } from '../utils/cn';

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-sm overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
