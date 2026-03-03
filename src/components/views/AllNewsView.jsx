import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { MOCK_NEWS } from '../../config/appConfig';

function NewsGrid({ news, limit, setNewsModal }) {
    const dataToRender = news.length > 0 ? news : MOCK_NEWS;
    return dataToRender.slice(0, limit || dataToRender.length).map(item => (
        <div key={item.id} onClick={() => setNewsModal(item)} className="bg-white dark:bg-[#050c17] border border-gray-200 dark:border-gray-800 hover:border-[#1a5bb8] dark:hover:border-[#fcd303] transition duration-300 flex flex-col h-full shadow-lg relative overflow-hidden rounded-2xl group cursor-pointer hover:-translate-y-1 hover:shadow-2xl">
            {item.isMock && <div className="absolute top-4 right-4 z-10 bg-white/90 text-gray-800 dark:bg-[#050c17]/90 dark:text-[#fcd303] text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow backdrop-blur-sm">Ejemplo</div>}
            <div className="h-1 bg-[#1a5bb8] dark:bg-[#fcd303] w-full relative z-10"></div>
            {item.img && <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"><img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" /></div>}
            <div className="p-6 md:p-8 flex-grow flex flex-col">
                <div className="text-[#1a5bb8] dark:text-[#fcd303] text-xs font-bold uppercase tracking-widest mb-3">{new Date(item.createdAt).toLocaleDateString('es-ES')}</div>
                <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-[#0a1930] dark:text-white uppercase mb-3 leading-tight group-hover:text-[#1a5bb8] dark:group-hover:text-[#fcd303] transition-colors">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed line-clamp-4 flex-grow">{item.content}</p>
                <div className="mt-4 flex items-center text-[#1a5bb8] dark:text-[#fcd303] font-bold text-xs uppercase tracking-widest gap-1 group-hover:underline">Leer más <ArrowRight size={14}/></div>
            </div>
        </div>
    ));
}

export default function AllNewsView({ news, setView, setNewsModal }) {
    return (
        <div className="pt-32 pb-24 min-h-screen animate-fade-in bg-gray-50 dark:bg-[#050c17] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => {setView('landing'); window.scrollTo(0,0);}} className="mb-10 text-gray-600 dark:text-gray-400 hover:text-[#1a5bb8] dark:hover:text-[#fcd303] flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition group bg-white dark:bg-gray-900 px-5 py-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" /> Regresar al Inicio
                </button>
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[12vw] font-['Oswald',sans-serif] font-black text-gray-200 dark:text-white/5 whitespace-nowrap z-0 pointer-events-none select-none">ACTUALIDAD</div>
                    <h2 className="font-['Oswald',sans-serif] text-5xl md:text-7xl font-black text-[#0a1930] dark:text-white uppercase tracking-wider mb-4 relative z-10">Todas las <span className="text-[#1a5bb8] dark:text-[#fcd303]">Noticias</span></h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg relative z-10 font-medium">Mantente al tanto de todos los comunicados y novedades del club.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <NewsGrid news={news} setNewsModal={setNewsModal} limit={100} />
                </div>
            </div>
        </div>
    );
}
