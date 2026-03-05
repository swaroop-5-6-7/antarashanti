import React from 'react';
import { Activity, TrendingUp, TrendingDown, Users, AlertTriangle, FileText, Download, Headset, ChevronRight, ShieldAlert } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the Stress Trend chart
const stressData = [
    { day: 'Mon', stress: 45 },
    { day: 'Tue', stress: 52 },
    { day: 'Wed', stress: 48 },
    { day: 'Thu', stress: 70 },
    { day: 'Fri', stress: 65 },
    { day: 'Sat', stress: 40 },
    { day: 'Sun', stress: 35 },
];

export default function Overview() {
    return (
        <div className="space-y-6 animate-[fade-in_0.3s_ease-out] pb-12">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-sora font-semibold text-white">Campus Well-Being Overview</h1>
                <p className="text-sm font-mono text-cool-mist/60 mt-1">Daily snapshot of student wellness and active support cases.</p>
            </div>

            {/* 1. Top Section – Campus Well-Being Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">Students Checked In</p>
                    <div className="flex items-end justify-between">
                        <span className="font-sora text-3xl font-bold text-white">4,291</span>
                        <Users className="w-5 h-5 text-cool-mist/20 group-hover:text-electric-lavender/50 transition-colors" />
                    </div>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-yellow-500/30 transition-colors border-l-2 border-l-yellow-500/50">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">Students Needing Support</p>
                    <div className="flex items-end justify-between">
                        <span className="font-sora text-3xl font-bold text-yellow-400">37</span>
                        <AlertTriangle className="w-5 h-5 text-yellow-500/20 group-hover:text-yellow-500/50 transition-colors" />
                    </div>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-red-500/30 transition-colors border-l-2 border-l-red-500/50">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">Active Support Cases</p>
                    <div className="flex items-end justify-between">
                        <span className="font-sora text-3xl font-bold text-red-400">12</span>
                        <Headset className="w-5 h-5 text-red-500/20 group-hover:text-red-500/50 transition-colors" />
                    </div>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-colors border-l-2 border-l-green-500/50">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">Well-Being Trend</p>
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-sora text-xl font-bold text-green-400">Improving</span>
                        </div>
                        <TrendingDown className="w-5 h-5 text-green-400/80" />
                    </div>
                </div>
            </div>

            {/* 2. Main Visualization – Stress Trend */}
            <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-sora font-semibold text-white">Student Stress Trend (Last 7 Days)</h2>
                    <p className="text-xs font-mono text-cool-mist/50 mt-1">Shows emotional stress patterns across campus to help detect high-pressure periods.</p>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2C2F3A" vertical={false} />
                            <XAxis
                                dataKey="day"
                                stroke="#94A3B8"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                fontFamily="JetBrains Mono"
                            />
                            <YAxis
                                stroke="#94A3B8"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                fontFamily="JetBrains Mono"
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0F0F12', borderColor: '#2C2F3A', borderRadius: '8px' }}
                                itemStyle={{ color: '#8B7DFF', fontFamily: 'Sora', fontSize: '14px', fontWeight: 'bold' }}
                                labelStyle={{ color: '#94A3B8', fontFamily: 'JetBrains Mono', fontSize: '10px', textTransform: 'uppercase' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="stress"
                                stroke="#8B7DFF"
                                strokeWidth={3}
                                dot={{ fill: '#0A0A0C', stroke: '#8B7DFF', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#8B7DFF' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Grid: Alerts & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* 3. Alert Panel – Immediate Actions */}
                <div className="lg:col-span-3 bg-[#121214] border border-white/5 rounded-xl flex flex-col">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-sora font-semibold text-white flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-red-400" />
                                Students Needing Attention
                            </h2>
                            <p className="text-xs font-mono text-cool-mist/50 mt-1">Live escalation radar requiring administrative review.</p>
                        </div>
                        <button className="text-xs font-sora font-semibold bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors">
                            View Cases
                        </button>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-center space-y-4">
                        <div className="flex items-center gap-4 bg-red-500/5 border border-red-500/10 rounded-lg p-4">
                            <div className="w-8 h-8 rounded-full bg-red-400/10 flex items-center justify-center shrink-0">
                                <Activity className="w-4 h-4 text-red-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white font-sora">5 students flagged for high stress</p>
                                <p className="text-xs font-mono text-cool-mist/60 mt-0.5">Automated detection via daily check-ins.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-4">
                            <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                                <Users className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white font-sora">2 students requested counselor contact</p>
                                <p className="text-xs font-mono text-cool-mist/60 mt-0.5">Direct outreach from the Wellness Toolkit.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-orange-500/5 border border-orange-500/10 rounded-lg p-4">
                            <div className="w-8 h-8 rounded-full bg-orange-400/10 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-4 h-4 text-orange-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white font-sora">1 escalation triggered</p>
                                <p className="text-xs font-mono text-cool-mist/60 mt-0.5">Critical language detected in anonymous community.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Quick Actions Panel */}
                <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-xl p-6">
                    <h2 className="text-lg font-sora font-semibold text-white mb-1">Quick Actions</h2>
                    <p className="text-xs font-mono text-cool-mist/50 mb-6">What would you like to do?</p>

                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 flex items-center justify-center">
                                    <ShieldAlert className="w-4 h-4" />
                                </div>
                                <span className="font-sora text-sm font-medium text-cool-mist group-hover:text-white transition-colors">View Escalation Cases</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-cool-mist/30 group-hover:text-white transition-colors" />
                        </button>

                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-electric-lavender/10 text-electric-lavender flex items-center justify-center">
                                    <Headset className="w-4 h-4" />
                                </div>
                                <span className="font-sora text-sm font-medium text-cool-mist group-hover:text-white transition-colors">Open Counseling Requests</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-cool-mist/30 group-hover:text-white transition-colors" />
                        </button>

                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-green-400/10 text-green-400 flex items-center justify-center">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <span className="font-sora text-sm font-medium text-cool-mist group-hover:text-white transition-colors">View Weekly Report</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-cool-mist/30 group-hover:text-white transition-colors" />
                        </button>

                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center">
                                    <Download className="w-4 h-4" />
                                </div>
                                <span className="font-sora text-sm font-medium text-cool-mist group-hover:text-white transition-colors">Download Well-Being Summary</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-cool-mist/30 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
