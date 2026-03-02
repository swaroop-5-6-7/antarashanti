import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Download, Quote, TrendingDown, Clock, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Resources() {
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

        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="pt-32 pb-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto overflow-hidden">

            {/* HEADER */}
            <div className="mb-24 text-center max-w-4xl mx-auto relative">
                <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Clinical <span className="text-electric-lavender italic font-drama pr-2">Authority</span>
                </h1>
                <p className="font-sora text-lg text-cool-mist/80 leading-relaxed max-w-3xl mx-auto">
                    Built on evidence, not intuition. Explore the peer-reviewed frameworks underpinning the AntaraShanti intelligence engine.
                </p>
            </div>

            {/* MACRO STATS (The Problem) */}
            <div className="fade-up-trigger grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                <div className="fade-up bg-slate-gray p-8 rounded-4xl border border-white/5 flex flex-col items-center text-center">
                    <TrendingDown className="w-8 h-8 text-red-400 mb-4" />
                    <h3 className="font-sora text-4xl font-bold text-white mb-2">60%</h3>
                    <p className="font-sora text-sm text-cool-mist/70">of traditional college students report experiencing overwhelming anxiety.</p>
                    <span className="mt-4 font-mono text-[10px] text-cool-mist/40 uppercase">Healthy Minds Study, 2023</span>
                </div>
                <div className="fade-up bg-slate-gray p-8 rounded-4xl border border-white/5 flex flex-col items-center text-center">
                    <Clock className="w-8 h-8 text-yellow-400 mb-4" />
                    <h3 className="font-sora text-4xl font-bold text-white mb-2">3.4 Wks</h3>
                    <p className="font-sora text-sm text-cool-mist/70">average wait time for an initial intake appointment at campus CAPS.</p>
                    <span className="mt-4 font-mono text-[10px] text-cool-mist/40 uppercase">AUCCCD Director Survey</span>
                </div>
                <div className="fade-up bg-slate-gray p-8 rounded-4xl border border-electric-lavender/30 flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_30px_rgba(139,125,255,0.1)]">
                    <div className="absolute inset-0 bg-electric-lavender/5 pointer-events-none" />
                    <Activity className="w-8 h-8 text-electric-lavender mb-4" />
                    <h3 className="font-sora text-4xl font-bold text-electric-lavender mb-2">&lt; 2 Min</h3>
                    <p className="font-sora text-sm text-cool-mist/80">for AntaraShanti to deploy a clinically-backed cognitive reframing module.</p>
                    <span className="mt-4 font-mono text-[10px] text-electric-lavender/50 uppercase">System Benchmark</span>
                </div>
            </div>

            {/* RESEARCH REFERENCES GRID */}
            <div className="mb-32">
                <h2 className="font-sora text-3xl font-bold text-white mb-10 flex items-center gap-3">
                    <Quote className="w-6 h-6 text-electric-lavender" />
                    Core Methodologies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { tag: 'Clinical Psychology', title: 'Cognitive Behavioral Reframing (CBT)', desc: 'The AI Check-in engine utilizes CBT techniques to identify cognitive distortions (e.g., "catastrophizing") in real-time user inputs, prompting the user to reframe the thought before logging it.', source: 'Beck, A. T. (1979). Cognitive Therapy of Depression.' },
                        { tag: 'Behavioral Science', title: 'Frictionless Micro-Interventions', desc: 'Sustained engagement requires removing all UI friction. Grounding protocols activate in one tap, bypassing the "decision fatigue" severely anxious students experience.', source: 'Fogg, B. J. (2009). A Behavior Model for Persuasive Design.' },
                        { tag: 'Neuroscience', title: 'Bilateral Audio Stimulation', desc: 'Integrated into the "Panic" escalation level, alternating audio tones assist in decreasing autonomic arousal by mimicking REM sleep processing.', source: 'Shapiro, F. (1989). Efficacy of the EMDR method.' },
                        { tag: 'Data Architecture', title: 'Distributed Differential Privacy', desc: 'Macro-aggregation algorithms inject mathematical noise into the dataset, guaranteeing that administrators can observe trends without ever isolating an individual identity.', source: 'Dwork, C. (2008). Differential Privacy: A Survey of Results.' }
                    ].map((ref, i) => (
                        <div key={i} className="bg-midnight-blue p-8 rounded-3xl border border-white/5 relative group hover:border-white/10 transition-colors">
                            <span className="inline-block px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-electric-lavender mb-4 border border-white/10 uppercase tracking-widest">{ref.tag}</span>
                            <h3 className="font-sora text-lg font-bold text-white mb-3">{ref.title}</h3>
                            <p className="font-sora text-sm text-cool-mist/70 leading-relaxed mb-6">{ref.desc}</p>
                            <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-cool-mist/40">
                                Ref: {ref.source}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WHITEPAPER DOWNLOAD */}
            <div className="bg-surface relative rounded-5xl border border-electric-lavender/20 p-10 md:p-16 text-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(139,125,255,0.05)_0,transparent_60%)] pointer-events-none" />

                <FileText className="w-16 h-16 text-electric-lavender mx-auto mb-6" />
                <h2 className="font-sora text-3xl font-bold text-white mb-4 relative z-10">The ROI of Emotional Infrastructure</h2>
                <p className="font-sora text-cool-mist/80 max-w-2xl mx-auto mb-10 relative z-10">
                    A comprehensive 40-page technical whitepaper detailing how universities bridge the retention gap by deploying deterministic, AI-driven well-being engines. Includes our FERPA compliance abstract.
                </p>

                <a
                    href="/executive-summary-roi.pdf"
                    download="AntaraShanti_Executive_Summary_ROI.pdf"
                    className="magnetic-button relative z-10 bg-electric-lavender text-midnight-blue px-8 py-4 rounded-full font-sora font-semibold text-base inline-flex items-center gap-3 transition-transform shadow-[0_0_20px_rgba(139,125,255,0.3)] hover:shadow-[0_0_40px_rgba(139,125,255,0.5)]"
                >
                    <Download className="w-5 h-5" /> Download Executive Summary (PDF)
                </a>
            </div>

        </div>
    );
}
