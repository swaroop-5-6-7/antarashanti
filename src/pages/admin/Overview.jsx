import React from 'react';
import { Activity, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export default function Overview() {
    return (
        <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <div>
                <h1 className="text-2xl font-sora font-semibold text-white">Macro Overview</h1>
                <p className="text-sm font-mono text-cool-mist/60 mt-1">Campus-wide emotional intelligence metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">Active Sessions</p>
                    <div className="flex items-end gap-3">
                        <span className="font-sora text-3xl font-bold text-white">4,291</span>
                        <span className="flex items-center text-xs font-mono text-green-400 mb-1"><TrendingUp className="w-3 h-3 mr-1" /> +12%</span>
                    </div>
                </div>
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">Risk Escalations</p>
                    <div className="flex items-end gap-3">
                        <span className="font-sora text-3xl font-bold text-electric-lavender">24</span>
                        <span className="flex items-center text-xs font-mono text-red-400 mb-1"><TrendingUp className="w-3 h-3 mr-1" /> +3%</span>
                    </div>
                </div>
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">Intervention Rate</p>
                    <div className="flex items-end gap-3">
                        <span className="font-sora text-3xl font-bold text-white">89%</span>
                    </div>
                </div>
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">System Uptime</p>
                    <div className="flex items-end gap-3">
                        <span className="font-sora text-3xl font-bold text-white">99.9%</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#121214] border border-white/5 rounded-xl p-8 h-96 flex flex-col items-center justify-center">
                <Activity className="w-12 h-12 text-cool-mist/10 mb-4" />
                <p className="font-mono text-sm text-cool-mist/40">[ Live Heatmap Visualization Component ]</p>
                <p className="font-mono text-[10px] text-cool-mist/30 mt-2 text-center max-w-sm">Data normalized across all non-PII encrypted student nodes within the last 72 hours.</p>
            </div>
        </div>
    );
}
