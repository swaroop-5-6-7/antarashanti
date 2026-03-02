import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-black pt-16 pb-12 px-6 rounded-t-6xl -mt-10 z-20 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-electric-lavender/50 to-transparent" />

            <div className="max-w-6xl mx-auto border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-electric-lavender/30 shadow-[0_0_20px_rgba(139,125,255,0.15)] overflow-hidden">
                        <img src="/logo.png" alt="AntaraShanti Logo" className="w-full h-full object-cover scale-[1.15]" />
                    </div>
                    <div>
                        <p className="font-sora font-bold text-white tracking-tight text-lg">AntaraShanti</p>
                        <p className="font-mono text-[10px] text-cool-mist/50 uppercase tracking-widest mt-1">Mindful Campus Edition</p>
                    </div>
                </div>

                <div className="flex gap-8 text-sm font-sora text-cool-mist/60">
                    <Link to="/security" className="hover:text-white transition-colors">Privacy Infrastructure</Link>
                    <Link to="/security" className="hover:text-white transition-colors">Compliance</Link>
                    <Link to="/about" className="hover:text-white transition-colors">Principles</Link>
                </div>

                {/* Dynamic Campus Impact Indicator */}
                <div className="flex flex-col items-end gap-1 font-mono text-xs text-cool-mist/80">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1C] rounded-full border border-electric-lavender/20 shadow-[0_0_15px_rgba(139,125,255,0.1)] relative overflow-hidden group cursor-pointer hover:border-electric-lavender/40 hover:bg-[#252528] transition-all">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,125,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[gradient_3s_linear_infinite]" />
                        <span className="relative z-10 text-[10px] uppercase text-cool-mist/60 group-hover:text-cool-mist transition-colors">Campus Networks:</span>
                        <div className="relative z-10 flex items-center gap-1.5 font-bold text-electric-lavender">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-lavender opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-lavender"></span>
                            </span>
                            142 Active Nodes
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
