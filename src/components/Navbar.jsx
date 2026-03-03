import React, { useState, useMemo } from 'react';
import { Menu, X, Sun, Moon, Lock, Trophy } from 'lucide-react';
import { DEFAULT_CONFIG, MOCK_NEWS } from '../config/appConfig';

export default function Navbar({ setView, theme, toggleTheme, config, news }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    
    // Simplemente mostrar indicador si hay noticias, sin filtro de fecha
    const hasRecentNews = useMemo(() => {
        const actualData = news.length > 0 ? news : MOCK_NEWS;
        return actualData.length > 0;
    }, [news]);

    const navLinkClass = "text-gray-700 dark:text-white hover:text-[#1a5bb8] dark:hover:text-[#fcd303] transition font-['Oswald',sans-serif] text-lg tracking-wider uppercase cursor-pointer";
    const navAction = (target, id = null) => { 
        setView(target); 
        setMobileOpen(false); 
        if(id) setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth'}), 100);
        else window.scrollTo(0,0);
    };

    return (
        <nav className="fixed w-full z-40 top-0 bg-white/95 dark:bg-[#0a1930]/95 backdrop-blur-md border-b-4 border-[#1a5bb8] dark:border-[#fcd303] transition-colors duration-300 shadow-md dark:shadow-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-20 items-center">
                <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => navAction('landing')}>
                    <div className="w-14 h-14 bg-[#fcd303] rounded-full p-0.5 flex items-center justify-center transform -translate-y-2 shadow-[0_4px_15px_rgba(252,211,3,0.3)] border-2 border-white dark:border-transparent transition duration-300 group-hover:scale-105">
                        <img src={config.imgShield || DEFAULT_CONFIG.imgShield} alt="Escudo" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-['Oswald',sans-serif] font-black text-2xl tracking-wide text-[#0a1930] dark:text-white uppercase leading-none group-hover:text-[#1a5bb8] dark:group-hover:text-[#fcd303] transition-colors">CD VyA</span>
                        <span className="text-xs text-[#1a5bb8] dark:text-[#2a75e6] font-bold tracking-widest uppercase">Villa María del Triunfo</span>
                    </div>
                </div>
                
                <div className="hidden md:flex space-x-8 items-center">
                    <button onClick={() => navAction('landing')} className={navLinkClass}>El Club</button>
                    <button onClick={() => navAction('landing', 'hinchada')} className={navLinkClass}>La Hinchada</button>
                    <button onClick={() => navAction('landing', 'noticias')} className={`${navLinkClass} relative flex items-center`}>
                        Noticias
                        {hasRecentNews && (
                            <span className="absolute -top-1 -right-3 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        )}
                    </button>
                    <button onClick={() => navAction('roster')} className={navLinkClass}>Plantilla</button>
                    <button onClick={() => navAction('landing', 'campeones')} className="text-[#1a5bb8] dark:text-[#fcd303] flex items-center gap-2 font-['Oswald',sans-serif] text-lg tracking-wider uppercase transition hover:scale-105 bg-[#1a5bb8]/10 dark:bg-[#fcd303]/10 px-3 py-1 rounded">
                        <Trophy size={20}/> Campeones '25
                    </button>
                    
                    <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-[#1a5bb8] dark:hover:text-white transition ml-2 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-full" title="Cambiar Tema">
                        {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
                    </button>
                    <button onClick={() => navAction('admin')} className="text-gray-500 dark:text-gray-400 hover:text-[#1a5bb8] dark:hover:text-white transition ml-1 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-full" title="Acceso Administrador">
                        <Lock size={20}/>
                    </button>
                </div>

                <div className="md:hidden flex items-center gap-3">
                    <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-full">
                        {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
                    </button>
                    <button onClick={() => navAction('admin')} className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-full">
                        <Lock size={20}/>
                    </button>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#0a1930] dark:text-white p-1">
                        {mobileOpen ? <X size={28}/> : <Menu size={28}/>}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden bg-white dark:bg-[#0a1930] border-t border-gray-200 dark:border-gray-800 font-['Oswald',sans-serif] uppercase tracking-wider shadow-lg flex flex-col text-center">
                    <button onClick={() => navAction('landing')} className="py-4 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-white">El Club</button>
                    <button onClick={() => navAction('landing', 'hinchada')} className="py-4 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-white">La Hinchada</button>
                    <button onClick={() => navAction('landing', 'noticias')} className="pay-4 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-white relative flex justify-center items-center">
                        Noticias
                        {hasRecentNews && (
                            <span className="relative flex h-2.5 w-2.5 ml-2 -top-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                        )}
                    </button>
                    <button onClick={() => navAction('roster')} className="py-4 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-white">Plantilla</button>
                    <button onClick={() => navAction('landing', 'campeones')} className="py-4 text-[#1a5bb8] dark:text-[#fcd303] bg-[#1a5bb8]/5 dark:bg-[#fcd303]/5">Campeones '25</button>
                </div>
            )}
        </nav>
    );
}
