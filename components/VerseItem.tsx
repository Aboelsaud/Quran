import React from 'react';
import { VerseProps } from '../types';

const VerseItem: React.FC<VerseProps> = ({ text, number }) => {
  return (
    <div className="mb-8 w-full">
        <div className="relative group">
            <p 
                className="text-2xl md:text-3xl lg:text-4xl text-right leading-[2.2] md:leading-[2.4] font-['Amiri'] text-slate-200"
                dir="rtl"
            >
                {text}
                <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mx-2 align-middle bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm md:text-lg font-sans pt-1">
                    {number}
                </span>
            </p>
        </div>
        
        {/* Decorative separator */}
        <div className="w-full flex justify-center mt-6 opacity-20">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
        </div>
    </div>
  );
};

export default VerseItem;