import React from 'react';
import { ArrowLeft } from 'lucide-react';
import PlayerCard from '../PlayerCard';

export default function RosterView({ setView }) {
    return (
        <div className="pt-32 pb-24 min-h-screen animate-fade-in bg-gray-50 dark:bg-[#050c17] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => {setView('landing'); window.scrollTo(0,0);}} className="mb-10 text-gray-600 dark:text-gray-400 hover:text-[#1a5bb8] dark:hover:text-[#fcd303] flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition group bg-white dark:bg-gray-900 px-5 py-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" /> Regresar al Inicio
                </button>
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[12vw] font-['Oswald',sans-serif] font-black text-gray-200 dark:text-white/5 whitespace-nowrap z-0 pointer-events-none select-none">2026</div>
                    <h2 className="font-['Oswald',sans-serif] text-5xl md:text-7xl font-black text-[#0a1930] dark:text-white uppercase tracking-wider mb-4 relative z-10">Plantilla <span className="text-[#1a5bb8] dark:text-[#fcd303]">Oficial</span></h2>
                </div>

                <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-[#0a1930] dark:text-white uppercase border-b-4 border-[#1a5bb8] dark:border-[#fcd303] pb-2 mb-8 inline-block">Cuerpo Técnico</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                    <PlayerCard role="Director Técnico" name="Carlos Mendoza" img="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard role="Prep. Físico" name="Jorge Salinas" img="https://images.unsplash.com/photo-1522850931084-263a23bb802b?q=80&w=600&auto=format&fit=crop" />
                </div>

                <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-[#0a1930] dark:text-white uppercase border-b-4 border-[#1a5bb8] dark:border-[#fcd303] pb-2 mb-8 inline-block">Porteros</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                    <PlayerCard num="01" role="Titular" name="Luis García" img="https://images.unsplash.com/photo-1600250395178-40fe752e5189?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="12" role="Suplente" name="Martín Sosa" img="https://images.unsplash.com/photo-1544605990-2521c7d81a95?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="21" role="Tercero" name="Diego Flores" img="https://images.unsplash.com/photo-1600250395178-40fe752e5189?q=80&w=600&auto=format&fit=crop" />
                </div>

                <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-[#0a1930] dark:text-white uppercase border-b-4 border-[#1a5bb8] dark:border-[#fcd303] pb-2 mb-8 inline-block">Defensas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                    <PlayerCard num="02" role="Central" name="Diego Ramírez" img="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="03" role="Lateral" name="Andrés Silva" img="https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="04" role="Central" name="Pedro Rojas" img="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="05" role="Lateral" name="Juan Vargas" img="https://images.unsplash.com/photo-1550224527-313cd0ddcc96?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="13" role="Lateral" name="Carlos Gómez" img="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="14" role="Central" name="Luis Morales" img="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="15" role="Central" name="Renzo Castro" img="https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="17" role="Lateral" name="Miguel Torres" img="https://images.unsplash.com/photo-1550224527-313cd0ddcc96?q=80&w=600&auto=format&fit=crop" />
                </div>

                <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-[#0a1930] dark:text-white uppercase border-b-4 border-[#1a5bb8] dark:border-[#fcd303] pb-2 mb-8 inline-block">Mediocampistas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                    <PlayerCard num="06" role="Pivote" name="Raúl Pérez" img="https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="08" role="Medio" name="Mateo Ríos" img="https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="10" role="Creativo" name="Sergio Ortiz" img="https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="16" role="Interior" name="Kevin Ruiz" img="https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="18" role="Medio" name="Franco Mendoza" img="https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="20" role="Pivote" name="Julio Chávez" img="https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="22" role="Interior" name="Adrián Castro" img="https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="23" role="Medio" name="Renato López" img="https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=600&auto=format&fit=crop" />
                </div>

                <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-[#0a1930] dark:text-white uppercase border-b-4 border-[#1a5bb8] dark:border-[#fcd303] pb-2 mb-8 inline-block">Delanteros</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                    <PlayerCard num="07" role="Extremo" name="Samuel Díaz" img="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="09" role="Centro" name="Hugo Castillo" img="https://images.unsplash.com/photo-1551280857-2b9bbe5240f5?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="11" role="Extremo" name="Paolo Vásquez" img="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="19" role="Segundo" name="Jeff Pinto" img="https://images.unsplash.com/photo-1551280857-2b9bbe5240f5?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="24" role="Extremo" name="Claudio Ruiz" img="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=600&auto=format&fit=crop" />
                    <PlayerCard num="25" role="Centro" name="Gianluca Díaz" img="https://images.unsplash.com/photo-1551280857-2b9bbe5240f5?q=80&w=600&auto=format&fit=crop" />
                </div>
            </div>
        </div>
    );
}
