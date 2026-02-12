import React from 'react';

interface LoadingSpinnerProps {
  label?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ label = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-600/10 border-t-blue-500 rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
      </div>
    </div>
    <p className="mt-6 text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">
      {label}
    </p>
  </div>
);

export default LoadingSpinner;
