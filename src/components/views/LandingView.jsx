import React from 'react';
import { createMarkup } from '../../utils/helpers';
import { ArrowRight, Calendar, Users, Medal, Camera, Zap, ShieldCheck, MessageSquare, UserPlus, Phone, Copy, Heart, Quote, Reply, Trophy } from 'lucide-react';
import { MOCK_NEWS, MOCK_COMMENTS } from '../../config/appConfig';

// Componentes auxiliares movidos fuera de LandingView
const NewsGrid = ({ news, limit, setNewsModal }) => {
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
};

const CommentsGrid = ({ comments, limit, realUser, setAuthModal, setCommentModal, setReplyingTo }) => {
    const dataToRender = comments.length > 0 ? comments : MOCK_COMMENTS;
    const displayData = limit ? dataToRender.slice(0, limit) : dataToRender;
        
        if(dataToRender.length === 0) return <div className="col-span-full text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-500">La tribuna está vacía. ¡Sé el primero!</div>;
        
        const handleLike = async (commentId) => {
            if (!realUser) {
                setAuthModal(true);
                return;
            }
            console.log('Like:', commentId);
        };
        
        const handleReply = (comment) => {
            if (!realUser) {
                setAuthModal(true);
                return;
            }
            setReplyingTo(comment);
            setCommentModal(true);
        };
        
        return displayData.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-[#0a1930] border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl hover:border-[#1a5bb8] dark:hover:border-[#fcd303] transition-all duration-300 relative flex flex-col h-full group hover:-translate-y-2 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a5bb8]/0 to-[#fcd303]/0 group-hover:from-[#1a5bb8]/5 group-hover:to-[#fcd303]/5 dark:group-hover:from-[#1a5bb8]/10 dark:group-hover:to-[#fcd303]/10 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                <div className="text-gray-300 dark:text-[#fcd303]/20 mb-4 transform group-hover:scale-125 group-hover:rotate-6 group-hover:text-[#1a5bb8] dark:group-hover:text-[#fcd303] transition-all duration-500 origin-top-left relative z-10"><Quote size={36} className="rotate-180"/></div>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-base md:text-lg leading-relaxed flex-grow mb-6 italic relative z-10 group-hover:text-[#0a1930] dark:group-hover:text-white transition-colors duration-300">"{item.text}"</p>
                <div className="flex items-center justify-between gap-4 mt-auto pt-5 border-t border-gray-200 dark:border-gray-700/50 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#1a5bb8] to-[#2a75e6] dark:from-[#fcd303] dark:to-[#f6c000] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white dark:text-[#0a1930] text-xl border-2 border-white dark:border-[#fcd303] shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">{item.author.charAt(0).toUpperCase()}</div>
                        <div>
                            <span className="font-bold text-[#0a1930] dark:text-white block text-lg leading-tight mb-1">{item.author}</span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded uppercase tracking-widest block w-max">{new Date(item.createdAt).toLocaleDateString('es-ES')}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => handleLike(item.id)}
                            className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 hover:scale-110 hover:shadow-md active:scale-95"
                            title="Me gusta"
                        >
                            <Heart size={18} className={`${item.liked ? 'fill-red-500 text-red-500' : ''} transition-transform hover:scale-125`} />
                            <span className="text-xs font-bold">{item.likes || 0}</span>
                        </button>
                        <button 
                            onClick={() => handleReply(item)}
                            className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-[#1a5bb8] dark:hover:text-[#fcd303] transition-all duration-300 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:scale-110 hover:shadow-md active:scale-95"
                            title="Responder"
                        >
                            <Reply size={18} className="transition-transform hover:-rotate-12" />
                        </button>
                    </div>
                </div>
                {item.replies && item.replies.length > 0 && (
                    <div className="mt-4 pl-6 border-l-2 border-gray-300 dark:border-gray-700 group-hover:border-[#1a5bb8] dark:group-hover:border-[#fcd303] transition-colors duration-300 space-y-3 relative z-10">
                        {item.replies.slice(0, 2).map((reply, idx) => (
                            <div key={idx} className="text-sm bg-gray-100 dark:bg-gray-800/50 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200">
                                <span className="font-bold text-[#1a5bb8] dark:text-[#fcd303]">{reply.author}</span>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">{reply.text}</span>
                            </div>
                        ))}
                        {item.replies.length > 2 && (
                            <button className="text-xs text-[#1a5bb8] dark:text-[#fcd303] hover:underline font-bold hover:translate-x-1 transition-transform duration-200 inline-block">
                                Ver {item.replies.length - 2} respuestas más →
                            </button>
                        )}
                    </div>
                )}
            </div>
        ));
};

