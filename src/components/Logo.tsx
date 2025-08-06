import React from 'react';
import { Scissors } from 'lucide-react';

const Logo = () => {
  return (
    <div className="relative">
      <Scissors 
        size={32} 
        className="text-white transform -rotate-45"
      />
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-400 rounded-full" />
    </div>
  );
};

export default Logo;