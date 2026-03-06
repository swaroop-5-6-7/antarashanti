import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Users, Building2, ShieldAlert } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const location = useLocation();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    useEffect(() => {
        // We only want the scroll blur effect on the navbar
        const st = ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === 1) {
                    gsap.to('.nav-bg', { backgroundColor: 'rgba(44, 47, 58, 0.85)', backdropFilter: 'blur(12px)', duration: 0.3 });
                } else if (self.progress === 0) {
                    gsap.to('.nav-bg', { backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(8px)', duration: 0.3 });
                }
            }
        });

        return () => {
            st.kill();
        };
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-6xl transition-all duration-300">
            <div className="nav-bg flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 transition-colors duration-300">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-electric-lavender/30 shadow-[0_0_15px_rgba(139,125,255,0.15)] overflow-hidden group-hover:shadow-[0_0_25px_rgba(139,125,255,0.3)] group-hover:border-electric-lavender/50 transition-all duration-300">
                        <img src="/logo.png" alt="AntaraShanti Logo" className="w-full h-full object-cover scale-[1.15]" />
                    </div>
                    <span className="font-sora text-lg font-bold tracking-tight text-white">AntaraShanti</span>
                </Link>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium font-sora">
                    <Link to="/features" className={`link-lift transition-colors ${isActive('/features') ? 'text-electric-lavender' : 'hover:text-electric-lavender'}`}>Features</Link>
                    <Link to="/impact" className={`link-lift transition-colors ${isActive('/impact') ? 'text-electric-lavender' : 'hover:text-electric-lavender'}`}>Campus Impact</Link>
                    <Link to="/security" className={`link-lift transition-colors ${isActive('/security') ? 'text-electric-lavender' : 'hover:text-electric-lavender'}`}>Security</Link>
                    <Link to="/community" className={`link-lift transition-colors ${isActive('/community') ? 'text-electric-lavender' : 'hover:text-electric-lavender'}`}>Community</Link>
                    <Link to="/about" className={`link-lift transition-colors ${isActive('/about') ? 'text-electric-lavender' : 'hover:text-electric-lavender'}`}>About</Link>
                    <Link to="/resources" className={`link-lift transition-colors ${isActive('/resources') ? 'text-electric-lavender' : 'hover:text-electric-lavender'}`}>Resources</Link>
                </div>
                <div className="flex items-center gap-4">
                    {/* Login Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsLoginOpen(true)}
                        onMouseLeave={() => setIsLoginOpen(false)}
                    >
                        <button className="flex items-center gap-1 text-cool-mist/60 hover:text-white transition-colors font-mono uppercase tracking-widest text-[10px] py-2">
                            Login <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLoginOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute right-0 top-full mt-2 w-56 bg-[#121214]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-200 origin-top-right ${isLoginOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                        >
                            <div className="p-2 flex flex-col gap-1">
                                <Link
                                    to="/student/login"
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                    onClick={() => setIsLoginOpen(false)}
                                >
                                    <div className="w-8 h-8 rounded bg-electric-lavender/10 flex items-center justify-center shrink-0">
                                        <Users className="w-4 h-4 text-electric-lavender group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-sora font-semibold">Student Login</div>
                                        <div className="text-[10px] font-mono text-cool-mist/50">Via Wellness Auth</div>
                                    </div>
                                </Link>

                                <Link
                                    to="/institution-login"
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                    onClick={() => setIsLoginOpen(false)}
                                >
                                    <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center shrink-0">
                                        <Building2 className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-sora font-semibold">Admin Gateway</div>
                                        <div className="text-[10px] font-mono text-cool-mist/50">For Deans & Directors</div>
                                    </div>
                                </Link>

                                <div className="h-px w-full bg-white/5 my-1" />

                                <Link
                                    to="/super-admin-login"
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-500/5 transition-colors group"
                                    onClick={() => setIsLoginOpen(false)}
                                >
                                    <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center shrink-0">
                                        <ShieldAlert className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-sora font-semibold">Super Admin</div>
                                        <div className="text-[10px] font-mono text-cool-mist/50">Global Access Control</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link to="/demo" className="magnetic-button bg-electric-lavender text-midnight-blue px-6 py-2.5 rounded-full font-sora font-semibold text-sm transition-all shadow-[0_0_20px_rgba(139,125,255,0.2)] hover:shadow-[0_0_30px_rgba(139,125,255,0.4)]">
                        Demo
                    </Link>
                </div>
            </div>
        </nav>
    );
}
