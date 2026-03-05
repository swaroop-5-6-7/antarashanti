import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Users, ShieldCheck, Activity, BrainCircuit, Heart, MessageSquare,
    ArrowRight, Sparkles, Database, FileDigit, Settings, RefreshCw, Lock,
    CheckCircle2, FileText, TrendingUp
} from 'lucide-react';
import { supabase } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

export default function Demo() {
    const comp = useRef(null);
    const [activeView, setActiveView] = useState('student');
    const [formState, setFormState] = useState('idle'); // 'idle' | 'submitting' | 'success'

    const handleDemoRequest = async (e) => {
        e.preventDefault();
        setFormState('submitting');

        const formData = new FormData(e.target);

        try {
            const { error } = await supabase
                .from('institution_requests')
                .insert([
                    {
                        institution_name: formData.get('institutionName'),
                        role: formData.get('role'),
                        campus_size: formData.get('campusSize'),
                        email: formData.get('workEmail'),
                        status: 'pending'
                    }
                ]);

            if (error) {
                console.error("Supabase insert error details:", {
                    message: error.message,
                    code: error.code,
                    details: error.details,
                    hint: error.hint
                });
                alert(`Error submitting request: ${error.message}. Please check console.`);
                setFormState('idle');
                return;
            }

            // Artificial delay to ensure the loading animation plays long enough to be satisfying
            setTimeout(() => {
                setFormState('success');
            }, 800);

        } catch (err) {
            console.error("Unexpected error:", err);
            setFormState('idle');
        }
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero entries
            gsap.from('.hero-elem', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2
            });

            // General fade up
            const fadeUpTriggers = gsap.utils.toArray('.fade-up-trigger');
            fadeUpTriggers.forEach(trigger => {
                gsap.from(trigger.querySelectorAll('.fade-up'), {
                    scrollTrigger: {
                        trigger: trigger,
                        start: 'top 80%',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            });

            // Simulate UI rendering on toggle switch
            gsap.fromTo('.mock-ui-block',
                { y: 20, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', overwrite: true }
            );

        }, comp);
        return () => ctx.revert();
    }, [activeView]);

    return (
        <div ref={comp} className="pt-32 pb-24 w-full overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="px-6 md:px-16 lg:px-24 mb-24 max-w-5xl mx-auto text-center relative mt-16">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric-lavender/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

                <div className="hero-elem inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-electric-lavender/30 bg-electric-lavender/10 font-mono text-[10px] text-electric-lavender uppercase tracking-widest mb-6 relative z-10">
                    <span className="w-2 h-2 rounded-full bg-electric-lavender animate-pulse" /> Live Infrastructure Demo
                </div>

                <h1 className="hero-elem font-sora text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                    See Emotional Intelligence <br className="hidden md:block" />
                    <span className="text-electric-lavender italic font-drama pr-2">in Action.</span>
                </h1>

                <p className="hero-elem font-sora text-lg md:text-xl text-cool-mist/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                    Explore exactly how AntaraShanti safely intercepts student anxiety while surfacing macro-trends to campus administrators. No assumptions. Just verified logic.
                </p>

                <div className="hero-elem flex flex-wrap justify-center gap-4">
                    <button onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })} className="magnetic-button bg-electric-lavender text-midnight-blue px-8 py-4 rounded-full font-sora font-semibold shadow-[0_0_20px_rgba(139,125,255,0.3)] hover:shadow-[0_0_40px_rgba(139,125,255,0.5)]">
                        Schedule Live Walkthrough
                    </button>
                    <button onClick={() => document.getElementById('interactive-preview').scrollIntoView({ behavior: 'smooth' })} className="magnetic-button bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-sora font-semibold hover:bg-white/10 transition-colors">
                        Explore Interactive Preview
                    </button>
                </div>
            </section>

            {/* 2. & 3. INTERACTIVE PLATFORM PREVIEW w/ SPLIT TOGGLE */}
            <section id="interactive-preview" className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mb-32 fade-up-trigger">

                {/* Dual Toggle Button */}
                <div className="fade-up flex justify-center mb-16 relative z-10">
                    <div className="bg-[#1C1C1C]/80 backdrop-blur-md border border-white/10 p-1.5 rounded-full inline-flex relative shadow-2xl">
                        {/* Animated Slider Background */}
                        <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-electric-lavender rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeView === 'student' ? 'translate-x-0' : 'translate-x-[calc(100%+0.75rem)]'}`} />

                        <button
                            onClick={() => setActiveView('student')}
                            className={`relative z-10 px-8 py-3 rounded-full font-sora font-semibold text-sm transition-colors duration-300 flex items-center gap-2 ${activeView === 'student' ? 'text-midnight-blue' : 'text-cool-mist hover:text-white'}`}
                        >
                            <Users className="w-4 h-4" /> Student Trajectory
                        </button>
                        <button
                            onClick={() => setActiveView('admin')}
                            className={`relative z-10 px-8 py-3 rounded-full font-sora font-semibold text-sm transition-colors duration-300 flex items-center gap-2 ${activeView === 'admin' ? 'text-midnight-blue' : 'text-cool-mist hover:text-white'}`}
                        >
                            <ShieldCheck className="w-4 h-4" /> Administrative Engine
                        </button>
                    </div>
                </div>

                {/* Simulated UI Window */}
                <div className="fade-up bg-[#1C1C1C] rounded-t-xl rounded-b-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative min-h-[600px]">
                    {/* Window Control Bar */}
                    <div className="bg-[#2A2328] border-b border-white/5 px-6 py-4 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400/50" />
                        <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50" />
                        <div className="flex-1 flex justify-center">
                            <div className="bg-black/40 px-3 py-1 rounded font-mono text-[10px] text-cool-mist/50 border border-white/5 flex items-center gap-2">
                                <Lock className="w-3 h-3 text-green-400" />
                                {activeView === 'student' ? 'antarashanti.app/check-in (Encrypted Local Node)' : 'antarashanti.dashboard/macro-stats (ZKP Auth)'}
                            </div>
                        </div>
                    </div>

                    {/* Dynamic View Content */}
                    <div className="p-8 md:p-12 relative">
                        {/* Background Glow corresponding to view */}
                        <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none transition-colors duration-1000 ${activeView === 'student' ? 'bg-electric-lavender/5' : 'bg-blue-500/5'}`} />

                        {activeView === 'student' ? (
                            <div className="max-w-4xl mx-auto space-y-6">
                                {/* Student Simulation */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-6">
                                        {/* Mock Check-In Block */}
                                        <div className="mock-ui-block bg-slate-gray p-6 rounded-3xl border border-white/5 shadow-lg">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-electric-lavender/10 rounded-full flex items-center justify-center">
                                                    <BrainCircuit className="w-5 h-5 text-electric-lavender" />
                                                </div>
                                                <h3 className="font-sora text-lg font-bold text-white">Daily Behavioral Check-in</h3>
                                            </div>
                                            <p className="font-sora text-sm text-cool-mist mb-4 bg-midnight-blue/50 p-4 rounded-xl border border-white/5">
                                                "I'm feeling entirely overwhelmed about the thesis deadline and I just don't know where to start."
                                            </p>
                                            <div className="bg-electric-lavender/10 border border-electric-lavender/30 p-4 rounded-xl relative overflow-hidden">
                                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(139,125,255,0.05),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />
                                                <p className="font-sora text-sm text-electric-lavender font-medium leading-relaxed relative z-10">
                                                    Analysis Context: High-stakes academic paralysis. <br /><br />
                                                    Let's break the thesis down. What is the absolute smallest section you can outline in the next 10 minutes? It's just an outline, it doesn't need to be perfect.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Mock Rescue Protocol Block */}
                                        <div className="mock-ui-block bg-[#351C21]/90 p-6 rounded-3xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]">
                                            <h4 className="font-sora text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
                                                <Activity className="w-4 h-4" /> Elevated Stress Pattern Detected
                                            </h4>
                                            <p className="font-sora text-xs text-red-200/70 mb-4">Language patterns indicate potential distress. Support pathway activated.</p>
                                            <button className="bg-red-500/20 text-red-500 px-4 py-2 rounded-xl text-sm font-sora w-full font-bold hover:bg-red-500 hover:text-white transition-colors border border-red-500/30">
                                                Connect to On-Campus Support (Silent Dial)
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sidebar Tools */}
                                    <div className="space-y-6">
                                        <div className="mock-ui-block bg-slate-gray p-6 rounded-3xl border border-white/5">
                                            <h4 className="font-sora text-sm font-bold text-white mb-4">Toolkit</h4>
                                            <div className="space-y-2">
                                                <div className="bg-midnight-blue p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs text-cool-mist font-sora hover:border-electric-lavender/30 cursor-pointer transition-colors">
                                                    4-7-8 Somatic Breathing <ArrowRight className="w-3 h-3 text-electric-lavender" />
                                                </div>
                                                <div className="bg-midnight-blue p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs text-cool-mist font-sora hover:border-blue-400/30 cursor-pointer transition-colors">
                                                    Cognitive Reframing <ArrowRight className="w-3 h-3 text-blue-400" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mock-ui-block bg-slate-gray p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors" />
                                            <h4 className="font-sora text-sm font-bold text-white mb-2 flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-blue-400" /> Local Vault
                                            </h4>
                                            <p className="font-sora text-[10px] text-cool-mist/50">Journal logs aggressively encrypted on-device. Identity stripped on outgoing dispatch.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-5xl mx-auto space-y-6">
                                {/* Admin Simulation */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                    {/* Heatmap & Trends */}
                                    <div className="md:col-span-3 space-y-6">
                                        <div className="mock-ui-block bg-slate-gray p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col justify-between h-64">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="font-sora text-lg font-bold text-white mb-1"><span className="text-electric-lavender">Macro</span> Heatmap Aggregation</h3>
                                                    <p className="font-sora text-xs text-cool-mist/60 border border-white/10 inline-block px-2 py-0.5 rounded bg-midnight-blue/50">Live N=4,201 Active Users</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400" title="High Stress Area" />
                                                    <span className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400" title="Moderate Risk" />
                                                    <span className="w-3 h-3 rounded-full bg-electric-lavender/20 border border-electric-lavender" title="Regulated Baseline" />
                                                </div>
                                            </div>
                                            <div className="w-full flex-1 flex items-end gap-1 overflow-hidden relative border-b border-l border-white/10 px-2 pb-1">
                                                {/* Simulated Bar Chart Graphic */}
                                                {[20, 30, 25, 40, 25, 45, 60, 40, 75, 45, 30, 20].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-gradient-to-t from-electric-lavender/10 to-electric-lavender/40 rounded-t-sm" style={{ height: `${h}%` }}>
                                                        {h > 70 && <div className="w-full h-full bg-red-500/40 relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-red-400 w-max bg-red-500/10 px-1 rounded-sm border border-red-500/20">Finals Peak</div></div>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="mock-ui-block bg-[#1B2931] p-5 rounded-3xl border border-blue-400/20 flex flex-col gap-2">
                                                <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">Resilience Interventions</span>
                                                <span className="font-sora text-3xl font-bold text-white">412</span>
                                                <span className="font-sora text-xs text-cool-mist/70">Successful algorithm resets this week.</span>
                                            </div>
                                            <div className="mock-ui-block bg-[#35251C] p-5 rounded-3xl border border-orange-400/20 flex flex-col gap-2 relative overflow-hidden">
                                                <div className="absolute -right-4 -bottom-4 animate-pulse"><Database className="w-20 h-20 text-orange-400/5" /></div>
                                                <span className="font-mono text-[10px] text-orange-400 uppercase tracking-widest">Counseling Load Offset</span>
                                                <span className="font-sora text-3xl font-bold text-white">18%</span>
                                                <span className="font-sora text-xs text-cool-mist/70">Reduction in routine triage requests.</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar Config */}
                                    <div className="space-y-6">
                                        <div className="mock-ui-block bg-slate-gray p-6 rounded-3xl border border-white/5 h-full">
                                            <h4 className="font-sora text-sm font-bold text-white mb-4 flex items-center gap-2">
                                                <Settings className="w-4 h-4 text-cool-mist" /> Escalation Rules
                                            </h4>
                                            <div className="space-y-4">
                                                <div className="bg-midnight-blue p-3 rounded-xl border border-white/5 space-y-2">
                                                    <div className="flex justify-between items-center text-xs font-sora font-semibold text-white">
                                                        <span>Level 3 Crisis Escalation</span>
                                                        <div className="w-8 h-4 bg-green-500/20 rounded-full relative border border-green-500">
                                                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-green-400 rounded-full" />
                                                        </div>
                                                    </div>
                                                    <p className="font-mono text-[9px] text-cool-mist/50">Routes directly to on-call dispatcher (via Twilio/CAPS node).</p>
                                                </div>
                                                <div className="bg-midnight-blue p-3 rounded-xl border border-white/5 space-y-2">
                                                    <div className="flex justify-between items-center text-xs font-sora font-semibold text-white">
                                                        <span>FERPA-Compliant Data Protection</span>
                                                        <div className="flex text-[10px] font-mono text-electric-lavender gap-1 bg-electric-lavender/10 px-1 py-px rounded border border-electric-lavender/30">
                                                            <Lock className="w-3 h-3" /> ENFORCED
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-4 border-t border-white/5 text-center">
                                                <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full font-mono text-[10px] tracking-widest uppercase flex justify-center items-center gap-2 relative z-10 mx-auto">
                                                    <RefreshCw className="w-3 h-3 animate-spin" /> Syncing Live
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 4. INSTITUTIONAL BOOKING FORM */}
            <section id="booking-form" className="px-6 md:px-16 lg:px-24 mb-32 fade-up-trigger relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-[600px] bg-electric-lavender/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

                <div className="max-w-lg mx-auto bg-slate-gray p-10 md:p-12 rounded-4xl border border-electric-lavender/20 shadow-2xl relative z-10 fade-up min-h-[500px] flex flex-col justify-center">
                    {formState !== 'success' ? (
                        <>
                            <h2 className="font-sora text-3xl font-bold text-white mb-2 text-center">Architect a Safer Campus</h2>
                            <p className="font-sora text-sm text-cool-mist/80 text-center mb-8">
                                Schedule a technical walkthrough of the AntaraShanti protocol.
                            </p>

                            <form className="space-y-5" onSubmit={handleDemoRequest}>
                                <div className="space-y-2">
                                    <label className="font-sora text-xs font-semibold text-cool-mist ml-1">Institution Name</label>
                                    <input name="institutionName" required disabled={formState === 'submitting'} type="text" placeholder="University of Example" className="w-full bg-midnight-blue border border-white/10 rounded-xl px-4 py-3 font-sora text-sm text-white placeholder:text-cool-mist/30 focus:outline-none focus:border-electric-lavender/50 focus:bg-[#1C1C1C] transition-all disabled:opacity-50" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="font-sora text-xs font-semibold text-cool-mist ml-1">Institutional Role</label>
                                        <select name="role" disabled={formState === 'submitting'} className="w-full bg-midnight-blue border border-white/10 rounded-xl px-4 py-3 font-sora text-sm text-cool-mist/80 focus:outline-none focus:border-electric-lavender/50 focus:bg-[#1C1C1C] transition-all appearance-none cursor-pointer disabled:opacity-50">
                                            <option value="Dean / Provost">Dean / Provost</option>
                                            <option value="Director of Counseling">Director of Counseling</option>
                                            <option value="Campus IT Security">Campus IT Security</option>
                                            <option value="Student Affairs">Student Affairs</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-sora text-xs font-semibold text-cool-mist ml-1">Campus Size</label>
                                        <select name="campusSize" disabled={formState === 'submitting'} className="w-full bg-midnight-blue border border-white/10 rounded-xl px-4 py-3 font-sora text-sm text-cool-mist/80 focus:outline-none focus:border-electric-lavender/50 focus:bg-[#1C1C1C] transition-all appearance-none cursor-pointer disabled:opacity-50">
                                            <option value="< 5,000 Students">&lt; 5,000 Students</option>
                                            <option value="5k - 15k Students">5k - 15k Students</option>
                                            <option value="15k - 30k Students">15k - 30k Students</option>
                                            <option value="30k+ Students">30k+ Students</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="font-sora text-xs font-semibold text-cool-mist ml-1">Work Email</label>
                                    <input name="workEmail" required disabled={formState === 'submitting'} type="email" placeholder="name@edu.edu" className="w-full bg-midnight-blue border border-white/10 rounded-xl px-4 py-3 font-sora text-sm text-white placeholder:text-cool-mist/30 focus:outline-none focus:border-electric-lavender/50 focus:bg-[#1C1C1C] transition-all disabled:opacity-50" />
                                </div>

                                <button type="submit" disabled={formState === 'submitting'} className="w-full mt-6 magnetic-button bg-electric-lavender text-midnight-blue py-4 rounded-xl font-sora font-bold hover:bg-white transition-colors disabled:opacity-80 disabled:hover:bg-electric-lavender flex items-center justify-center gap-2">
                                    {formState === 'submitting' ? (
                                        <><RefreshCw className="w-5 h-5 animate-spin" /> Validating Institutional Credentials...</>
                                    ) : (
                                        'Request Demo Access'
                                    )}
                                </button>
                            </form>
                            <p className="mt-6 text-center font-mono text-[9px] text-cool-mist/40 uppercase tracking-widest">
                                Zero sales pressure. Technical evaluation only.
                            </p>
                        </>
                    ) : (
                        <div className="animate-[fade-in_0.5s_ease-out] text-center space-y-8 py-4">
                            <div>
                                <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="font-sora text-2xl font-bold text-white mb-3">Demo Request Received.</h3>
                                <p className="font-sora text-sm text-cool-mist/80 leading-relaxed max-w-sm mx-auto">
                                    Our team will review your institutional details and coordinate a technical walkthrough within 24–48 hours.
                                </p>
                            </div>

                            <div className="bg-midnight-blue p-5 rounded-2xl border border-white/5 space-y-4 text-left shadow-inner">
                                <div className="flex items-center gap-3 text-sm font-sora text-cool-mist/90">
                                    <Lock className="w-4 h-4 text-electric-lavender" /> Encrypted submission confirmed
                                </div>
                                <div className="flex items-center gap-3 text-sm font-sora text-cool-mist/90">
                                    <ShieldCheck className="w-4 h-4 text-electric-lavender" /> Institutional role validated
                                </div>
                                <div className="flex items-center gap-3 text-sm font-sora text-cool-mist/90">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" /> Calendar invitation will follow
                                </div>
                            </div>

                            <a
                                href="/campus-readiness-brief.pdf"
                                download="AntaraShanti_Campus_Readiness_Brief.pdf"
                                className="magnetic-button w-full bg-surface border border-electric-lavender/30 text-electric-lavender py-4 rounded-xl font-sora font-semibold hover:bg-electric-lavender hover:text-midnight-blue transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(139,125,255,0.1)]"
                            >
                                <FileText className="w-5 h-5" /> Download Campus Readiness Brief (PDF)
                            </a>

                            <div className="pt-8 border-t border-white/5">
                                <p className="font-mono text-[10px] text-cool-mist/50 uppercase tracking-widest mb-4">While You Wait...</p>
                                <div className="space-y-3">
                                    <div className="bg-midnight-blue hover:bg-white/5 cursor-pointer transition-colors p-4 rounded-xl border border-white/5 flex items-center justify-between text-left group">
                                        <div>
                                            <p className="font-sora text-sm font-semibold text-white group-hover:text-electric-lavender transition-colors">Rising Counseling Utilization</p>
                                            <p className="text-xs text-cool-mist/60 mt-1">Mental Health Impact Report</p>
                                        </div>
                                        <TrendingUp className="w-4 h-4 text-cool-mist/50 group-hover:text-electric-lavender" />
                                    </div>
                                    <div className="bg-midnight-blue hover:bg-white/5 cursor-pointer transition-colors p-4 rounded-xl border border-white/5 flex items-center justify-between text-left group">
                                        <div>
                                            <p className="font-sora text-sm font-semibold text-white group-hover:text-electric-lavender transition-colors">Infrastructure vs Reactive Care</p>
                                            <p className="text-xs text-cool-mist/60 mt-1">Cost-Benefit Analysis</p>
                                        </div>
                                        <Activity className="w-4 h-4 text-cool-mist/50 group-hover:text-electric-lavender" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 5. SOCIAL PROOF Positioning Block */}
            <section className="px-6 mb-10">
                <div className="max-w-5xl mx-auto border-t border-white/5 pt-20 text-center">
                    <h3 className="font-drama text-3xl md:text-5xl italic text-white mb-6">Built for modern campuses facing rising mental health demand.</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                        <div>
                            <h4 className="font-mono text-4xl font-bold text-electric-lavender mb-2">3.4 Wks</h4>
                            <p className="font-sora text-sm text-cool-mist/70">Average delay for initial intake at campus psychological services.</p>
                            <div className="h-0.5 w-12 bg-white/10 mx-auto mt-4" />
                        </div>
                        <div>
                            <h4 className="font-mono text-4xl font-bold text-electric-lavender mb-2">60%</h4>
                            <p className="font-sora text-sm text-cool-mist/70">Of college students report experiencing overwhelming anxiety annually.</p>
                            <div className="h-0.5 w-12 bg-white/10 mx-auto mt-4" />
                        </div>
                        <div>
                            <h4 className="font-mono text-4xl font-bold text-electric-lavender mb-2">12x</h4>
                            <p className="font-sora text-sm text-cool-mist/70">Increase in micro-intervention adherence compared to physical clinics.</p>
                            <div className="h-0.5 w-12 border-t border-dashed border-electric-lavender/40 mx-auto mt-4" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