const PlayerCardPreview = ({ num, role, name, img, setView }) => (
        <div className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer" onClick={() => {setView('roster'); window.scrollTo(0,0);}}>
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

export default function LandingView({ config, news, comments, setView, setAuthModal, setCommentModal, realUser, setNewsModal, setReplyingTo, setSocioModal, showToast }) {
    return (
        <div className="animate-fade-in">
            {/* HERO */}
            <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden bg-white dark:bg-[#0a1930] clip-slant transition-colors duration-300">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent dark:from-[#050c17] dark:to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[30vw] font-['Oswald',sans-serif] font-black text-gray-100 dark:text-white/5 whitespace-nowrap z-0 pointer-events-none select-none">VYA</div>
                
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center mt-10">
                    <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
                        <div className="absolute inset-0 bg-[#1a5bb8] blur-[40px] opacity-20 dark:blur-[60px] dark:opacity-50 rounded-full"></div>
                        <img src={config.imgShield} alt="Escudo" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                    <h2 className="font-['Oswald',sans-serif] text-[#1a5bb8] dark:text-[#fcd303] text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-2">{config.heroSub}</h2>
                    <h1 className="font-['Oswald',sans-serif] text-6xl md:text-8xl font-black text-[#0a1930] dark:text-white uppercase leading-none tracking-tight mb-6" dangerouslySetInnerHTML={createMarkup(config.heroTitle)}></h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium mb-10 border-l-4 border-[#1a5bb8] dark:border-[#fcd303] pl-4 text-left" dangerouslySetInnerHTML={createMarkup(config.heroText)}></p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={()=> document.getElementById('campeones').scrollIntoView({behavior:'smooth'})} className="bg-[#fcd303] text-[#0a1930] font-['Oswald',sans-serif] font-bold text-xl uppercase tracking-wider py-3 px-8 hover:bg-[#1a5bb8] hover:text-white dark:hover:bg-white dark:hover:text-[#0a1930] transition duration-300 shadow-lg">Ver Título 2025</button>
                        <button onClick={()=> document.getElementById('hinchada').scrollIntoView({behavior:'smooth'})} className="bg-[#1a5bb8] dark:bg-transparent border-2 border-[#1a5bb8] dark:border-white text-white font-['Oswald',sans-serif] font-bold text-xl uppercase tracking-wider py-3 px-8 hover:bg-[#0a1930] dark:hover:bg-white dark:hover:text-[#0a1930] transition duration-300 shadow-lg">La Hinchada</button>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="relative z-20 mt-4 max-w-6xl mx-auto md:px-4 mb-20">
                <div className="shadow-2xl flex flex-col md:flex-row overflow-hidden border-4 border-[#fcd303]">
                    <div className="flex-1 p-6 md:p-8 text-center bg-[#1a5bb8] hover:bg-[#0a1930] transition duration-300">
                        <Calendar className="w-10 h-10 md:w-12 md:h-12 mx-auto text-[#fcd303] mb-3 md:mb-4" />
                        <h3 className="font-['Oswald',sans-serif] text-5xl md:text-6xl font-black text-white mb-1 md:mb-2">{config.statV1}</h3>
                        <p className="font-bold text-[#fcd303] uppercase tracking-widest text-xs md:text-xs">{config.statT1}</p>
                    </div>
                    <div className="flex-1 p-6 md:p-8 text-center bg-[#1a5bb8] hover:bg-[#0a1930] transition duration-300 border-t md:border-t-0 md:border-l-4 border-[#fcd303]">
                        <Users className="w-10 h-10 md:w-12 md:h-12 mx-auto text-[#fcd303] mb-3 md:mb-4" />
                        <h3 className="font-['Oswald',sans-serif] text-5xl md:text-6xl font-black text-white mb-1 md:mb-2">{config.statV2}</h3>
                        <p className="font-bold text-[#fcd303] uppercase tracking-widest text-xs md:text-xs">{config.statT2}</p>
                    </div>
                    <div className="flex-1 p-6 md:p-8 text-center bg-[#fcd303] hover:bg-yellow-400 transition duration-300 border-t md:border-t-0 md:border-l-4 border-[#0a1930]">
                        <Medal className="w-10 h-10 md:w-12 md:h-12 mx-auto text-[#0a1930] mb-3 md:mb-4" />
                        <h3 className="font-['Oswald',sans-serif] text-5xl md:text-6xl font-black text-[#0a1930] mb-1 md:mb-2">{config.statV3}</h3>
                        <p className="font-bold text-[#0a1930]/70 uppercase tracking-widest text-xs md:text-xs">{config.statT3}</p>
                    </div>
                </div>
            </section>

            {/* IDENTIDAD */}
            <section id="hinchada" className="py-20 relative bg-gray-100 dark:bg-[#050c17] transition-colors duration-300">
                <div className="absolute inset-0 bg-stripes-sports"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4"><div className="w-12 h-1 bg-[#1a5bb8]"></div><span className="font-['Oswald',sans-serif] text-[#1a5bb8] dark:text-[#fcd303] text-xl uppercase tracking-widest">Identidad</span></div>
                            <h2 className="font-['Oswald',sans-serif] text-5xl md:text-6xl font-black text-[#0a1930] dark:text-white uppercase leading-tight mb-6" dangerouslySetInnerHTML={createMarkup(config.idTitle)}></h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed" dangerouslySetInnerHTML={createMarkup(config.idP1)}></p>
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed" dangerouslySetInnerHTML={createMarkup(config.idP2)}></p>
                            <button onClick={()=> document.getElementById('comentarios').scrollIntoView({behavior:'smooth'})} className="flex items-center justify-center gap-2 border-2 border-[#1a5bb8] text-[#1a5bb8] hover:bg-[#1a5bb8] hover:text-white dark:border-[#fcd303] dark:text-[#fcd303] font-['Oswald',sans-serif] font-bold text-lg uppercase px-6 py-3 dark:hover:bg-[#fcd303] dark:hover:text-[#050c17] transition w-full sm:w-auto">
                                <Users size={24}/> Únete a la Hinchada
                            </button>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-white dark:bg-[#0a1930] border border-gray-200 dark:border-gray-800 p-4 transform rotate-3 hover:rotate-0 transition duration-500 shadow-2xl">
                                <div className="w-full h-full bg-gray-100 dark:bg-[#050c17] flex flex-col items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition duration-500 grayscale group-hover:grayscale-0 mix-blend-luminosity" style={{backgroundImage: `url('${config.imgIdent}')`}}></div>
                                    <div className="relative z-10 text-center bg-white/80 dark:bg-[#050c17]/80 p-4 rounded backdrop-blur-sm">
                                        <Camera className="w-12 h-12 text-[#1a5bb8] dark:text-[#fcd303] mx-auto mb-2 opacity-80" />
                                        <span className="font-['Oswald',sans-serif] text-xl text-[#0a1930] dark:text-white uppercase tracking-wider block">El Primer Equipo</span>
                                        <span className="text-[#1a5bb8] dark:text-[#fcd303] font-bold uppercase text-xs">Dándolo todo en la cancha</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#1a5bb8]/20 rounded-full blur-2xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NOTICIAS (RESUMEN) */}
            <section id="noticias" className="py-20 bg-gray-50 dark:bg-[#0a1930] relative border-t-4 border-[#1a5bb8] dark:border-[#fcd303] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex justify-between items-end mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h2 className="font-['Oswald',sans-serif] text-4xl md:text-5xl font-black text-[#0a1930] dark:text-white uppercase tracking-wider">Últimas <span className="text-[#1a5bb8] dark:text-[#fcd303]">Noticias</span></h2>
                        <button onClick={() => { setView('news'); window.scrollTo(0,0); }} className="hidden md:flex text-[#1a5bb8] dark:text-[#fcd303] font-bold uppercase tracking-widest text-sm hover:underline items-center gap-2 transition">
                            Ver todas <ArrowRight size={16}/>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <NewsGrid news={news} limit={3} setNewsModal={setNewsModal} />
                    </div>
                    <button onClick={() => { setView('news'); window.scrollTo(0,0); }} className="mt-10 md:hidden bg-[#0a1930] dark:bg-gray-800 text-white font-['Oswald',sans-serif] font-bold uppercase tracking-wider py-3 px-8 rounded shadow-lg w-full">
                        Ver todas las noticias
                    </button>
                </div>
            </section>

            {/* PLANTILLA PREVIEW */}
            <section id="plantilla" className="py-24 bg-gray-50 dark:bg-[#050c17] relative border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-300 dark:border-gray-800 pb-6">
                        <div>
                            <h2 className="font-['Oswald',sans-serif] text-4xl md:text-5xl font-black text-[#0a1930] dark:text-white uppercase tracking-wider">Nuestra <span className="text-[#1a5bb8] dark:text-[#fcd303]">Plantilla</span></h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">Los guerreros que defienden nuestros colores en la cancha.</p>
                        </div>
                        <div className="hidden md:block">
                            <button onClick={() => {setView('roster'); window.scrollTo(0,0)}} className="text-[#1a5bb8] dark:text-[#fcd303] font-bold uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
                                Ver equipo completo <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        <PlayerCardPreview num="" role="Director Técnico" name="Carlos Mendoza" img="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop" />
                        <PlayerCardPreview num="01" role="Titular" name="Luis García" img="https://images.unsplash.com/photo-1600250395178-40fe752e5189?q=80&w=600&auto=format&fit=crop" />
                        <PlayerCardPreview num="02" role="Central" name="Diego Ramírez" img="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&auto=format&fit=crop" />
                        <PlayerCardPreview num="09" role="Centro" name="Hugo Castillo" img="https://images.unsplash.com/photo-1551280857-2b9bbe5240f5?q=80&w=600&auto=format&fit=crop" />
                    </div>
                    
                    <div className="mt-8 text-center md:hidden">
                        <button onClick={() => {setView('roster'); window.scrollTo(0,0)}} className="bg-[#0a1930] dark:bg-gray-800 text-white font-['Oswald',sans-serif] font-bold uppercase tracking-wider py-3 px-8 rounded shadow-lg w-full">
                            Ver equipo completo
                        </button>
                    </div>
                </div>
            </section>

            {/* CAMPEONES */}
            <section id="campeones" className="py-24 bg-[#fcd303] clip-slant-reverse relative mt-10">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="max-w-6xl mx-auto px-4 relative z-10 text-center text-[#0a1930]">
                    <div className="w-24 h-24 mx-auto mb-6 text-[#0a1930]"><svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></div>
                    <h3 className="font-['Oswald',sans-serif] text-2xl font-bold uppercase tracking-[0.3em] mb-2 border-b-2 border-[#0a1930]/30 inline-block pb-1">Temporada Histórica</h3>
                    <h2 className="font-['Oswald',sans-serif] text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8" dangerouslySetInnerHTML={createMarkup(config.champTitle)}></h2>
                    <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-12" dangerouslySetInnerHTML={createMarkup(config.champText)}></p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 text-left">
                        <div className="bg-white dark:bg-[#050c17] p-8 rounded-2xl border-l-8 border-[#1a5bb8] dark:border-[#fcd303] shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(26,91,184,0.2)] dark:hover:shadow-[0_20px_40px_rgba(252,211,3,0.15)] group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                <Zap className="w-20 h-20 text-[#1a5bb8] dark:text-[#fcd303]"/>
                            </div>
                            <h4 className="font-['Oswald',sans-serif] text-3xl font-black mb-3 uppercase text-[#0a1930] dark:text-white group-hover:text-[#1a5bb8] dark:group-hover:text-[#fcd303] transition-colors relative z-10">Ataque Letal</h4>
                            <p className="font-medium text-gray-600 dark:text-gray-300 relative z-10">Fuimos la delantera más temida del campeonato. Goles que gritaron hasta el último rincón del distrito.</p>
                        </div>
                        <div className="bg-white dark:bg-[#050c17] p-8 rounded-2xl border-l-8 border-[#1a5bb8] dark:border-[#fcd303] shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(26,91,184,0.2)] dark:hover:shadow-[0_20px_40px_rgba(252,211,3,0.15)] group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                <ShieldCheck className="w-20 h-20 text-[#1a5bb8] dark:text-[#fcd303]"/>
                            </div>
                            <h4 className="font-['Oswald',sans-serif] text-3xl font-black mb-3 uppercase text-[#0a1930] dark:text-white group-hover:text-[#1a5bb8] dark:group-hover:text-[#fcd303] transition-colors relative z-10">Muralla Azul</h4>
                            <p className="font-medium text-gray-600 dark:text-gray-300 relative z-10">Defender la camiseta literalmente. La portería menos batida de la temporada gracias a nuestra defensa de hierro.</p>
                        </div>
                        <div className="bg-[#0a1930] dark:bg-[#081224] p-8 rounded-2xl border-l-8 border-[#fcd303] shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(10,25,48,0.5)] dark:hover:shadow-[0_20px_40px_rgba(252,211,3,0.15)] group relative overflow-hidden transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                <Users className="w-20 h-20 text-[#fcd303]"/>
                            </div>
                            <h4 className="font-['Oswald',sans-serif] text-3xl font-black mb-3 uppercase text-[#fcd303] transition-colors relative z-10">La Hinchada</h4>
                            <p className="font-medium text-blue-100 dark:text-gray-300 relative z-10">El aliento constante. Este campeonato es dedicado a los 1,300 guerreros que nos alentaron siempre.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMENTARIOS */}
            <section id="comentarios" className="py-20 bg-white dark:bg-[#050c17] relative transition-colors duration-300 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 className="font-['Oswald',sans-serif] text-4xl font-black text-[#0a1930] dark:text-white uppercase tracking-wider mb-8 text-center">La Voz del <span className="text-[#1a5bb8]">Hincha</span></h2>
                    <div className="text-center mb-12">
                        <button onClick={() => realUser ? setCommentModal(true) : setAuthModal(true)} className="bg-[#1a5bb8] text-white font-['Oswald',sans-serif] font-bold uppercase tracking-wider py-4 px-10 text-xl hover:bg-[#0a1930] dark:hover:bg-[#fcd303] dark:hover:text-[#0a1930] transition duration-300 transform hover:scale-105 shadow-xl">
                            Dejar un Comentario
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <CommentsGrid comments={comments} limit={3} realUser={realUser} setAuthModal={setAuthModal} setCommentModal={setCommentModal} setReplyingTo={setReplyingTo} />
                    </div>
                    <div className="text-center mt-10">
                        <button onClick={() => {setView('comments'); window.scrollTo(0,0);}} className="bg-white dark:bg-gray-800 text-[#0a1930] dark:text-white font-['Oswald',sans-serif] font-bold uppercase tracking-wider py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-[#1a5bb8] dark:border-[#fcd303] hover:bg-[#1a5bb8] hover:text-white dark:hover:bg-[#fcd303] dark:hover:text-[#0a1930] flex items-center justify-center gap-2 mx-auto">
                            <MessageSquare size={20} /> Ver Todos los Comentarios
                        </button>
                    </div>
                </div>
            </section>

            {/* SOCIOS CTA */}
            <section className="py-24 bg-[#1a5bb8] dark:bg-[#0a1930] relative border-t-4 border-[#fcd303] overflow-hidden transition-colors duration-300">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 dark:opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1930]/50 to-transparent dark:from-[#1a5bb8]/30 opacity-30"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-white/95 dark:bg-[#050c17]/90 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-8 md:p-12 order-2 md:order-1">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a5bb8] dark:bg-[#fcd303] rounded-full text-white dark:text-[#0a1930] mb-6 shadow-lg">
                                <UserPlus size={32} />
                            </div>
                            <h2 className="font-['Oswald',sans-serif] text-4xl md:text-5xl font-black text-[#0a1930] dark:text-white uppercase tracking-tight mb-4 leading-tight">{config.socioTitle}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium leading-relaxed mb-8">{config.socioText}</p>
                            <button onClick={() => realUser ? setSocioModal(true) : setAuthModal(true)} className="bg-[#fcd303] hover:bg-[#e6b800] text-[#0a1930] font-['Oswald',sans-serif] font-bold text-xl uppercase tracking-wider py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full md:w-auto flex items-center justify-center gap-3">
                                <UserPlus size={24} />
                                Quiero ser Socio
                            </button>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[400px] order-1 md:order-2">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a5bb8]/20 to-transparent z-10"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop" 
                                alt="Hinchada VyA" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN DE DONACIONES */}
            <section className="py-24 bg-white dark:bg-[#050c17] relative overflow-hidden transition-colors duration-300">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-30"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1a5bb8] to-[#0a1930] dark:from-[#fcd303] dark:to-[#f0a500] rounded-full text-white dark:text-[#0a1930] mb-6 shadow-2xl">
                                <Heart size={36} />
                            </div>
                            <h2 className="font-['Oswald',sans-serif] text-4xl md:text-5xl font-black text-[#0a1930] dark:text-white uppercase tracking-tight mb-4">
                                Apoya al Club
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium max-w-2xl mx-auto">
                                Tu donación nos ayuda a seguir creciendo y forjando campeones
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                            {/* QR Code y Yape/Plin */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0a1930] p-8 rounded-2xl border-2 border-[#1a5bb8] dark:border-[#fcd303] shadow-2xl">
                                <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-[#0a1930] dark:text-white uppercase mb-6 text-center flex items-center justify-center gap-2">
                                    <Phone size={24} className="text-[#1a5bb8] dark:text-[#fcd303]"/>
                                    Yape / Plin
                                </h3>
                                
                                {/* QR Code */}
                                <div className="bg-white p-6 rounded-xl mb-6 shadow-inner">
                                    <div className="w-64 h-64 mx-auto bg-white rounded-xl flex items-center justify-center overflow-hidden border-4 border-[#1a5bb8] dark:border-[#fcd303]">
                                        <img 
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=987654321&bgcolor=ffffff&color=0a1930&qzone=2"
                                            alt="QR Code Yape/Plin"
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="text-center text-xs text-gray-600 font-bold mt-3">
                                        Escanea para donar vía Yape/Plin
                                    </p>
                                </div>

                                <div className="bg-[#1a5bb8]/10 dark:bg-[#fcd303]/10 p-4 rounded-xl border border-[#1a5bb8]/20 dark:border-[#fcd303]/20">
                                    <p className="text-center text-sm text-gray-700 dark:text-gray-300 font-bold mb-2">
                                        Número para Yape/Plin:
                                    </p>
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard?.writeText('987654321');
                                            showToast('Número de Yape/Plin copiado');
                                        }}
                                        className="w-full hover:scale-105 transition-transform"
                                    >
                                        <p className="text-center text-2xl font-['Oswald',sans-serif] font-black text-[#1a5bb8] dark:text-[#fcd303]">
                                            987 654 321
                                        </p>
                                        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Club Deportivo VyA
                                        </p>
                                        <p className="text-center text-xs text-[#1a5bb8] dark:text-[#fcd303] mt-1 font-bold flex items-center justify-center gap-1">
                                            <Copy size={12}/>
                                            Click para copiar
                                        </p>
                                    </button>
                                </div>
                            </div>

                            {/* Agradecimiento */}
                            <div className="bg-gradient-to-r from-[#1a5bb8] to-[#0a1930] dark:from-[#fcd303] dark:to-[#f0a500] p-8 rounded-2xl text-center shadow-2xl h-full flex flex-col items-center justify-center relative overflow-hidden">
                                {/* Imagen de fondo hinchada */}
                                <div className="absolute inset-0 opacity-20 dark:opacity-15">
                                    <img 
                                        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop" 
                                        alt="Hinchada" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="relative z-10">
                                    <Heart size={48} className="text-white dark:text-[#0a1930] mb-4 mx-auto"/>
                                    <h3 className="font-['Oswald',sans-serif] text-2xl md:text-3xl font-black text-white dark:text-[#0a1930] uppercase mb-3">
                                        ¡Gracias {realUser?.displayName?.split(' ')[0] || 'Hincha'}!
                                    </h3>
                                    <p className="text-white/90 dark:text-[#0a1930]/90 text-lg font-medium">
                                        Tu apoyo es fundamental para seguir escribiendo la historia del club más grande de VMT
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    );
}
