import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles, Binary, HeartHandshake, EyeOff, LayoutTemplate } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const comp = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
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

            // Values stagger
            gsap.from('.value-card', {
                scrollTrigger: {
                    trigger: '.values-trigger',
                    start: 'top 75%',
                },
                y: 30,
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });

        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="pt-32 pb-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto overflow-hidden">

            {/* HEADER & NARRATIVE */}
            <div className="mb-32 max-w-4xl mx-auto text-center fade-up-trigger relative">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-electric-lavender/10 blur-[100px] rounded-full pointer-events-none" />

                <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-10 tracking-tight leading-tight relative z-10">
                    The Institutional <br className="hidden md:block" />
                    <span className="text-electric-lavender italic font-drama pr-2">Gap</span>
                </h1>

                <div className="text-left space-y-6 relative z-10 border-l-2 border-electric-lavender/30 pl-6 md:pl-10">
                    <p className="font-sora text-lg text-cool-mist/90 leading-relaxed fade-up">
                        Modern campuses possess state-of-the-art libraries, recreational centers, and athletic complexes. Yet, the <strong>emotional infrastructure</strong> relies on backlogged counseling centers and generic pastel apps that students ignore.
                    </p>
                    <p className="font-sora text-lg text-cool-mist/90 leading-relaxed fade-up">
                        AntaraShanti was not built to be a "mental health app." It was built to serve as the invisible, proactive digital backbone for campus well-being—deploying instant psychological support to students while providing secure, macro-visibility to administrators.
                    </p>
                    <p className="font-sora text-lg text-electric-lavender/80 font-semibold leading-relaxed fade-up">
                        We are replacing the reactive crisis model with real-time emotional intelligence.
                    </p>
                </div>
            </div>

            {/* CORE PRINCIPLES */}
            <div className="values-trigger mb-32 relative">
                <h2 className="font-sora text-3xl font-bold text-white mb-12 text-center">Architectural Principles</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { tag: '01', icon: <EyeOff className="w-5 h-5 text-white" />, title: 'Privacy First', desc: 'Identities are abstract. Journals are encrypted. We treat emotional data with financial-grade secure architecture.' },
                        { tag: '02', icon: <Sparkles className="w-5 h-5 text-white" />, title: 'Proactive, Not Reactive', desc: 'Waiting for a student to schedule an appointment is too late. We intercept behavioral velocity instantly.' },
                        { tag: '03', icon: <LayoutTemplate className="w-5 h-5 text-white" />, title: 'Institutional Intelligence', desc: 'We do not sell data downstream. We aggregate it strictly to help universities allocate resources effectively.' },
                        { tag: '04', icon: <HeartHandshake className="w-5 h-5 text-white" />, title: 'Human-Centered AI', desc: 'AI is used for triage, reframing, and pattern matching. It does not replace human empathy—it bridges the gap to it.' }
                    ].map((principle, i) => (
                        <div key={i} className="value-card bg-midnight-blue/50 p-8 rounded-4xl border border-white/5 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-electric-lavender/10 transition-colors" />
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-mono text-sm text-electric-lavender font-bold">{principle.tag}</span>
                                <div className="w-10 h-10 rounded-full bg-slate-gray flex items-center justify-center border border-white/10">
                                    {principle.icon}
                                </div>
                            </div>
                            <h3 className="font-sora text-xl font-bold text-white mb-3">{principle.title}</h3>
                            <p className="font-sora text-sm text-cool-mist/70 leading-relaxed">{principle.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* THE 5-YEAR ROADMAP */}
            <div className="mt-32 max-w-4xl mx-auto border-t border-white/10 pt-16">
                <div className="text-center mb-16">
                    <h2 className="font-sora text-3xl font-bold text-white mb-4">The 5-Year Vision</h2>
                    <p className="font-mono text-xs text-cool-mist/50 uppercase tracking-widest">Roadmap to ubiquity</p>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-electric-lavender/30 before:to-transparent">

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-electric-lavender bg-midnight-blue text-electric-lavender shadow-[0_0_15px_rgba(139,125,255,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <Binary className="w-4 h-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-gray p-6 rounded-3xl border border-electric-lavender/30">
                            <span className="font-mono text-xs text-electric-lavender mb-2 block">Phase I - Current</span>
                            <h4 className="font-sora font-semibold text-white mb-2">Campus Adoption & AI Validation</h4>
                            <p className="font-sora text-sm text-cool-mist/70">Refining our CBT-based reasoning engines alongside 10 pioneer university partners.</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-midnight-blue text-white/50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <Shield className="w-4 h-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#1C1C1C]/50 p-6 rounded-3xl border border-white/5">
                            <span className="font-mono text-xs text-cool-mist/50 mb-2 block">Phase II - 24 Months</span>
                            <h4 className="font-sora font-semibold text-cool-mist/80 mb-2">Clinical Provider Integration</h4>
                            <p className="font-sora text-sm text-cool-mist/60">Secure API handoffs extending from our intervention engine directly into regional medical charts.</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-midnight-blue text-white/50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#1C1C1C]/50 p-6 rounded-3xl border border-white/5">
                            <span className="font-mono text-xs text-cool-mist/50 mb-2 block">Phase III - 60 Months</span>
                            <h4 className="font-sora font-semibold text-cool-mist/80 mb-2">Universal Standard</h4>
                            <p className="font-sora text-sm text-cool-mist/60">Becoming the unquestionable digital baseline for student well-being infrastructure globally.</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
