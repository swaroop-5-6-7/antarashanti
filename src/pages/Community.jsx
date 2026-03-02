import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, ShieldCheck, UserX, Heart, Bot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Community() {
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

            // Mock posts staggering
            gsap.from('.mock-post', {
                scrollTrigger: {
                    trigger: '.posts-trigger',
                    start: 'top 75%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });

        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="pt-32 pb-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto overflow-hidden">

            {/* HEADER */}
            <div className="mb-24 text-center max-w-4xl mx-auto">
                <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                    The Safe <span className="text-electric-lavender italic font-drama pr-2">Circle</span>
                </h1>
                <p className="font-sora text-lg text-cool-mist/80 leading-relaxed max-w-2xl mx-auto">
                    Human empathy scaled securely. An anonymous peer moderation network protected by
                    AI toxic-language filtering and human oversight. No cringe motivational quotes—just real student tone.
                </p>
            </div>

            {/* PHILOSOPHY & MODERATION LAYER */}
            <div className="fade-up-trigger grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                {[
                    { icon: <UserX className="w-5 h-5 text-electric-lavender" />, title: 'Absolute Anonymity', desc: 'No profiles. No handles. No following metrics. Just raw, honest peer support.' },
                    { icon: <Bot className="w-5 h-5 text-electric-lavender" />, title: 'Hybrid Moderation', desc: 'NLP logic catches bullying before it posts. Human moderators review escalated ambiguous cases.' },
                    { icon: <Heart className="w-5 h-5 text-electric-lavender" />, title: 'Empathy Loops', desc: 'Users can "Resonate" with posts, sending subtle haptic feedback to the original author.' }
                ].map((item, i) => (
                    <div key={i} className="fade-up bg-[#1C1C1C]/50 p-8 rounded-4xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-electric-lavender/10 flex items-center justify-center mb-6">
                            {item.icon}
                        </div>
                        <h3 className="font-sora font-bold text-white mb-3">{item.title}</h3>
                        <p className="font-sora text-sm text-cool-mist/70 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* MOCK UI TONE PREVIEWS */}
            <div className="posts-trigger relative max-w-4xl mx-auto">
                <h2 className="font-sora text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                    <MessageSquare className="w-6 h-6 text-electric-lavender" />
                    The Feed (Mock Environment)
                </h2>

                <div className="space-y-6">

                    {/* Post 1 */}
                    <div className="mock-post bg-slate-gray p-6 rounded-3xl border border-white/5 relative group">
                        <div className="flex items-start justify-between mb-2">
                            <span className="font-mono text-[10px] text-cool-mist/40 bg-white/5 px-2 py-1 rounded">2 hrs ago • Academic</span>
                            <ShieldCheck className="w-4 h-4 text-green-400 opacity-50" />
                        </div>
                        <p className="font-sora text-cool-mist/90 leading-relaxed mb-4">
                            I literally stared at a blank Google Doc for 3 hours today. Midterms are next week and I feel entirely paralyzed. Everyone else looks like they have it together.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-xs font-mono text-cool-mist/50 hover:text-electric-lavender transition-colors">
                                <Heart className="w-4 h-4" /> Resonate (42)
                            </button>
                        </div>
                    </div>

                    {/* Post 2 */}
                    <div className="mock-post bg-slate-gray p-6 rounded-3xl border border-white/5 relative group ml-12">
                        <div className="flex items-start justify-between mb-2">
                            <span className="font-mono text-[10px] text-electric-lavender bg-electric-lavender/10 border border-electric-lavender/20 px-2 py-1 rounded flex items-center gap-1">
                                <Bot className="w-3 h-3" /> System Reframe
                            </span>
                        </div>
                        <p className="font-sora text-cool-mist/80 text-sm leading-relaxed mb-4">
                            It’s called <strong>executive dysfunction</strong>, and it’s a standard biological reaction to perceived high-stakes overwhelming tasks. You aren't lazy; your brain is just viewing the essay as a threat. Try the "5-Minute Burst" protocol in your toolkit.
                        </p>
                    </div>

                    {/* Post 3 */}
                    <div className="mock-post bg-slate-gray p-6 rounded-3xl border border-white/5 relative group">
                        <div className="flex items-start justify-between mb-2">
                            <span className="font-mono text-[10px] text-cool-mist/40 bg-white/5 px-2 py-1 rounded">5 hrs ago • Social</span>
                            <ShieldCheck className="w-4 h-4 text-green-400 opacity-50" />
                        </div>
                        <p className="font-sora text-cool-mist/90 leading-relaxed mb-4">
                            It’s so weird being surrounded by 20,000 people on campus but feeling completely isolated. Eating alone in the dining hall feels like a spotlight is on me.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-xs font-mono text-electric-lavender/80 transition-colors">
                                <Heart className="w-4 h-4 fill-electric-lavender stroke-none" /> Resonate (115)
                            </button>
                            <button className="flex items-center gap-2 text-xs font-mono text-cool-mist/50 hover:text-white transition-colors">
                                <MessageSquare className="w-4 h-4" /> Reply (12)
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
