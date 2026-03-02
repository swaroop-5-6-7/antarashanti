import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    BrainCircuit,
    Activity,
    ShieldAlert,
    Lock,
    Users,
    FileDigit,
    Database,
    ChevronRight,
    ArrowDown,
    Wind,
    Brain,
    CalendarCheck,
    Phone,
    Terminal,
    ServerOff
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const comp = useRef(null);
    const [activeTab, setActiveTab] = useState('Immediate Relief');

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero elements
            gsap.from('.hero-text', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2
            });

            // Section fades
            const fadeUpTriggers = gsap.utils.toArray('.fade-up-trigger');
            fadeUpTriggers.forEach(trigger => {
                gsap.from(trigger.querySelectorAll('.fade-up'), {
                    scrollTrigger: {
                        trigger: trigger,
                        start: 'top 75%',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            });

            // Check-in steps stagger
            gsap.from('.check-in-step', {
                scrollTrigger: {
                    trigger: '.check-in-trigger',
                    start: 'top 70%',
                },
                x: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Escalation Diagram
            gsap.from('.escalation-level', {
                scrollTrigger: {
                    trigger: '.escalation-trigger',
                    start: 'top 60%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: 'back.out(1.2)'
            });

            gsap.from('.escalation-arrow', {
                scrollTrigger: {
                    trigger: '.escalation-trigger',
                    start: 'top 60%',
                },
                scaleY: 0,
                opacity: 0,
                transformOrigin: "top center",
                duration: 0.5,
                stagger: 0.3,
                delay: 0.4,
                ease: 'power2.out'
            });

        }, comp);
        return () => ctx.revert();
    }, []);

    const toolkitData = {
        'Immediate Relief': {
            icon: <Wind className="w-6 h-6 text-teal-400" />,
            title: 'Physiological Regulators',
            desc: 'Activate somatic tools like the 4-7-8 breathing protocol or 5-4-3-2-1 grounding exercises to immediately lower autonomic arousal.',
            log: '> Breathing protocol initialized...\n> Syncing visual expander to 4s inhale...',
            color: 'teal'
        },
        'Cognitive Reset': {
            icon: <Brain className="w-6 h-6 text-blue-400" />,
            title: 'Thought Reframing',
            desc: 'Interactive guided modules designed to identify cognitive distortions (e.g., catastrophizing) and construct balanced perspectives.',
            log: '> Cognitive distortion detected: All-or-Nothing...\n> Engaging perspective grid...',
            color: 'blue'
        },
        'Habit Builder': {
            icon: <CalendarCheck className="w-6 h-6 text-electric-lavender" />,
            title: 'Micro-Streak Logic',
            desc: 'Low-friction daily tasks focused on consistency over duration. Non-punitive resets ensure adherence even during high stress.',
            log: '> Daily baseline logged.\n> Incrementing streak without escalating friction...',
            color: 'purple'
        },
        'Crisis Mode': {
            icon: <Phone className="w-6 h-6 text-red-400" />,
            title: 'High-Risk Protocol',
            desc: 'Seamless bypass to campus safety networks. Direct dial features and text-to-dispatch systems activated based on velocity triggers.',
            log: '> Severe distress threshold met.\n> Preparing secure bridge to CAPS counselor...',
            color: 'red'
        }
    };

    const activeContent = toolkitData[activeTab];

    return (
        <div ref={comp} className="w-full bg-midnight-blue pb-32">

            {/* 1. PAGE HERO */}
            <section className="relative h-[60vh] w-full flex items-center justify-center px-6 md:px-16 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,125,255,0.08),transparent_50%)] z-10" />
                </div>
                <div className="relative z-20 text-center max-w-4xl mx-auto pt-20">
                    <h1 className="hero-text font-sora text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Emotional Intelligence <br />
                        <span className="text-electric-lavender italic font-drama pr-2">Infrastructure</span>
                    </h1>
                    <p className="hero-text font-sora text-lg md:text-xl text-cool-mist/80 max-w-2xl mx-auto">
                        A modular system designed for student resilience and institutional insight.
                    </p>
                </div>
            </section>

            {/* 2. AI EMOTIONAL CHECK-IN ENGINE */}
            <section className="check-in-trigger py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Animated UI Simulation */}
                    <div className="bg-[#1C1C1C] rounded-4xl p-8 border border-white/5 relative shadow-2xl overflow-hidden group">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-electric-lavender/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-electric-lavender/20 transition-all duration-700" />

                        {/* Step 1 */}
                        <div className="check-in-step mb-8 relative z-10">
                            <p className="font-mono text-[10px] text-cool-mist/50 uppercase tracking-widest mb-3">Step 1 — Mood Selection</p>
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-40 grayscale"><span className="text-lg">😫</span></div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-40 grayscale"><span className="text-lg">😕</span></div>
                                <div className="w-10 h-10 rounded-full bg-electric-lavender/20 border border-electric-lavender flex items-center justify-center shadow-[0_0_15px_rgba(139,125,255,0.3)] transform scale-110"><span className="text-lg">😰</span></div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-40 grayscale"><span className="text-lg">😐</span></div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-40 grayscale"><span className="text-lg">🙂</span></div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="check-in-step mb-8 relative z-10">
                            <p className="font-mono text-[10px] text-cool-mist/50 uppercase tracking-widest mb-3">Step 2 — Context Input</p>
                            <div className="bg-midnight-blue/50 rounded-xl p-4 border border-white/10 font-sora text-sm text-cool-mist">
                                I'm feeling really anxious about my midterms and I can't seem to focus on anything.
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="check-in-step mb-8 relative z-10 ml-8">
                            <p className="font-mono text-[10px] text-electric-lavender/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <BrainCircuit className="w-3 h-3" /> Step 3 — AI Reflection
                            </p>
                            <div className="bg-electric-lavender/10 rounded-xl p-5 border border-electric-lavender/30 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-lavender/5 to-transparent animate-[shimmer_2.5s_infinite]" />
                                <p className="font-sora text-sm text-electric-lavender relative z-10 leading-relaxed">
                                    It sounds like academic pressure is peaking right now. When we look at everything at once, it feels impossible. <br /><br />Let's focus on just the next 15 minutes. What is the smallest task you can do right now?
                                    <span className="inline-block w-1.5 h-3 bg-electric-lavender animate-pulse ml-1 align-middle" />
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="check-in-step flex items-center justify-center gap-2 mt-10 pt-6 border-t border-white/5 relative z-10">
                            <Lock className="w-4 h-4 text-green-400" />
                            <span className="font-mono text-xs text-green-400 uppercase tracking-widest">Encrypted & Stored Securely</span>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="fade-up-trigger">
                        <h2 className="fade-up font-sora text-3xl md:text-4xl font-bold text-white mb-6">AI Emotional Check-In Engine</h2>
                        <div className="space-y-6">
                            <p className="fade-up font-sora text-cool-mist/80 leading-relaxed">
                                <strong className="text-white">Behavioral Reflection Loop:</strong> We don't just track data; we interrupt catastrophic spirals. By prompting students to process their anxiety through a secure, guided interface, we introduce immediate cognitive relief.
                            </p>
                            <p className="fade-up font-sora text-cool-mist/80 leading-relaxed">
                                <strong className="text-white">Emotional Pattern Recognition:</strong> Natural Language Processing (NLP) runs locally to detect semantic shifts. The system learns when a student's baseline stress transitions into high-risk behavioral velocity.
                            </p>
                            <p className="fade-up font-sora text-cool-mist/80 leading-relaxed">
                                <strong className="text-white">Privacy-First Design:</strong> Journals never touch unencrypted servers. We utilize zero-knowledge architecture to ensure that institutional dashboards receive macro-insights without ever compromising individual identities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CLINICAL WELLNESS TOOLKIT */}
            <section className="fade-up-trigger py-32 bg-slate-gray/30 border-y border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
                    <div className="text-center mb-16 fade-up">
                        <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Clinical Wellness Toolkit</h2>
                        <p className="font-sora text-cool-mist/70 max-w-2xl mx-auto">
                            Real-time access to evidence-based coping mechanisms, organized by immediate psychological need.
                        </p>
                    </div>

                    {/* Dashboard UI */}
                    <div className="fade-up max-w-5xl mx-auto bg-[#1C1C1C] border border-white/10 rounded-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

                        {/* Sidebar Tabs */}
                        <div className="md:w-64 bg-midnight-blue border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                            {Object.keys(toolkitData).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-sora text-sm font-medium transition-all text-left whitespace-nowrap ${activeTab === tab ? 'bg-white/10 text-white shadow-inner' : 'text-cool-mist/50 hover:bg-white/5 hover:text-cool-mist/90'}`}
                                >
                                    {toolkitData[tab].icon}
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-8 md:p-12 flex flex-col relative min-h-[400px]">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                {activeContent.icon}
                            </div>

                            <div className="flex-1 relative z-10">
                                <h3 className="font-sora text-2xl font-bold text-white mb-4">{activeContent.title}</h3>
                                <p className="font-sora text-cool-mist/80 leading-relaxed mb-10 max-w-lg">
                                    {activeContent.desc}
                                </p>

                                {/* Simulated Widget Area */}
                                <div className="w-full max-w-sm h-32 bg-midnight-blue/50 rounded-2xl border border-white/5 flex items-center justify-center mb-8 relative overflow-hidden">
                                    {activeTab === 'Immediate Relief' && (
                                        <div className="w-16 h-16 rounded-full border border-teal-400/50 flex items-center justify-center animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]">
                                            <div className="w-10 h-10 rounded-full bg-teal-400/20" />
                                        </div>
                                    )}
                                    {activeTab === 'Cognitive Reset' && (
                                        <div className="grid grid-cols-2 gap-2 w-3/4">
                                            <div className="h-8 bg-white/5 rounded-md" />
                                            <div className="h-8 bg-blue-400/20 rounded-md border border-blue-400/30" />
                                            <div className="h-8 bg-blue-400/20 rounded-md border border-blue-400/30" />
                                            <div className="h-8 bg-white/5 rounded-md" />
                                        </div>
                                    )}
                                    {activeTab === 'Habit Builder' && (
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((d) => (
                                                <div key={d} className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs ${d <= 3 ? 'bg-electric-lavender text-midnight-blue font-bold' : 'bg-white/5 text-cool-mist/50'}`}>
                                                    {d <= 3 ? '✓' : d}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {activeTab === 'Crisis Mode' && (
                                        <button className="bg-red-500/20 text-red-500 border border-red-500/50 px-6 py-3 rounded-full font-sora font-semibold text-sm flex items-center gap-2 hover:bg-red-500 hover:text-white transition-colors">
                                            <Phone className="w-4 h-4" /> Connect to CAPS
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* System Log */}
                            <div className="w-full bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-[11px] text-green-400/70 whitespace-pre-wrap relative z-10">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5 text-cool-mist/40">
                                    <Terminal className="w-3 h-3" /> System Output
                                </div>
                                {activeContent.log}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CRISIS DETECTION & ESCALATION LOGIC */}
            <section className="escalation-trigger py-32 px-6 md:px-16 relative">
                <div className="text-center mb-20 fade-up">
                    <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Crisis Escalation Flow</h2>
                    <p className="font-sora text-cool-mist/70 max-w-2xl mx-auto">
                        Dynamic routing architecture that smoothly transitions from algorithmic self-regulation to institutional human intervention.
                    </p>
                </div>

                <div className="flex flex-col items-center max-w-2xl mx-auto relative z-10 w-full">

                    {/* Level 1 */}
                    <div className="escalation-level w-full bg-slate-gray/50 backdrop-blur-md p-6 rounded-3xl border border-blue-400/20 shadow-[0_4px_20px_rgba(96,165,250,0.05)] flex items-center gap-6 relative group hover:border-blue-400/40 transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-400 rounded-l-3xl opacity-50" />
                        <div className="w-14 h-14 rounded-full bg-blue-400/10 flex items-center justify-center shrink-0 border border-blue-400/30">
                            <span className="font-mono text-xl font-bold text-blue-400">L1</span>
                        </div>
                        <div>
                            <h3 className="font-sora text-xl font-bold text-white mb-1">Self-Regulation Suggestions</h3>
                            <p className="font-sora text-sm text-cool-mist/70">Algorithm provides CBT reframing and immediate breathing exercises directly within the UI. No human intervention required.</p>
                        </div>
                    </div>

                    <div className="escalation-arrow h-12 w-[1px] bg-gradient-to-b from-blue-400/50 via-white/20 to-yellow-400/50 my-2 relative hidden md:block" />
                    <div className="escalation-arrow md:hidden h-8 w-[1px] bg-white/20 my-2" />

                    {/* Level 2 */}
                    <div className="escalation-level w-full bg-[#2A2328]/80 backdrop-blur-md p-6 rounded-3xl border border-yellow-400/20 shadow-[0_4px_20px_rgba(250,204,21,0.05)] flex items-center gap-6 relative group hover:border-yellow-400/40 transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-400 rounded-l-3xl opacity-50" />
                        <div className="w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 border border-yellow-400/30">
                            <span className="font-mono text-xl font-bold text-yellow-400">L2</span>
                        </div>
                        <div>
                            <h3 className="font-sora text-xl font-bold text-white mb-1">Campus Support Recommendation</h3>
                            <p className="font-sora text-sm text-cool-mist/70">Anxiety baseline persists over multiple days. The interface gracefully suggests scheduling a preventative check-in with CAPS.</p>
                        </div>
                    </div>

                    <div className="escalation-arrow h-12 w-[1px] bg-gradient-to-b from-yellow-400/50 via-white/20 to-red-500/50 my-2 relative hidden md:block" />
                    <div className="escalation-arrow md:hidden h-8 w-[1px] bg-white/20 my-2" />

                    {/* Level 3 */}
                    <div className="escalation-level w-full bg-[#351C21]/90 backdrop-blur-md p-6 rounded-3xl border border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)] flex items-center gap-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/5 animate-[pulse_2s_ease-in-out_infinite]" />
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500 rounded-l-3xl shadow-[0_0_15px_#ef4444]" />

                        <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/50 relative">
                            <div className="absolute inset-0 rounded-full border border-red-500 animate-[ping_2s_infinite]" />
                            <span className="font-mono text-xl font-bold text-red-500 relative z-10">L3</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-sora text-xl font-bold text-white mb-1">Immediate Crisis Routing</h3>
                            <p className="font-sora text-sm text-red-200/80">Critical NLP markers detected. System halts standard flow, replacing UI with immediate emergency dispatcher routing and on-call counselor connections.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 5. DATA & PRIVACY ARCHITECTURE */}
            <section className="fade-up-trigger py-32 bg-slate-gray/20 border-t border-white/5 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                    <div className="text-center mb-16 fade-up">
                        <h2 className="font-sora text-3xl font-bold text-white mb-4">Architecture of Trust</h2>
                        <p className="font-sora text-cool-mist/70">Engineered to bypass institutional liabilities while protecting student privacy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: <Lock className="w-6 h-6 text-white" />, title: 'End-to-End Encryption', desc: 'Symmetrical AES-256 at rest, TLS 1.3 in transit. Only the student device holds the decryption key for raw journals.' },
                            { icon: <Users className="w-6 h-6 text-white" />, title: 'Anonymous Aggregation', desc: 'Decoupling personal identities from emotional metadata ensures macro-insights are mathematically untraceable.' },
                            { icon: <FileDigit className="w-6 h-6 text-white" />, title: 'FERPA/GDPR Alignment', desc: 'Strict compliance architecture constructed deliberately to easily pass rigorous university IT security audits.' },
                            { icon: <ServerOff className="w-6 h-6 text-white" />, title: 'No Data Monetization', desc: 'Zero third-party model training. Zero advertising logic. The infrastructure exists solely to serve the campus.' }
                        ].map((card, i) => (
                            <div key={i} className="fade-up bg-midnight-blue/50 p-8 rounded-3xl border border-white/5 relative group hover:bg-[#1C1C1C] hover:border-electric-lavender/30 transition-colors duration-300">
                                <div className="w-12 h-12 rounded-full bg-slate-gray flex items-center justify-center mb-5 group-hover:bg-electric-lavender group-hover:text-midnight-blue transition-colors">
                                    {React.cloneElement(card.icon, { className: 'w-5 h-5 transition-colors' })}
                                </div>
                                <h3 className="font-sora text-xl font-bold text-white mb-3">{card.title}</h3>
                                <p className="font-sora text-sm text-cool-mist/60 leading-relaxed group-hover:text-cool-mist/80 transition-colors">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FINAL CTA BLOCK */}
            <section className="py-32 px-6 fade-up-trigger">
                <div className="max-w-4xl mx-auto text-center bg-[radial-gradient(ellipse_at_center,rgba(139,125,255,0.1)_0,transparent_70%)] py-16">
                    <h2 className="fade-up font-sora text-3xl md:text-5xl font-bold text-white mb-10 leading-tight">
                        Deploy proactive emotional infrastructure across your campus.
                    </h2>
                    <Link to="/demo" className="fade-up magnetic-button bg-electric-lavender text-midnight-blue px-10 py-5 rounded-full font-sora font-semibold text-lg inline-flex items-center gap-3 transition-transform shadow-[0_0_30px_rgba(139,125,255,0.2)] hover:shadow-[0_0_50px_rgba(139,125,255,0.4)] hover:scale-105">
                        Book a Campus Demo <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

        </div>
    );
}
