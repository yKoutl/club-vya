import React from 'react';
import { signInWithPopup, signOut, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { 
    X, Users, Reply, Heart, MessageSquare, Calendar, Newspaper, 
    Trophy, Medal, ShieldCheck, UserPlus, Send 
} from 'lucide-react';
import { auth, db, appId } from '../config/firebaseConfig';

export default function Modals({ authModal, setAuthModal, commentModal, setCommentModal, socioModal, setSocioModal, realUser, showToast, replyingTo, setReplyingTo }) {
    
    const loginGoogle = async () => { setAuthModal(false); try { await signInWithPopup(auth, new GoogleAuthProvider()); setCommentModal(true); } catch(e) { console.error(e); } };
    const loginFacebook = async () => { setAuthModal(false); try { await signInWithPopup(auth, new FacebookAuthProvider()); setCommentModal(true); } catch(e) { console.error(e); } };
    
    const submitSocioRequest = async (e) => {
        e.preventDefault();
        const formData = {
            nombre: realUser?.displayName || 'Usuario',
            email: realUser?.email || 'sin-email@example.com',
            telefono: e.target.telefono.value,
            dni: e.target.dni.value,
            mensaje: e.target.mensaje?.value || '',
            userId: realUser?.uid,
            photoURL: realUser?.photoURL || '',
            status: 'pendiente',
            createdAt: Date.now()
        };
        try {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'socioRequests'), formData);
            setSocioModal(false);
            showToast("Solicitud enviada. Te contactaremos pronto.");
            e.target.reset();
        } catch(err) {
            console.error(err);
            showToast("Error al enviar solicitud", true);
        }
    };
    
    const postComment = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        try { 
            const commentData = {
                author: realUser?.displayName || 'Hincha Oficial', 
                text, 
                createdAt: Date.now(),
                likes: 0
            };
            
            if (replyingTo) {
                commentData.replyTo = replyingTo.id;
                commentData.replyToAuthor = replyingTo.author;
            }
            
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'comments'), commentData); 
            e.target.reset(); 
            setCommentModal(false); 
            setReplyingTo(null);
            showToast(replyingTo ? "Respuesta publicada" : "Mensaje publicado"); 
        } 
        catch { showToast("Error", true); }
    };

    return (
        <>
            {/* Modal de autenticación */}
            {authModal && (
                <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-gradient-to-br from-white via-white to-gray-50 dark:from-[#0a1930] dark:via-[#0a1930] dark:to-[#050c17] border-2 border-gray-200 dark:border-[#1a5bb8]/30 rounded-3xl p-10 max-w-md w-full text-center relative shadow-[0_20px_60px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_60px_rgba(26,91,184,0.3)] transform animate-scale-in">
                        <button onClick={() => setAuthModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-[#0a1930] dark:hover:text-white bg-gray-100/80 dark:bg-gray-800/80 rounded-full p-2.5 hover:rotate-90 transition-all duration-300 backdrop-blur-sm"><X size={18}/></button>
                        
                        <div className="mb-8">
                            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#1a5bb8] to-[#2a75e6] dark:from-[#fcd303] dark:to-[#f6c000] rounded-full flex items-center justify-center shadow-lg">
                                <Users className="w-10 h-10 text-white dark:text-[#0a1930]" />
                            </div>
                            <h3 className="font-['Oswald',sans-serif] text-3xl md:text-4xl font-black text-[#0a1930] dark:text-white uppercase leading-tight tracking-tight mb-3">
                                Únete a la<br/><span className="text-[#1a5bb8] dark:text-[#fcd303]">Hinchada</span>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium max-w-xs mx-auto">
                                Forma parte de la familia VyA y comparte tu pasión por el club.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button onClick={loginGoogle} className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 flex items-center justify-center gap-3">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span>Continuar con Google</span>
                            </button>
                            
                            <button onClick={loginFacebook} className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span>Continuar con Facebook</span>
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                            <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                                Al continuar, aceptas formar parte de la mejor hinchada de VMT
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Modal de comentario */}
            {commentModal && (
                <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
                        <button onClick={() => {setCommentModal(false); setReplyingTo(null);}} className="absolute top-4 right-4 text-gray-500 hover:text-[#0a1930] dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-full p-2"><X size={16}/></button>
                        
                        {replyingTo && (
                            <div className="mb-5 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-[#1a5bb8] dark:text-[#fcd303] font-bold text-sm">
                                        <Reply size={16} />
                                        <span>Respondiendo a {replyingTo.author}</span>
                                    </div>
                                    <button onClick={() => setReplyingTo(null)} className="text-gray-500 hover:text-red-500 text-xs">
                                        <X size={14} />
                                    </button>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm italic line-clamp-2">"{replyingTo.text}"</p>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-5">
                            <div className="w-12 h-12 bg-[#1a5bb8] dark:bg-[#fcd303] rounded-full flex items-center justify-center text-white dark:text-[#0a1930] font-bold text-xl">{realUser?.displayName?.charAt(0) || 'H'}</div>
                            <div>
                                <p className="text-[#0a1930] dark:text-white font-bold text-lg">{realUser?.displayName || 'Hincha Oficial'}</p>
                                <button onClick={()=>{signOut(auth); setCommentModal(false); setReplyingTo(null);}} className="text-xs text-red-500 hover:underline">Cerrar sesión</button>
                            </div>
                        </div>
                        <form onSubmit={postComment} className="space-y-4">
                            <textarea name="text" rows="4" placeholder={replyingTo ? `Responde a ${replyingTo.author}...` : "Escribe tu mensaje..."} className="w-full bg-gray-50 dark:bg-[#050c17] border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white px-5 py-4 focus:outline-none focus:border-[#1a5bb8] dark:focus:border-[#2a75e6] resize-none" required></textarea>
                            <button type="submit" className="w-full bg-[#1a5bb8] text-white font-['Oswald',sans-serif] font-bold uppercase tracking-wider py-4 rounded-xl shadow-lg hover:bg-[#0a1930] transition">
                                {replyingTo ? 'Publicar Respuesta' : 'Publicar Mensaje'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Socio - versión simplificada por espacio */}
            {socioModal && (
                <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => setSocioModal(false)}>
                    <div className="fixed left-0 top-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white dark:bg-[#050c17] shadow-2xl overflow-y-auto slide-in-left border-r-4 border-[#1a5bb8] dark:border-[#fcd303]" onClick={(e) => e.stopPropagation()}>
                        <div className="relative h-64 sm:h-80 bg-gradient-to-br from-[#1a5bb8] to-[#0a1930] dark:from-[#fcd303] dark:to-[#f0a500] overflow-hidden">
                            <button onClick={() => setSocioModal(false)} className="absolute top-4 right-4 z-20 bg-black/70 text-white hover:bg-[#fcd303] hover:text-[#0a1930] rounded-full p-2.5 backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20"><X size={22}/></button>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop" alt="Hinchada VyA" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-2 border-white/40"><UserPlus size={40} className="text-white"/></div>
                                <h2 className="font-['Oswald',sans-serif] text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">¡Sé Socio Oficial!</h2>
                                <p className="text-white/90 text-lg font-medium max-w-2xl">Únete a la familia VyA y disfruta de beneficios exclusivos</p>
                            </div>
                        </div>

                        <div className="p-6 md:p-10">
                            <div className="mb-8">
                                <h3 className="font-['Oswald',sans-serif] text-2xl md:text-3xl font-black text-[#0a1930] dark:text-white uppercase mb-6 flex items-center gap-3">
                                    <Trophy className="text-[#fcd303]" size={28}/>
                                    Beneficios Exclusivos
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gradient-to-br from-[#1a5bb8]/10 to-transparent dark:from-[#fcd303]/10 p-5 rounded-xl border border-[#1a5bb8]/20 dark:border-[#fcd303]/20">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-[#1a5bb8] dark:bg-[#fcd303] p-2 rounded-lg"><Trophy size={20} className="text-white dark:text-[#0a1930]"/></div>
                                            <div><h4 className="font-bold text-[#0a1930] dark:text-white mb-1">Prioridad en el Estadio</h4><p className="text-sm text-gray-600 dark:text-gray-400">Acceso preferencial y ubicaciones exclusivas en todos los partidos</p></div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#1a5bb8]/10 to-transparent dark:from-[#fcd303]/10 p-5 rounded-xl border border-[#1a5bb8]/20 dark:border-[#fcd303]/20">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-[#1a5bb8] dark:bg-[#fcd303] p-2 rounded-lg"><Medal size={20} className="text-white dark:text-[#0a1930]"/></div>
                                            <div><h4 className="font-bold text-[#0a1930] dark:text-white mb-1">Descuentos Especiales</h4><p className="text-sm text-gray-600 dark:text-gray-400">Descuentos en indumentaria oficial y merchandising del club</p></div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#1a5bb8]/10 to-transparent dark:from-[#fcd303]/10 p-5 rounded-xl border border-[#1a5bb8]/20 dark:border-[#fcd303]/20">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-[#1a5bb8] dark:bg-[#fcd303] p-2 rounded-lg"><Users size={20} className="text-white dark:text-[#0a1930]"/></div>
                                            <div><h4 className="font-bold text-[#0a1930] dark:text-white mb-1">Eventos Exclusivos</h4><p className="text-sm text-gray-600 dark:text-gray-400">Invitaciones a eventos especiales con el equipo y la directiva</p></div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#1a5bb8]/10 to-transparent dark:from-[#fcd303]/10 p-5 rounded-xl border border-[#1a5bb8]/20 dark:border-[#fcd303]/20">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-[#1a5bb8] dark:bg-[#fcd303] p-2 rounded-lg"><ShieldCheck size={20} className="text-white dark:text-[#0a1930]"/></div>
                                            <div><h4 className="font-bold text-[#0a1930] dark:text-white mb-1">Carnet de Socio</h4><p className="text-sm text-gray-600 dark:text-gray-400">Carnet oficial que te identifica como miembro de la familia VyA</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t-2 border-gray-200 dark:border-gray-800 mb-8"></div>
                            
                            <div className="mb-6">
                                <h3 className="font-['Oswald',sans-serif] text-2xl md:text-3xl font-black text-[#0a1930] dark:text-white uppercase mb-6 flex items-center gap-3">
                                    <UserPlus className="text-[#fcd303]" size={28}/>
                                    Completa tu Solicitud
                                </h3>
                                
                                <div className="mb-6 p-5 bg-gradient-to-r from-[#1a5bb8]/10 to-transparent dark:from-[#fcd303]/10 rounded-xl border-l-4 border-[#1a5bb8] dark:border-[#fcd303]">
                                    <div className="flex items-center gap-4 mb-3">
                                        {realUser?.photoURL && <img src={realUser.photoURL} alt={realUser.displayName} className="w-16 h-16 rounded-full border-2 border-[#1a5bb8] dark:border-[#fcd303]"/>}
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Solicitante:</p>
                                            <p className="text-lg font-bold text-[#0a1930] dark:text-white">{realUser?.displayName || 'Usuario'}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{realUser?.email}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#1a5bb8] dark:text-[#fcd303] font-semibold">✓ Tus datos de Google/Facebook se usarán automáticamente</p>
                                </div>

                                <form onSubmit={submitSocioRequest} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-[#0a1930] dark:text-white mb-2">DNI *</label>
                                            <input type="text" name="dni" required pattern="[0-9]{8}" placeholder="12345678" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-[#0a1930] dark:text-white focus:outline-none focus:border-[#1a5bb8] dark:focus:border-[#fcd303] transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#0a1930] dark:text-white mb-2">Teléfono / WhatsApp *</label>
                                            <input type="tel" name="telefono" required pattern="[0-9]{9}" placeholder="987654321" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-[#0a1930] dark:text-white focus:outline-none focus:border-[#1a5bb8] dark:focus:border-[#fcd303] transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#0a1930] dark:text-white mb-2">Mensaje (opcional)</label>
                                        <textarea name="mensaje" rows="3" placeholder="Cuéntanos por qué quieres ser parte de la familia VyA..." className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-[#0a1930] dark:text-white focus:outline-none focus:border-[#1a5bb8] dark:focus:border-[#fcd303] transition-colors resize-none"></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-gradient-to-r from-[#1a5bb8] to-[#0a1930] dark:from-[#fcd303] dark:to-[#f0a500] text-white dark:text-[#0a1930] font-['Oswald',sans-serif] font-bold text-lg uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02]">
                                        <Send size={22}/>
                                        Enviar Solicitud
                                    </button>
                                </form>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 text-center border border-gray-200 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    <strong className="text-[#1a5bb8] dark:text-[#fcd303]">¡Únete a más de 1,300 hinchas fieles!</strong><br/>
                                    Tu solicitud será revisada por nuestro equipo y te contactaremos pronto
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
