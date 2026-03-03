import React from 'react';
import { ArrowLeft, MessageSquare, Quote, Heart, Reply } from 'lucide-react';
import { MOCK_COMMENTS } from "../../config/appConfig";

function CommentsGrid({ comments, limit, realUser, setAuthModal, setCommentModal, setReplyingTo }) {
    const dataToRender = comments.length > 0 ? comments : MOCK_COMMENTS;
    const displayData = limit ? dataToRender.slice(0, limit) : dataToRender;
    
    if(dataToRender.length === 0) return <div className="col-span-full text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-500">La tribuna está vacía. ¡Sé el primero!</div>;
    
    const handleLike = async (commentId) => {
        if (!realUser) {
            setAuthModal(true);
            return;
        }
        // TODO: Implementar like en Firebase
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
}

export default function AllCommentsView({ comments, setView, realUser, setAuthModal, setCommentModal, setReplyingTo }) {
    return (
        <div className="pt-32 pb-24 min-h-screen animate-fade-in bg-gray-50 dark:bg-[#050c17] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => {setView('landing'); window.scrollTo(0,0);}} className="mb-10 text-gray-600 dark:text-gray-400 hover:text-[#1a5bb8] dark:hover:text-[#fcd303] flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition group bg-white dark:bg-gray-900 px-5 py-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" /> Regresar al Inicio
                </button>
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[12vw] font-['Oswald',sans-serif] font-black text-gray-200 dark:text-white/5 whitespace-nowrap z-0 pointer-events-none select-none">LA HINCHADA</div>
                    <h2 className="font-['Oswald',sans-serif] text-5xl md:text-7xl font-black text-[#0a1930] dark:text-white uppercase tracking-wider mb-4 relative z-10">La Voz del <span className="text-[#1a5bb8] dark:text-[#fcd303]">Hincha</span></h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg relative z-10 font-medium mb-8">Todos los mensajes de nuestra apasionada hinchada.</p>
                    <button onClick={() => realUser ? setCommentModal(true) : setAuthModal(true)} className="bg-[#1a5bb8] text-white font-['Oswald',sans-serif] font-bold uppercase tracking-wider py-4 px-10 text-lg hover:bg-[#0a1930] dark:hover:bg-[#fcd303] dark:hover:text-[#0a1930] transition duration-300 shadow-xl rounded-xl inline-flex items-center gap-2">
                        <MessageSquare size={20} /> Dejar un Comentario
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <CommentsGrid comments={comments} realUser={realUser} setAuthModal={setAuthModal} setCommentModal={setCommentModal} setReplyingTo={setReplyingTo} />
                </div>
            </div>
        </div>
    );
}
