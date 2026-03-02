import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, BrainCircuit, Activity, Users, ChevronRight, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const comp = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero animations
            gsap.from('.hero-elem', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2
            });

            // Cards stagger
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: '.features-section',
                    start: 'top 70%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });

            // Text reveal in Safe Circle
            gsap.from('.reveal-text', {
                scrollTrigger: {
                    trigger: '.safe-circle',
                    start: 'top 60%',
                },
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out'
            });

            // Sticky stacked cards
            const campusCards = gsap.utils.toArray('.sticky-card');
            campusCards.forEach((card, i) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: `top top+=${100 + i * 20}`,
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    endTrigger: '.campus-intelligence',
                    markers: false
                });
            });

        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="w-full">
            {/* HERO - The Safe Entry */}
            <section className="relative h-[100dvh] w-full flex items-end pb-24 px-6 md:px-16 lg:px-24">
                {/* Background Image with Gradient */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-bg.png"
                        alt="Campus Architecture Abstract"
                        className="w-full h-full object-cover object-center opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue via-midnight-blue/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue via-midnight-blue/50 to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-4xl text-left">
                    <h1 className="hero-elem font-sora text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-white mb-6">
                        <span className="block text-electric-lavender">Emotional intelligence</span>
                        <span className="block font-drama italic font-normal text-cool-mist opacity-90">Beyond stigma.</span>
                    </h1>
                    <p className="hero-elem font-sora text-lg md:text-xl text-cool-mist/80 max-w-xl leading-relaxed mb-10">
                        Private emotional intelligence infrastructure for modern campuses. Real-time support for students, proactive insights for institutions.
                    </p>
                    <div className="hero-elem flex flex-wrap items-center gap-4">
                        <Link to="/demo" className="magnetic-button bg-electric-lavender text-midnight-blue px-8 py-4 rounded-full font-sora font-semibold text-base flex items-center gap-2 hover:bg-white transition-colors">
                            Book a Campus Demo <ChevronRight className="w-5 h-5" />
                        </Link>
                        <span className="font-mono text-sm text-cool-mist/60 px-4">Trusted infrastructure</span>
                    </div>
                </div>
            </section>

            {/* FEATURES - Interactive Emotional Engine */}
            <section className="features-section py-32 px-6 md:px-16 lg:px-24 relative z-10 bg-midnight-blue">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="font-sora text-4xl md:text-5xl font-bold text-white mb-6">Interactive Emotional Engine</h2>
                            <p className="font-sora text-cool-mist/70 text-lg max-w-2xl">Bridging student struggles with accessible, real-time support while giving institutions proactive visibility.</p>
                        </div>
                        <Link to="/features" className="link-lift flexItems-center gap-2 text-electric-lavender font-sora font-medium hover:text-white transition-colors shrink-0">
                            Explore the system <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="feature-card bg-slate-gray rounded-4xl p-8 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-electric-lavender/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-electric-lavender/20 transition-all duration-500" />
                            <div className="h-48 mb-6 flex flex-col justify-end">
                                <div className="w-full bg-midnight-blue rounded-2xl p-4 flex flex-col gap-3 font-mono text-xs">
                                    <div className="flex gap-2 items-center text-cool-mist/50">
                                        <div className="w-2 h-2 rounded-full bg-electric-lavender animate-pulse" /> Encrypted Session
                                    </div>
                                    <div className="bg-slate-gray p-3 rounded-lg rounded-tl-sm text-cool-mist">
                                        How are you feeling today?
                                    </div>
                                    <div className="bg-electric-lavender/20 text-electric-lavender p-3 rounded-lg rounded-tr-sm self-end max-w-[80%]">
                                        Overwhelmed with finals...
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-sora text-xl font-semibold text-white mb-3">AI-Powered Check-Ins</h3>
                            <p className="font-sora text-sm text-cool-mist/70">Contextual coping generation with frictionless daily emotional tracking without judgment.</p>
                            <div className="mt-6 inline-block border border-electric-lavender/30 text-electric-lavender font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                                Encrypted & Private
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="feature-card bg-slate-gray rounded-4xl p-8 border border-white/5 relative overflow-hidden group">
                            <div className="h-48 mb-6 flex flex-col justify-end">
                                <div className="w-full bg-midnight-blue rounded-2xl p-5 font-mono text-sm leading-loose text-cool-mist/80 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-midnight-blue/80 pointer-events-none" />
                                    <div>&gt; Analyzing emotional state...</div>
                                    <div className="text-electric-lavender">&gt; Breathing exercise ready_</div>
                                    <div>&gt; Grounding protocol activated...</div>
                                    <div className="opacity-50">&gt; Reframing suggestion generated...</div>
                                    <div className="w-2 h-4 bg-electric-lavender inline-block animate-pulse ml-1 align-middle" />
                                </div>
                            </div>
                            <h3 className="font-sora text-xl font-semibold text-white mb-3">Clinical Wellness Toolkit</h3>
                            <p className="font-sora text-sm text-cool-mist/70">Real-time access to evidence-based coping mechanisms instantly tailored to the user's stress profile.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="feature-card bg-slate-gray rounded-4xl p-8 border border-white/5 relative overflow-hidden group">
                            <div className="h-48 mb-6 flex flex-col justify-end">
                                <div className="w-full h-full bg-midnight-blue rounded-2xl p-4 flex flex-col gap-2 relative">
                                    <div className="grid grid-cols-7 gap-1 flex-1">
                                        {[...Array(28)].map((_, i) => (
                                            <div key={i} className={`rounded-sm ${i === 18 ? 'bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.5)]' : i % 5 === 0 ? 'bg-electric-lavender/40' : 'bg-white/5'}`} />
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-surface p-2 rounded-lg border border-red-500/30 flex items-center gap-2 shadow-xl shadow-black/50 backdrop-blur-md">
                                        <ShieldAlert className="w-4 h-4 text-red-400" />
                                        <span className="font-mono text-xs text-cool-mist">Routing to Support</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-sora text-xl font-semibold text-white mb-3">Crisis Smart Routing</h3>
                            <p className="font-sora text-sm text-cool-mist/70">Automated crisis detection identifies high-risk days to safely escalate to campus counselors or trusted contacts.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SAFE CIRCLE - Philosophy */}
            <section className="safe-circle py-40 px-6 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2670&auto=format&fit=crop"
                        alt="Campus Silhouette"
                        className="w-full h-full object-cover opacity-[0.03] grayscale mix-blend-screen"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <p className="reveal-text font-sora text-xl md:text-2xl text-cool-mist/60 mb-8 font-light">
                        Most platforms focus on <br className="hidden md:block" /> surface-level engagement metrics.
                    </p>
                    <p className="reveal-text font-drama text-5xl md:text-7xl italic text-white leading-tight mb-12">
                        We focus on <br />
                        <span className="text-electric-lavender not-italic font-sora font-semibold tracking-tight relative inline-block mt-4">
                            deep emotional resilience.
                            <div className="absolute bottom-1 left-0 w-full h-3 bg-electric-lavender/20 -z-10 rounded-sm" />
                        </span>
                    </p>
                    <Link to="/community" className="reveal-text inline-block pb-1 border-b border-electric-lavender/50 text-electric-lavender hover:text-white transition-colors">
                        Discover the Safe Circle Community
                    </Link>
                </div>
            </section>

            {/* CAMPUS INTELLIGENCE - Sticky Stacking */}
            <section className="campus-intelligence py-24 relative bg-midnight-blue h-[400vh]">
                <div className="max-w-6xl mx-auto px-6 h-full relative">
                    <div className="sticky top-24 pt-10 pb-6 z-20 bg-midnight-blue/90 backdrop-blur-sm -mx-6 px-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="font-sora text-4xl md:text-5xl font-bold text-white text-center md:text-left">Real-Time Campus Analytics</h2>
                        <Link to="/impact" className="magnetic-button bg-surface border border-electric-lavender/30 text-electric-lavender px-6 py-2.5 rounded-full font-sora font-semibold text-sm transition-all hover:bg-electric-lavender hover:text-midnight-blue shrink-0 text-center">
                            View Admin Dashboard
                        </Link>
                    </div>

                    <div className="relative h-full pt-10">
                        {/* Sticky Card 1 */}
                        <div className="sticky-card bg-slate-gray rounded-5xl p-10 md:p-16 border border-white/5 shadow-2xl mb-24 w-full max-w-4xl mx-auto transform origin-top">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                                        <Users className="w-6 h-6 text-electric-lavender" />
                                    </div>
                                    <h3 className="font-sora text-3xl font-bold text-white mb-4">Anonymized Aggregation</h3>
                                    <p className="font-sora text-cool-mist/80 leading-relaxed">
                                        Institutions gain macro-level visibility into student well-being without compromising individual privacy. Understand department-level stress securely.
                                    </p>
                                </div>
                                <div className="h-64 bg-midnight-blue rounded-3xl border border-white/5 p-6 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,125,255,0.15)_0,transparent_70%)]" />
                                    {/* Abstract Heatmap */}
                                    <div className="grid grid-cols-5 gap-3 w-full h-full p-4 animate-[spin_60s_linear_infinite]">
                                        {[...Array(25)].map((_, i) => (
                                            <div key={i} className={`rounded-full ${[12, 13, 7, 17].includes(i) ? 'bg-electric-lavender/60 blur-md' : 'bg-electric-lavender/10'} transition-all duration-1000`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Card 2 */}
                        <div className="sticky-card bg-[#232631] rounded-5xl p-10 md:p-16 border border-white/5 shadow-2xl mb-24 w-full max-w-4xl mx-auto transform origin-top pt-12">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="order-2 md:order-1 h-64 bg-midnight-blue rounded-3xl border border-white/5 p-6 relative overflow-hidden flex items-end">
                                    {/* Abstract Graph */}
                                    <div className="w-full h-full flex items-end gap-2 px-4 pb-4">
                                        {[40, 60, 45, 80, 50, 90, 65, 30].map((h, i) => (
                                            <div key={i} className="flex-1 bg-gradient-to-t from-electric-lavender/5 to-electric-lavender/40 rounded-t-sm relative group">
                                                <div className="absolute bottom-0 w-full bg-electric-lavender transition-all duration-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                            </div>
                                        ))}
                                        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-midnight-blue to-transparent z-10" />
                                        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-midnight-blue to-transparent z-10" />
                                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-electric-lavender/20 border-t border-dashed border-electric-lavender/40" />
                                    </div>
                                </div>
                                <div className="order-1 md:order-2">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                                        <Activity className="w-6 h-6 text-electric-lavender" />
                                    </div>
                                    <h3 className="font-sora text-3xl font-bold text-white mb-4">Pattern Detection</h3>
                                    <p className="font-sora text-cool-mist/80 leading-relaxed">
                                        Identify campus-wide emotional shifts linked to academic calendars, dorm environments, or external events before they escalate.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Card 3 */}
                        <div className="sticky-card bg-slate-gray rounded-5xl p-10 md:p-16 border border-white/5 shadow-2xl w-full max-w-4xl mx-auto transform origin-top pt-16">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                                        <BrainCircuit className="w-6 h-6 text-electric-lavender" />
                                    </div>
                                    <h3 className="font-sora text-3xl font-bold text-white mb-4">Proactive Intervention</h3>
                                    <p className="font-sora text-cool-mist/80 leading-relaxed">
                                        Deploy targeted resources precisely when needed. Reach students effectively during midterms, finals, or critical campus transition periods.
                                    </p>
                                </div>
                                <div className="h-64 bg-midnight-blue rounded-3xl border border-white/5 p-6 relative overflow-hidden flex items-center justify-center">
                                    <div className="w-full flex items-center justify-center">
                                        <div className="w-32 h-32 rounded-full border-2 border-electric-lavender/30 flex items-center justify-center relative">
                                            <div className="absolute inset-0 rounded-full border border-electric-lavender animate-ping opacity-20" />
                                            <div className="w-24 h-24 rounded-full bg-electric-lavender/10 flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-electric-lavender/20 blur-md absolute" />
                                                <Shield className="w-8 h-8 text-electric-lavender relative z-10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* GAMIFICATION */}
            <section className="py-32 px-6 relative bg-midnight-blue border-t border-white/5">
                <div className="max-w-5xl mx-auto rounded-6xl p-8 md:p-16 bg-surface/30 backdrop-blur-xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-lavender/5 to-transparent pointer-events-none" />

                    <div className="text-center mb-16">
                        <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Habit Building System</h2>
                        <p className="font-sora text-cool-mist/70">Consistent engagement mapped to psychological proven methods.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 hidden md:block -z-10" />

                        {/* Tier 1 */}
                        <div className="bg-midnight-blue rounded-3xl p-6 border border-white/5 text-center flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 rounded-full bg-surface border-4 border-midnight-blue flex items-center justify-center mb-4 text-cool-mist/50">
                                <span className="font-mono text-sm">Lv.1</span>
                            </div>
                            <h4 className="font-sora font-semibold text-white mb-2">Explorer</h4>
                            <p className="text-sm text-cool-mist/60">3 Days Checked In</p>
                        </div>

                        {/* Tier 2 (Highlighted) */}
                        <div className="bg-surface rounded-3xl p-8 border border-electric-lavender/30 text-center flex flex-col items-center shadow-[0_0_40px_rgba(139,125,255,0.15)] relative transform scale-105 z-10">
                            <div className="absolute -top-3 bg-electric-lavender text-midnight-blue text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full font-mono">Current</div>
                            <div className="w-20 h-20 rounded-full bg-midnight-blue border border-electric-lavender flex items-center justify-center mb-4 relative">
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="40" cy="40" r="38" className="stroke-white/10 fill-none" strokeWidth="4" />
                                    <circle cx="40" cy="40" r="38" className="stroke-electric-lavender fill-none" strokeWidth="4" strokeDasharray="238" strokeDashoffset="60" strokeLinecap="round" />
                                </svg>
                                <span className="font-mono text-electric-lavender font-bold">Lv.2</span>
                            </div>
                            <h4 className="font-sora text-xl font-bold text-white mb-2">Builder</h4>
                            <p className="text-sm text-cool-mist/80">14 Days Checked In</p>
                            <div className="mt-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-electric-lavender' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>

                        {/* Tier 3 */}
                        <div className="bg-midnight-blue rounded-3xl p-6 border border-white/5 text-center flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 rounded-full bg-surface border-4 border-midnight-blue flex items-center justify-center mb-4 text-cool-mist/50">
                                <span className="font-mono text-sm">Lv.3</span>
                            </div>
                            <h4 className="font-sora font-semibold text-white mb-2">Resilient</h4>
                            <p className="text-sm text-cool-mist/60">30 Days Checked In</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
