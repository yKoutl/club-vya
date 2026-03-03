import React from 'react';
import { Mail, Phone, ChevronRight, Lock } from 'lucide-react';
import { DEFAULT_CONFIG } from '../config/appConfig';

export default function Footer({ config, setView }) {
    return (
        <footer className="bg-gray-100 dark:bg-[#030914] border-t-4 border-[#1a5bb8] dark:border-[#fcd303] pt-16 pb-6 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{background: 'repeating-linear-gradient(45deg, rgba(26,91,184,0.05), rgba(26,91,184,0.05) 10px, transparent 10px, transparent 20px)'}}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-gray-300 dark:border-gray-800/60 pb-12">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-14 h-14 bg-white p-0.5 rounded-full shadow-md"><img src={config.imgShield || DEFAULT_CONFIG.imgShield} alt="VyA" className="w-full h-full object-cover rounded-full" /></div>
                            <div className="flex flex-col"><span className="font-['Oswald',sans-serif] font-black text-2xl text-[#0a1930] dark:text-white uppercase leading-none">CD VyA</span><span className="text-[10px] text-[#1a5bb8] dark:text-[#fcd303] font-bold tracking-widest uppercase">Est. 1983</span></div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">El gigante de Villa María del Triunfo. Forjando talentos y defendiendo colores con garra.</p>
                    </div>
                    <div>
                        <h4 className="font-['Oswald',sans-serif] text-[#0a1930] dark:text-white text-xl uppercase tracking-widest mb-6 border-l-2 border-[#1a5bb8] dark:border-[#fcd303] pl-3">El Club</h4>
                        <ul className="space-y-3 text-sm">
                            <li><button onClick={()=>{setView('landing'); window.scrollTo(0,0)}} className="text-gray-600 dark:text-gray-400 hover:text-[#1a5bb8] flex items-center gap-2"><ChevronRight size={16} className="text-[#1a5bb8]"/> Inicio</button></li>
                            <li><button onClick={()=>{setView('roster'); window.scrollTo(0,0)}} className="text-gray-600 dark:text-gray-400 hover:text-[#1a5bb8] flex items-center gap-2"><ChevronRight size={16} className="text-[#1a5bb8]"/> Plantilla</button></li>
                            <li><button onClick={()=>{setView('news'); window.scrollTo(0,0)}} className="text-gray-600 dark:text-gray-400 hover:text-[#1a5bb8] flex items-center gap-2"><ChevronRight size={16} className="text-[#1a5bb8]"/> Noticias</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-['Oswald',sans-serif] text-[#0a1930] dark:text-white text-xl uppercase tracking-widest mb-6 border-l-2 border-[#1a5bb8] dark:border-[#fcd303] pl-3">Contacto</h4>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex gap-3"><Mail className="text-[#1a5bb8] flex-shrink-0" size={20}/> contacto@cdvya.com</li>
                            <li className="flex gap-3"><Phone className="text-[#1a5bb8] flex-shrink-0" size={20}/> +51 987 654 321</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
                    <p>&copy; 2026 Club Deportivo VyA.</p>
                    <div className="flex gap-4">
                        <button onClick={()=>{setView('admin'); window.scrollTo(0,0)}} className="hover:text-[#1a5bb8] dark:hover:text-[#fcd303] transition flex items-center gap-1"><Lock size={14}/> Intranet Directiva</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
