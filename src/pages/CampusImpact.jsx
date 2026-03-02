import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, TrendingUp, ShieldCheck, Activity, Users, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CampusImpact() {
    const comp = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Stagger stats
            gsap.from('.stat-card', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            });

            // Reveal framework steps
            gsap.from('.framework-step', {
                scrollTrigger: {
                    trigger: '.framework-section',
                    start: 'top 70%',
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Compliance reveal
            gsap.from('.compliance-card', {
                scrollTrigger: {
                    trigger: '.compliance-section',
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="pt-32 pb-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">

            {/* HEADER */}
            <div className="mb-20 text-center max-w-4xl mx-auto">
                <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Macro-Visibility for <br /><span className="text-electric-lavender">Modern Institutions</span>
                </h1>
                <p className="font-sora text-lg text-cool-mist/80 leading-relaxed">
                    Zero personal identity exposure. 100% actionable insight. Track student well-being trends, detect crisis patterns early, and improve retention rates with the AntaraShanti Administrative Engine.
                </p>
            </div>

            {/* ADMIN DASHBOARD MOCKUP */}
            <div className="relative mb-32 z-10 w-full overflow-hidden rounded-5xl border border-white/10 bg-surface/50 backdrop-blur-md shadow-2xl p-2 md:p-6">
                <div className="absolute top-0 right-0 w-96 h-96 bg-electric-lavender/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Dashboard Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5 pl-4">
                    <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-electric-lavender" />
                        <h3 className="font-mono text-sm text-white font-medium uppercase tracking-wider">Campus Overview (Anonymized)</h3>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white/5 rounded-full font-mono text-xs text-cool-mist/70 border border-white/5">Fall Semester</span>
                        <span className="px-3 py-1 bg-electric-lavender/20 rounded-full font-mono text-xs text-electric-lavender border border-electric-lavender/30 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-electric-lavender animate-pulse" /> Live Aggregation
                        </span>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="stat-card bg-[#232631] p-6 rounded-3xl border border-white/5">
                        <p className="font-mono text-xs text-cool-mist/50 mb-2">Active Student Cohort</p>
                        <p className="font-sora text-3xl font-bold text-white mb-1">12,450</p>
                        <p className="font-sora text-xs text-green-400 flex items-center gap-1">+4.2% engagement</p>
                    </div>
                    <div className="stat-card bg-[#232631] p-6 rounded-3xl border border-white/5">
                        <p className="font-mono text-xs text-cool-mist/50 mb-2">Campus Stress Baseline</p>
                        <p className="font-sora text-3xl font-bold text-white mb-1">Elevated</p>
                        <p className="font-sora text-xs text-red-400 flex items-center gap-1">Midterm cycle detected</p>
                    </div>
                    <div className="stat-card bg-[#232631] p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-electric-lavender/10 to-transparent pointer-events-none" />
                        <p className="font-mono text-xs text-cool-mist/50 mb-2">Resilience Protocol Interventions</p>
                        <p className="font-sora text-3xl font-bold text-electric-lavender mb-1">842</p>
                        <p className="font-sora text-xs text-cool-mist/70 flex items-center gap-1">Automated cognitive resets</p>
                    </div>
                    <div className="stat-card bg-[#232631] p-6 rounded-3xl border border-white/5">
                        <p className="font-mono text-xs text-cool-mist/50 mb-2">High-Risk Escalations</p>
                        <p className="font-sora text-3xl font-bold text-white mb-1">14</p>
                        <p className="font-sora text-xs text-yellow-400 flex items-center gap-1">Routed to campus counseling</p>
                    </div>
                </div>

                {/* Dashboard Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-midnight-blue/50 p-6 rounded-3xl border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="font-sora text-sm text-cool-mist/80 font-semibold gap-2 flex items-center">
                                <TrendingUp className="w-4 h-4 text-electric-lavender" /> 8-Week Emotional Trajectory
                            </h4>
                        </div>
                        {/* Mock Chart Area */}
                        <div className="h-48 w-full border-b border-l border-white/10 relative flex items-end justify-between px-2 pb-1 text-xs font-mono text-white/30">
                            <div className="absolute bottom-4 left-0 w-full h-[1px] bg-electric-lavender/10" />
                            <div className="absolute bottom-12 left-0 w-full h-[1px] bg-electric-lavender/20 border-t border-dashed border-electric-lavender/40" />
                            <div className="absolute top-10 right-4 px-3 py-1 bg-red-500/10 text-red-400 rounded-md border border-red-500/20 text-[10px] animate-pulse">Pre-Finals Spike</div>
                            {[30, 45, 35, 50, 40, 85, 65, 40].map((h, i) => (
                                <div key={i} className="w-[10%] bg-gradient-to-t from-electric-lavender/10 to-electric-lavender/50 rounded-t-sm relative group transition-all hover:opacity-80 cursor-crosshair pb-0.5" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-white/10 px-2 py-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl pointer-events-none">Wk {i + 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-midnight-blue/50 p-6 rounded-3xl border border-white/5">
                        <h4 className="font-sora text-sm text-cool-mist/80 font-semibold gap-2 flex items-center mb-6">
                            <BarChart3 className="w-4 h-4 text-electric-lavender" /> Primary Stress Contexts
                        </h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Academic Pressure', w: '75%', color: 'from-electric-lavender' },
                                { label: 'Financial Anxiety', w: '45%', color: 'from-blue-400' },
                                { label: 'Social Isolation', w: '60%', color: 'from-teal-400' },
                                { label: 'Career Uncertainty', w: '55%', color: 'from-indigo-400' }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between font-mono text-[10px] text-cool-mist/60 mb-1">
                                        <span>{item.label}</span>
                                        <span>{item.w}</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                        <div className={`h-full bg-gradient-to-r ${item.color} to-transparent rounded-full`} style={{ width: item.w }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* EARLY INTERVENTION FRAMEWORK */}
            <div className="framework-section mb-32 border-t border-white/10 pt-24 mt-24">
                <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-12 text-center">Early Intervention Framework</h2>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {[
                        { step: '01', title: 'Collect', desc: 'Secure, encrypted daily behavioral check-ins via localized sub-agents.' },
                        { step: '02', title: 'Detect', desc: 'NLP logic cross-references emotional velocity against academic calendars.' },
                        { step: '03', title: 'Alert', desc: 'System internally flags anomalies without exposing raw student messages.' },
                        { step: '04', title: 'Support', desc: 'Dynamic micro-interventions deployed. Severe cases escalated.' },
                        { step: '05', title: 'Measure', desc: 'Institutional retention and recovery analytics updated.' }
                    ].map((item, i) => (
                        <div key={i} className="framework-step bg-[#1C1C1C]/50 p-6 rounded-3xl border border-white/5 hover:border-electric-lavender/30 transition-colors relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-electric-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                            <div className="font-mono text-3xl font-bold text-electric-lavender/40 mb-4">{item.step}</div>
                            <h4 className="font-sora text-lg font-bold text-white mb-2">{item.title}</h4>
                            <p className="font-sora text-xs text-cool-mist/70 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* COMPLIANCE AND PRIVACY */}
            <div className="compliance-section grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-midnight-blue rounded-5xl p-10 md:p-16 border border-white/5 relative overflow-hidden">
                <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-electric-lavender/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="min-w-0">
                    <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-6">Built for Institutional Trust</h2>
                    <p className="font-sora text-cool-mist/80 mb-8 leading-relaxed">
                        We don't sell data. We don't train third-party models on student trauma. AntaraShanti is engineered specifically for FERPA-compliant university environments, operating on a strict zero-knowledge architecture.
                    </p>

                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <ShieldCheck className="w-6 h-6 text-electric-lavender shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-sora font-semibold text-white">Zero-Knowledge Architecture</h5>
                                <p className="font-sora text-sm text-cool-mist/60 mt-1">Raw journal logs stay on device. Only abstracted emotional metadata hits the macro dashboard.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <Database className="w-6 h-6 text-electric-lavender shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-sora font-semibold text-white">FERPA Aligned Data Policies</h5>
                                <p className="font-sora text-sm text-cool-mist/60 mt-1">Structured specifically to bypass traditional ed-tech compliance hurdles.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <Users className="w-6 h-6 text-electric-lavender shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-sora font-semibold text-white">Anonymized Macro Aggregation</h5>
                                <p className="font-sora text-sm text-cool-mist/60 mt-1">Identities are mathematically decoupled from emotional trends.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="compliance-card bg-surface/80 backdrop-blur-sm p-4 md:p-8 rounded-4xl border border-white/10 shadow-2xl relative min-w-0 w-full">
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white font-mono text-[10px] font-bold tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]">STRICT POLICY</div>
                    <pre className="font-mono text-xs text-cool-mist/60 leading-loose overflow-x-auto max-w-full">
                        <span className="text-electric-lavender">function</span> routeEscalation(studentData) {'{'}
                        <span className="text-white/30">// 1. Strip identifiers</span>
                        <span className="text-electric-lavender">const</span> cleanContext = <span className="text-blue-400">anonymize</span>(studentData);

                        <span className="text-white/30">// 2. Check threshold</span>
                        <span className="text-electric-lavender">if</span> (cleanContext.riskLevel &gt;= <span className="text-orange-400">0.85</span>) {'{'}
                        <span className="text-electric-lavender">return</span> system.<span className="text-blue-400">initiateCounselingBridge</span>();
                        {'}'} <span className="text-electric-lavender">else</span> {'{'}
                        <span className="text-electric-lavender">return</span> system.<span className="text-blue-400">aggregateToMacroDataset</span>();
                        {'}'}
                        {'}'}
                    </pre>
                </div>
            </div>

        </div>
    );
}
