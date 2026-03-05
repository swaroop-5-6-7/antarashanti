import React from 'react';
import { Clock, Activity, Users, HeartPulse } from 'lucide-react';

export default function Compliance() {
    return (
        <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-sora font-semibold text-white">Weekly Trends</h1>
                    <p className="text-sm font-mono text-cool-mist/60 mt-1">Campus-wide well-being patterns and active support metrics.</p>
                </div>
                <div className="px-4 py-2 rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-[10px] uppercase flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Updated Today
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                    <h3 className="font-sora font-semibold text-white mb-6 flex items-center gap-2">
                        <HeartPulse className="w-4 h-4 text-electric-lavender" /> Support Activity
                    </h3>
                    <div className="space-y-4 font-mono text-xs">
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <span className="text-cool-mist/70">Active Counseling Sessions</span>
                            <span className="text-white text-sm font-sora font-semibold">42</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <span className="text-cool-mist/70">Workshop Attendance</span>
                            <span className="text-green-400">Steady</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <span className="text-cool-mist/70">Average Response Time</span>
                            <span className="text-electric-lavender">&lt; 2 Hours</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-cool-mist/70">Total Interventions</span>
                            <span className="text-green-400">Up 15%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                    <h3 className="font-sora font-semibold text-white mb-6 flex items-center gap-2">
                        <Users className="w-4 h-4 text-electric-lavender" /> Resource Utilization
                    </h3>
                    <div className="space-y-4 font-mono text-xs">
                        <div className="flex items-center gap-4">
                            <Activity className="w-4 h-4 text-cool-mist/30" />
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-cool-mist">Counseling Center Capacity</span>
                                    <span className="text-orange-400">85%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-400 w-[85%]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Activity className="w-4 h-4 text-cool-mist/30" />
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-cool-mist">Wellness Workshops</span>
                                    <span className="text-green-400">45%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-400 w-[45%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-[10px] text-cool-mist/50 border-t border-white/5 pt-4 uppercase tracking-widest">
                        Metrics are aggregated weekly to ensure accurate support allocation while maintaining student privacy.
                    </p>
                </div>
            </div>
        </div>
    );
}
