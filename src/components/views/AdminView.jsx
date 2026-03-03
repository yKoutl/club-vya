import React, { useState, useEffect } from 'react';
import { deleteDoc, doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { 
    X, ShieldCheck, Menu, LayoutDashboard, LayoutTemplate, Newspaper, 
    MessageSquare, LogOut, UserPlus, Mail, Phone, Calendar, 
    CheckCircle, XCircle, Save 
} from 'lucide-react';
import { db, appId } from '../../config/firebaseConfig';
import { DEFAULT_CONFIG } from '../../config/appConfig';

export default function AdminView({ config, news, comments, socioRequests, setView, isAdmin, setIsAdmin, showToast }) {
    const [tab, setTab] = useState('resumen');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const [editForm, setEditForm] = useState(config);
    useEffect(() => { setEditForm(config); }, [config]);
    const handleEditChange = (e) => setEditForm({...editForm, [e.target.name]: e.target.value});

    const [newsForm, setNewsForm] = useState({ title: '', img: '', content: '' });

    if (!isAdmin) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1930] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] relative text-white">
                    <button onClick={() => setView('landing')} className="absolute top-4 right-4 hover:text-[#fcd303] transition"><X size={20}/></button>
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-[#0a1930] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#1a5bb8]/30 shadow-[0_0_20px_rgba(26,91,184,0.5)]">
                            <ShieldCheck className="w-10 h-10 text-[#2a75e6]" />
                        </div>
                        <h3 className="font-['Oswald',sans-serif] text-3xl font-black uppercase">Portal Directivo</h3>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if(e.target.pwd.value === 'admin123'){ setIsAdmin(true); showToast("Acceso concedido"); }
                        else { showToast("Credenciales inválidas", true); }
                    }} className="space-y-4">
                        <input type="email" placeholder="admin@cdvya.com" className="w-full bg-[#050c17] border border-gray-700 p-4 rounded-xl" required />
                        <input type="password" name="pwd" placeholder="••••••••" className="w-full bg-[#050c17] border border-gray-700 p-4 rounded-xl tracking-widest font-bold" required />
                        <button type="submit" className="bg-[#1a5bb8] w-full py-4 rounded-xl font-bold uppercase tracking-widest mt-2 hover:bg-[#2a75e6] transition shadow-lg">Ingresar</button>
                    </form>
                </div>
            </div>
        );
    }

    const handleDelete = async (col, id) => {
        try { await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', col, id)); showToast("Borrado correctamente."); } 
        catch { showToast("Error al borrar.", true); }
    };

    const submitConfig = async (e) => {
        e.preventDefault();
        try { await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'landing'), editForm); showToast("Web actualizada."); } 
        catch { showToast("Error", true); }
    };

    const submitNews = async (e) => {
        e.preventDefault();
        try { await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'news'), { ...newsForm, createdAt: Date.now() }); setNewsForm({title:'',img:'',content:''}); showToast("Noticia publicada."); } 
        catch { showToast("Error", true); }
    };

    const NavBtn = ({ target, label }) => (
        <button onClick={() => { setTab(target); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 font-medium rounded-xl transition ${tab === target ? 'bg-[#1a5bb8]/20 text-white border border-[#1a5bb8]/50' : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'}`}>
            <Icon size={20} className={tab === target ? 'text-[#2a75e6]' : ''}/> {label}
        </button>
    );

    return (
        <div className="flex h-screen bg-[#050c17] text-white animate-fade-in">
            {sidebarOpen && <div className="fixed inset-0 bg-black/80 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
            
            <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-gray-900 border-r border-gray-800 flex flex-col transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300`}>
                <div className="h-20 flex items-center justify-between lg:justify-center border-b border-gray-800 px-6">
                    <div className="flex items-center gap-3"><div className="bg-[#fcd303] p-0.5 rounded-full w-10 h-10"><img src={config.imgShield || DEFAULT_CONFIG.imgShield} className="rounded-full w-full h-full object-cover"/></div><span className="font-['Oswald',sans-serif] font-black text-xl uppercase">Admin</span></div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400"><X/></button>
                </div>
                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    <NavBtn target="resumen" icon={LayoutDashboard} label="Resumen" />
                    <NavBtn target="editor" icon={LayoutTemplate} label="Editor Web" />
                    <NavBtn target="noticias" icon={Newspaper} label="Noticias" />
                    <NavBtn target="comentarios" icon={MessageSquare} label="Moderación" />
                    <NavBtn target="socios" icon={UserPlus} label="Solicitudes de Socios" />
                </nav>
            </aside>

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="h-20 bg-[#0a1930]/80 border-b border-gray-800 flex items-center justify-between px-6 z-10">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu/></button>
                    <h2 className="font-['Oswald',sans-serif] text-xl uppercase hidden sm:block">Panel de Control</h2>
                    <button onClick={() => { setIsAdmin(false); setView('landing'); }} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold bg-gray-800/50 px-4 py-2 rounded-lg">
                        <LogOut size={16}/> Salir
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    {tab === 'resumen' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg flex items-center gap-6"><div className="p-4 bg-[#050c17] rounded-xl text-[#2a75e6]"><Newspaper size={32}/></div><div><p className="text-gray-500 uppercase text-sm font-bold">Total Noticias</p><p className="text-4xl font-['Oswald',sans-serif] mt-2">{news.length}</p></div></div>
                            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg flex items-center gap-6"><div className="p-4 bg-[#050c17] rounded-xl text-[#fcd303]"><MessageSquare size={32}/></div><div><p className="text-gray-500 uppercase text-sm font-bold">Comentarios</p><p className="text-4xl font-['Oswald',sans-serif] mt-2">{comments.length}</p></div></div>
                            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg flex items-center gap-6">
                                <div className="p-4 bg-[#050c17] rounded-xl text-[#fcd303]"><UserPlus size={32}/></div>
                                <div>
                                    <p className="text-gray-500 uppercase text-sm font-bold">Solicitudes Pendientes</p>
                                    <p className="text-4xl font-['Oswald',sans-serif] mt-2">
                                        {socioRequests.filter(r => r.status === 'pendiente').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {tab === 'editor' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                            <h3 className="font-['Oswald',sans-serif] text-xl uppercase mb-6 flex items-center gap-2"><LayoutTemplate className="text-[#fcd303]"/> Editor de Landing Page</h3>
                            <form onSubmit={submitConfig} className="space-y-8">
                                
                                {/* 1. Imágenes */}
                                <div className="p-5 border border-gray-700 bg-[#050c17] rounded-xl space-y-4">
                                    <h4 className="text-[#fcd303] font-bold uppercase tracking-widest text-sm border-b border-gray-700 pb-2">1. Imágenes Oficiales (URLs)</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div><label className="block text-xs text-gray-400 mb-1">URL Escudo</label><input type="text" name="imgShield" value={editForm.imgShield} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" /></div>
                                        <div><label className="block text-xs text-gray-400 mb-1">URL Fondo Identidad</label><input type="text" name="imgIdent" value={editForm.imgIdent} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" /></div>
                                    </div>
                                </div>

                                {/* 2. Hero */}
                                <div className="p-5 border border-gray-700 bg-[#050c17] rounded-xl space-y-4">
                                    <h4 className="text-[#fcd303] font-bold uppercase tracking-widest text-sm border-b border-gray-700 pb-2">2. Portada (Hero)</h4>
                                    <div><label className="block text-xs text-gray-400 mb-1">Subtítulo Hero</label><input type="text" name="heroSub" value={editForm.heroSub} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" /></div>
                                    <div><label className="block text-xs text-gray-400 mb-1">Título Principal (HTML permitido)</label><textarea name="heroTitle" value={editForm.heroTitle} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" rows="2"></textarea></div>
                                    <div><label className="block text-xs text-gray-400 mb-1">Texto Hero</label><textarea name="heroText" value={editForm.heroText} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" rows="2"></textarea></div>
                                </div>

                                {/* 3. Estadísticas */}
                                <div className="p-5 border border-gray-700 bg-[#050c17] rounded-xl space-y-4">
                                    <h4 className="text-[#fcd303] font-bold uppercase tracking-widest text-sm border-b border-gray-700 pb-2">3. Barra de Estadísticas</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Valor 1</label><input type="text" name="statV1" value={editForm.statV1} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white mb-2 focus:outline-none focus:border-[#fcd303]" />
                                            <label className="block text-xs text-gray-400 mb-1">Texto 1</label><input type="text" name="statT1" value={editForm.statT1} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-gray-300 focus:outline-none focus:border-[#fcd303]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Valor 2</label><input type="text" name="statV2" value={editForm.statV2} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white mb-2 focus:outline-none focus:border-[#fcd303]" />
                                            <label className="block text-xs text-gray-400 mb-1">Texto 2</label><input type="text" name="statT2" value={editForm.statT2} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-gray-300 focus:outline-none focus:border-[#fcd303]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Valor 3</label><input type="text" name="statV3" value={editForm.statV3} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white mb-2 focus:outline-none focus:border-[#fcd303]" />
                                            <label className="block text-xs text-gray-400 mb-1">Texto 3</label><input type="text" name="statT3" value={editForm.statT3} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-gray-300 focus:outline-none focus:border-[#fcd303]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* 4. Identidad */}
                                    <div className="p-5 border border-gray-700 bg-[#050c17] rounded-xl space-y-4">
                                        <h4 className="text-[#fcd303] font-bold uppercase tracking-widest text-sm border-b border-gray-700 pb-2">4. Identidad</h4>
                                        <div><label className="block text-xs text-gray-400 mb-1">Título</label><input type="text" name="idTitle" value={editForm.idTitle} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" /></div>
                                        <div><label className="block text-xs text-gray-400 mb-1">Párrafo 1 (HTML permitido)</label><textarea name="idP1" value={editForm.idP1} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" rows="3"></textarea></div>
                                        <div><label className="block text-xs text-gray-400 mb-1">Párrafo 2</label><textarea name="idP2" value={editForm.idP2} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" rows="3"></textarea></div>
                                    </div>

                                    {/* 5. Campeones y Socios */}
                                    <div className="space-y-6">
                                        <div className="p-5 border border-gray-700 bg-[#050c17] rounded-xl space-y-4">
                                            <h4 className="text-[#fcd303] font-bold uppercase tracking-widest text-sm border-b border-gray-700 pb-2">5. Campeones</h4>
                                            <div><label className="block text-xs text-gray-400 mb-1">Título</label><textarea name="champTitle" value={editForm.champTitle} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" rows="2"></textarea></div>
                                            <div><label className="block text-xs text-gray-400 mb-1">Texto Principal</label><textarea name="champText" value={editForm.champText} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" rows="3"></textarea></div>
                                        </div>

                                        <div className="p-5 border border-gray-700 bg-[#050c17] rounded-xl space-y-4">
                                            <h4 className="text-[#fcd303] font-bold uppercase tracking-widest text-sm border-b border-gray-700 pb-2">6. Llamado a la Acción (Socios)</h4>
                                            <div><label className="block text-xs text-gray-400 mb-1">Título</label><input type="text" name="socioTitle" value={editForm.socioTitle} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" /></div>
                                            <div><label className="block text-xs text-gray-400 mb-1">Texto</label><textarea name="socioText" value={editForm.socioText} onChange={handleEditChange} className="w-full bg-[#0a1930] border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#fcd303]" rows="2"></textarea></div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="bg-[#fcd303] text-[#0a1930] font-bold py-4 px-8 rounded-xl w-full uppercase flex justify-center items-center gap-2 hover:bg-white transition shadow-lg"><Save size={20}/> Guardar Cambios en Vivo</button>
                            </form>
                        </div>
                    )}

                    {tab === 'noticias' && (
                        <div className="space-y-8">
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                                <h3 className="font-['Oswald',sans-serif] text-xl uppercase mb-6 flex items-center gap-2"><Newspaper className="text-[#2a75e6]"/> Redactar Noticia</h3>
                                <form onSubmit={submitNews} className="space-y-4">
                                    <input type="text" placeholder="Título" value={newsForm.title} onChange={e=>setNewsForm({...newsForm, title: e.target.value})} className="w-full bg-[#050c17] border border-gray-700 rounded p-4" required />
                                    <input type="url" placeholder="URL de la imagen (opcional)" value={newsForm.img} onChange={e=>setNewsForm({...newsForm, img: e.target.value})} className="w-full bg-[#050c17] border border-gray-700 rounded p-4" />
                                    <textarea placeholder="Contenido..." value={newsForm.content} onChange={e=>setNewsForm({...newsForm, content: e.target.value})} className="w-full bg-[#050c17] border border-gray-700 rounded p-4" rows="4" required></textarea>
                                    <button type="submit" className="bg-[#1a5bb8] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#2a75e6] transition">Publicar</button>
                                </form>
                            </div>
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                                <h3 className="font-['Oswald',sans-serif] text-xl uppercase mb-6">Historial</h3>
                                <div className="space-y-3">
                                    {news.length === 0 ? <p className="text-gray-500 text-sm">No hay noticias publicadas reales.</p> : null}
                                    {news.map(n => (
                                        <div key={n.id} className="flex justify-between items-center bg-[#050c17] p-4 rounded-xl border border-gray-800">
                                            <span className="truncate">{n.title}</span>
                                            <button onClick={()=>handleDelete('news', n.id)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded text-xs font-bold hover:bg-red-500 hover:text-white transition">Borrar</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {tab === 'comentarios' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                            <h3 className="font-['Oswald',sans-serif] text-xl uppercase mb-6 flex items-center gap-2"><MessageSquare className="text-[#fcd303]"/> Moderación</h3>
                            <div className="space-y-3">
                                {comments.length === 0 ? <p className="text-gray-500 text-sm">No hay comentarios reales.</p> : null}
                                {comments.map(c => (
                                    <div key={c.id} className="flex justify-between items-start bg-[#050c17] p-4 rounded-xl border border-gray-800 gap-4">
                                        <div><span className="text-[#2a75e6] font-bold text-sm block">{c.author}</span><span className="text-gray-300 text-sm mt-1 block">{c.text}</span></div>
                                        <button onClick={()=>handleDelete('comments', c.id)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded text-xs font-bold hover:bg-red-500 hover:text-white transition">Borrar</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {tab === 'socios' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                            <h3 className="font-['Oswald',sans-serif] text-xl uppercase mb-6 flex items-center gap-2">
                                <UserPlus className="text-[#fcd303]"/> 
                                Solicitudes de Socios
                            </h3>
                            
                            {/* Filtros */}
                            <div className="flex gap-3 mb-6 flex-wrap">
                                <button 
                                    onClick={() => setTab('socios')}
                                    className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-bold border border-yellow-500/30"
                                >
                                    Pendientes ({socioRequests.filter(r => r.status === 'pendiente').length})
                                </button>
                                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-bold border border-green-500/30">
                                    Aprobados ({socioRequests.filter(r => r.status === 'aprobado').length})
                                </button>
                                <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-bold border border-red-500/30">
                                    Rechazados ({socioRequests.filter(r => r.status === 'rechazado').length})
                                </button>
                            </div>

                            {/* Lista de solicitudes */}
                            <div className="space-y-4">
                                {socioRequests.length === 0 ? (
                                    <div className="text-center py-12 bg-[#050c17] rounded-xl border border-gray-800">
                                        <UserPlus size={48} className="mx-auto text-gray-700 mb-3"/>
                                        <p className="text-gray-500 text-sm">No hay solicitudes aún</p>
                                    </div>
                                ) : (
                                    socioRequests.map(request => (
                                        <div 
                                            key={request.id} 
                                            className={`bg-[#050c17] p-6 rounded-xl border-2 ${
                                                request.status === 'pendiente' ? 'border-yellow-500/30' :
                                                request.status === 'aprobado' ? 'border-green-500/30' :
                                                'border-red-500/30'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start gap-4 mb-4">
                                                <div className="flex gap-4 flex-1">
                                                    {/* Foto del usuario si está disponible */}
                                                    {request.photoURL && (
                                                        <img 
                                                            src={request.photoURL} 
                                                            alt={request.nombre}
                                                            className="w-16 h-16 rounded-full border-2 border-[#fcd303] flex-shrink-0"
                                                        />
                                                    )}
                                                    
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                            <h4 className="text-white font-bold text-lg">{request.nombre}</h4>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                                request.status === 'pendiente' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                request.status === 'aprobado' ? 'bg-green-500/20 text-green-400' :
                                                                'bg-red-500/20 text-red-400'
                                                            }`}>
                                                                {request.status.toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                                            <div className="flex items-center gap-2 text-gray-400">
                                                                <Mail size={16} className="text-[#2a75e6]"/>
                                                                <span>{request.email}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-gray-400">
                                                                <Phone size={16} className="text-[#2a75e6]"/>
                                                                <span>{request.telefono}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-gray-400">
                                                                <ShieldCheck size={16} className="text-[#2a75e6]"/>
                                                                <span>DNI: {request.dni}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-gray-400">
                                                                <Calendar size={16} className="text-[#2a75e6]"/>
                                                                <span>{new Date(request.createdAt).toLocaleDateString('es-ES')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {request.mensaje && (
                                                <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                                                    <p className="text-xs text-gray-400 mb-1 font-bold">Mensaje:</p>
                                                    <p className="text-sm text-gray-300">{request.mensaje}</p>
                                                </div>
                                            )}
                                            
                                            {/* Botones de acción */}
                                            {request.status === 'pendiente' && (
                                                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-800">
                                                    <button 
                                                        onClick={async () => {
                                                            try {
                                                                await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'socioRequests', request.id), 
                                                                    { ...request, status: 'aprobado' });
                                                                showToast("Solicitud aprobada");
                                                            } catch {
                                                                showToast("Error al aprobar", true);
                                                            }
                                                        }}
                                                        className="flex-1 bg-green-500/20 text-green-400 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-green-500 hover:text-white transition flex items-center justify-center gap-2 border border-green-500/30"
                                                    >
                                                        <CheckCircle size={18}/>
                                                        Aprobar
                                                    </button>
                                                    <button 
                                                        onClick={async () => {
                                                            try {
                                                                await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'socioRequests', request.id), 
                                                                    { ...request, status: 'rechazado' });
                                                                showToast("Solicitud rechazada");
                                                            } catch {
                                                                showToast("Error al rechazar", true);
                                                            }
                                                        }}
                                                        className="flex-1 bg-red-500/20 text-red-400 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2 border border-red-500/30"
                                                    >
                                                        <XCircle size={18}/>
                                                        Rechazar
                                                    </button>
                                                </div>
                                            )}
                                            
                                            {/* Botón para eliminar cualquier solicitud */}
                                            <div className="mt-3 pt-3 border-t border-gray-800">
                                                <button 
                                                    onClick={() => handleDelete('socioRequests', request.id)}
                                                    className="w-full bg-gray-800/50 text-gray-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-500/20 hover:text-red-400 transition"
                                                >
                                                    Eliminar Registro
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
