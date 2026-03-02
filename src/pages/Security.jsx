import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Lock, EyeOff, Server, FileDigit, Fingerprint } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Security() {
    const comp = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Fade ups
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

            // Node lines
            gsap.from('.node-line', {
                scrollTrigger: {
                    trigger: '.nodes-trigger',
                    start: 'top 75%',
                },
                scaleY: 0,
                transformOrigin: "top center",
                duration: 1.5,
                stagger: 0.2,
                ease: 'power2.inOut'
            });

        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="pt-32 pb-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto overflow-hidden">

            {/* HEADER */}
            <div className="mb-24 text-center max-w-4xl mx-auto relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-electric-lavender/10 blur-[60px] rounded-full pointer-events-none" />
                <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Absolute <span className="text-electric-lavender italic font-drama pr-2">Security</span>
                </h1>
                <p className="font-sora text-lg text-cool-mist/80 leading-relaxed max-w-2xl mx-auto">
                    We treat emotional data with the same rigorous encryption standards as financial infrastructure. No exceptions.
                </p>
            </div>

            {/* CORE PILLARS GRID */}
            <div className="fade-up-trigger grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                {[
                    { icon: <Lock className="w-6 h-6 text-white" />, title: "End-to-End Encryption", desc: "Data is encrypted symmetrically at rest (AES-256) and asymmetrically in transit (TLS 1.3)." },
                    { icon: <EyeOff className="w-6 h-6 text-white" />, title: "Zero-Knowledge Architecture", desc: "We possess no decryption keys for journaling endpoints. Only the student can read raw inputs." },
                    { icon: <FileDigit className="w-6 h-6 text-white" />, title: "FERPA / GDPR Compliant", desc: "Architected strictly to bypass liabilities. Institutions gain insight; student PHI remains sealed." }
                ].map((pillar, i) => (
                    <div key={i} className="fade-up bg-slate-gray p-8 rounded-4xl border border-white/5 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric-lavender/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 bg-midnight-blue rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                            {pillar.icon}
                        </div>
                        <h3 className="font-sora text-xl font-bold text-white mb-3">{pillar.title}</h3>
                        <p className="font-sora text-sm text-cool-mist/70 leading-relaxed">{pillar.desc}</p>
                    </div>
                ))}
            </div>

            {/* DATA FLOW ARCHITECTURE */}
            <div className="nodes-trigger mb-32 relative bg-midnight-blue border border-electric-lavender/10 rounded-5xl p-10 md:p-16">
                <div className="text-center mb-16">
                    <h2 className="font-sora text-3xl font-bold text-white mb-4 flex justify-center items-center gap-3">
                        <Server className="w-6 h-6 text-electric-lavender" />
                        Anonymization Data Pipeline
                    </h2>
                    <p className="font-mono text-xs text-cool-mist/50 uppercase tracking-widest">How insights reach the dashboard</p>
                </div>

                <div className="max-w-3xl mx-auto relative pl-8 border-l border-white/10 space-y-16">
                    {/* Node 1 */}
                    <div className="relative">
                        <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-midnight-blue bg-electric-lavender" />
                        <h3 className="font-sora text-lg font-bold text-white mb-2">1. Local Device Entry</h3>
                        <p className="font-sora text-sm text-cool-mist/60 leading-relaxed max-w-xl">
                            Student inputs emotional check-in. Natural Language Processing (NLP) occurs strictly locally to classify sentiment before leaving the device.
                        </p>
                    </div>

                    {/* Node 2 */}
                    <div className="relative">
                        <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-midnight-blue bg-electric-lavender/60" />
                        <h3 className="font-sora text-lg font-bold text-white mb-2">2. Identity Decoupling Layer</h3>
                        <p className="font-sora text-sm text-cool-mist/60 leading-relaxed max-w-xl mb-4">
                            Upon transmission, the payload is split. The user identifier is dropped. Only the emotional metadata timestamp is retained.
                        </p>
                        <div className="bg-[#1C1C1C] rounded-xl p-4 font-mono text-xs text-cool-mist/70 border border-white/5 inline-block">
                            <span className="text-red-400 line-through mr-2">{"{"} user_id: '8492' {"}"}</span>
                            <span className="text-electric-lavender">{"{"} stress_index: 0.8, tag: 'academic' {"}"}</span>
                        </div>
                    </div>

                    {/* Node 3 */}
                    <div className="relative">
                        <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-midnight-blue bg-electric-lavender/30" />
                        <h3 className="font-sora text-lg font-bold text-white mb-2">3. Institutional Aggregation</h3>
                        <p className="font-sora text-sm text-cool-mist/60 leading-relaxed max-w-xl">
                            Decoupled data packets are merged into a statistical pool, requiring a minimum threshold of cohort size (N &gt; 50) before rendering on the Campus Impact dashboard to prevent deductive identification.
                        </p>
                    </div>
                </div>
            </div>

            {/* COMMITMENT STATEMENT */}
            <div className="text-center max-w-3xl mx-auto border-t border-white/10 pt-16">
                <Fingerprint className="w-12 h-12 text-electric-lavender/40 mx-auto mb-6" />
                <h2 className="font-drama text-4xl text-white italic mb-6 leading-tight">
                    "Trust is not a marketing promise.<br /> It is an architectural requirement."
                </h2>
                <p className="font-mono text-xs text-cool-mist/60 uppercase tracking-widest text-electric-lavender text-center">
                    The AntaraShanti Protocol
                </p>
            </div>

        </div>
    );
}
