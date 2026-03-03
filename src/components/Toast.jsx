import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

export default function Toast({ toast }) {
    return (
        <div className={`fixed bottom-6 right-6 z-[200] transform transition-all duration-300 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'} bg-gray-900 border border-gray-700 rounded-xl text-white px-6 py-4 shadow-2xl flex items-center gap-3`}>
            <div className={`${toast.isError ? 'bg-red-500/20 text-red-500' : 'bg-[#fcd303]/20 text-[#fcd303]'} p-1.5 rounded-full`}>
                {toast.isError ? <AlertCircle size={20}/> : <Check size={20}/>}
            </div>
            <span className="font-medium">{toast.msg}</span>
        </div>
    );
}
