import React, { useState, useEffect } from 'react';
import { signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Importaciones de configuración
import { auth, db, appId } from './config/firebaseConfig';
import { DEFAULT_CONFIG } from './config/appConfig';

// Importaciones de componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingView from './components/views/LandingView';
import RosterView from './components/views/RosterView';
import AllNewsView from './components/views/AllNewsView';
import AllCommentsView from './components/views/AllCommentsView';
import AdminView from './components/views/AdminView';
import Modals from './components/Modals';

// ================= COMPONENTE PRINCIPAL =================
export default function App() {
    const [view, setView] = useState('landing'); 
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    
    const [user, setUser] = useState(null);
    const [realUser, setRealUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [news, setNews] = useState([]);
    const [comments, setComments] = useState([]);
    const [socioRequests, setSocioRequests] = useState([]);
    
    const [toast, setToast] = useState({ show: false, msg: '', isError: false });
    const [authModal, setAuthModal] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const [newsModal, setNewsModal] = useState(null);
    const [socioModal, setSocioModal] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                // eslint-disable-next-line no-undef
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    // eslint-disable-next-line no-undef
                    await signInWithCustomToken(auth, __initial_auth_token);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (err) { console.error(err); }
        };
        initAuth();

        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setRealUser(u && !u.isAnonymous ? u : null);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (!user) return;
        const unsubs = [];
        const confRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'landing');
        unsubs.push(onSnapshot(confRef, (snap) => {
            if (snap.exists()) setConfig(snap.data());
            else setDoc(confRef, DEFAULT_CONFIG);
        }, err => console.error(err)));

        const newsRef = collection(db, 'artifacts', appId, 'public', 'data', 'news');
        unsubs.push(onSnapshot(newsRef, (snap) => {
            const data = snap.docs.map(d => ({id: d.id, ...d.data()}));
            setNews(data.sort((a,b) => b.createdAt - a.createdAt));
        }, err => console.error(err)));

        const commentsRef = collection(db, 'artifacts', appId, 'public', 'data', 'comments');
        unsubs.push(onSnapshot(commentsRef, (snap) => {
            const data = snap.docs.map(d => ({id: d.id, ...d.data()}));
            setComments(data.sort((a,b) => b.createdAt - a.createdAt));
        }, err => console.error(err)));

        const socioRequestsRef = collection(db, 'artifacts', appId, 'public', 'data', 'socioRequests');
        unsubs.push(onSnapshot(socioRequestsRef, (snap) => {
            const data = snap.docs.map(d => ({id: d.id, ...d.data()}));
            setSocioRequests(data.sort((a,b) => b.createdAt - a.createdAt));
        }, err => console.error(err)));

        return () => unsubs.forEach(fn => fn());
    }, [user]);

    useEffect(() => {
        if (newsModal || authModal || commentModal || socioModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [newsModal, authModal, commentModal, socioModal]);

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    const showToast = (msg, isError = false) => {
        setToast({ show: true, msg, isError });
        setTimeout(() => setToast({ show: false, msg: '', isError: false }), 3000);
    };

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-[#050c17] font-sans transition-colors duration-300 selection:bg-[#fcd303] selection:text-[#0a1930]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Oswald:wght@500;700;900&display=swap');
                .text-outline { color: transparent; -webkit-text-stroke: 2px #fcd303; }
                .clip-slant { clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%); }
                .clip-slant-reverse { clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 100%); }
                .bg-stripes-sports { background: repeating-linear-gradient(45deg, rgba(26, 91, 184, 0.05), rgba(26, 91, 184, 0.05) 10px, transparent 10px, transparent 20px); }
                @keyframes scale-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(26, 91, 184, 0); } 50% { box-shadow: 0 0 20px 5px rgba(26, 91, 184, 0.3); } }
                .animate-scale-in { animation: scale-in 0.3s ease-out; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #f8fafc; }
                .dark ::-webkit-scrollbar-track { background: #050c17; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .dark ::-webkit-scrollbar-thumb { background: #1e293b; }
                ::-webkit-scrollbar-thumb:hover { background: #1a5bb8; }
            `}</style>
            
            {view !== 'admin' && (
                <Navbar setView={setView} theme={theme} toggleTheme={toggleTheme} config={config} news={news} />
            )}

            {view === 'landing' && (
                <LandingView 
                    config={config} news={news} comments={comments} 
                    setView={setView} setAuthModal={setAuthModal} setCommentModal={setCommentModal} 
                    realUser={realUser} setNewsModal={setNewsModal} setReplyingTo={setReplyingTo}
                    setSocioModal={setSocioModal} showToast={showToast}
                />
            )}

            {view === 'roster' && <RosterView setView={setView} />}
            {view === 'news' && <AllNewsView news={news} setView={setView} setNewsModal={setNewsModal} />}
            {view === 'comments' && <AllCommentsView comments={comments} setView={setView} realUser={realUser} setAuthModal={setAuthModal} setCommentModal={setCommentModal} setReplyingTo={setReplyingTo} />}

            {view === 'admin' && (
                <AdminView 
                    config={config} news={news} comments={comments} socioRequests={socioRequests}
                    setView={setView} isAdmin={isAdmin} setIsAdmin={setIsAdmin} 
                    showToast={showToast}
                />
            )}

            {view !== 'admin' && <Footer config={config} setView={setView} />}

            <Modals 
                authModal={authModal} setAuthModal={setAuthModal}
                commentModal={commentModal} setCommentModal={setCommentModal}
                socioModal={socioModal} setSocioModal={setSocioModal}
                realUser={realUser} showToast={showToast}
                replyingTo={replyingTo} setReplyingTo={setReplyingTo}
            />

            {/* Sistema de Alertas Flotantes */}
            <div className={`fixed bottom-6 right-6 z-[200] transform transition-all duration-300 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'} bg-gray-900 border border-gray-700 rounded-xl text-white px-6 py-4 shadow-2xl flex items-center gap-3`}>
                <div className={`${toast.isError ? 'bg-red-500/20 text-red-500' : 'bg-[#fcd303]/20 text-[#fcd303]'} p-1.5 rounded-full`}>
                    {toast.isError ? <AlertCircle size={20}/> : <CheckCircle size={20}/>}
                </div>
                <span className="font-medium">{toast.msg}</span>
            </div>
        </div>
    );
}
