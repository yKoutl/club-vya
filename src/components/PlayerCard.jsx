import React from 'react';

const PlayerCard = ({ num, role, name, img }) => (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
        <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
            {num && <div className="absolute top-4 right-4 z-20 font-['Oswald',sans-serif] text-4xl font-black text-white/50 group-hover:text-[#fcd303] transition-colors">{num}</div>}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1930] via-[#0a1930]/40 to-transparent opacity-90 z-10"></div>
            <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500 transform group-hover:scale-110" alt={name} />
            <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                <span className="bg-[#1a5bb8] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-2 inline-block">{role}</span>
                <h3 className="font-['Oswald',sans-serif] text-2xl font-black text-white uppercase leading-none">{name.split(' ')[0]}<br/>{name.split(' ')[1] || ''}</h3>
            </div>
        </div>
    </div>
);

export default PlayerCard;
