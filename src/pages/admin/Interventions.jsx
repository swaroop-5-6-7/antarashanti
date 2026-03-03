import React from 'react';
import { Activity, Beaker, CheckCircle2, Zap } from 'lucide-react';

export default function Interventions() {
    return (
        <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <div>
                <h1 className="text-2xl font-sora font-semibold text-white">Active Interventions</h1>
                <p className="text-sm font-mono text-cool-mist/60 mt-1">Automated cognitive regulation states currently deployed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Intervention Card 1 */}
                <div className="bg-[#121214] border border-electric-lavender/20 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-electric-lavender" />
                    <div className="flex justify-between items-start mb-4">
                        <Zap className="w-5 h-5 text-electric-lavender" />
                        <span className="px-2 py-1 rounded bg-electric-lavender/10 text-electric-lavender text-[10px] font-mono tracking-widest uppercase">Deployed</span>
                    </div>
                    <h3 className="font-sora font-semibold text-white mb-2">Grounding Protocol Alpha</h3>
                    <p className="font-mono text-xs text-cool-mist/70 mb-6">Triggered by velocity spikes in student check-ins. Deploys 5-4-3-2-1 semantic reset module.</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cool-mist/50 pt-4 border-t border-white/5">
                        <span>Success Rate: 84%</span>
                        <span>Active Nodes: 12</span>
                    </div>
                </div>

                {/* Intervention Card 2 */}
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cool-mist/20" />
                    <div className="flex justify-between items-start mb-4">
                        <Activity className="w-5 h-5 text-cool-mist/40" />
                        <span className="px-2 py-1 rounded bg-white/5 text-cool-mist/50 text-[10px] font-mono tracking-widest uppercase">Standby</span>
                    </div>
                    <h3 className="font-sora font-semibold text-white mb-2">Academic Anxiety Overlay</h3>
                    <p className="font-mono text-xs text-cool-mist/70 mb-6">Scheduled for deployment during Midterm window (March 15 - March 30).</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cool-mist/50 pt-4 border-t border-white/5">
                        <span>Success Rate: ~</span>
                        <span>Active Nodes: 0</span>
                    </div>
                </div>

                {/* Intervention Card 3 */}
                <div className="bg-[#1A1A1D] border border-green-500/20 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                    <div className="flex justify-between items-start mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-mono tracking-widest uppercase">Completed</span>
                    </div>
                    <h3 className="font-sora font-semibold text-white mb-2">Winter Break Transition</h3>
                    <p className="font-mono text-xs text-cool-mist/70 mb-6">Provided contextual coping tools for isolated students during low-occupancy campus periods.</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cool-mist/50 pt-4 border-t border-white/5">
                        <span>Success Rate: 91%</span>
                        <span>Resolved</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
