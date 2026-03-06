import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, TrendingUp, TrendingDown, Users, AlertTriangle, FileText, Download, Headset, ChevronRight, ShieldAlert, Sparkles, BrainCircuit, LineChart as ChartIcon, Lightbulb } from 'lucide-react';
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
    const navigate = useNavigate();

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
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-4">Campus Wellness Score</p>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-end justify-between w-full">
                            <span className="font-sora text-3xl font-bold text-green-400">74<span className="text-xl text-cool-mist/50">/100</span></span>
                            <TrendingUp className="w-5 h-5 text-green-400/80" />
                        </div>
                        <p className="font-mono text-[9px] text-green-400/60 uppercase tracking-wider">↑ Up from 71 last week</p>
                    </div>
                </div>
            </div>

            {/* AI Insights Section (NEW) */}
            <div className="bg-[#121214] border border-white/5 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-lavender/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-electric-lavender/10 flex items-center justify-center border border-electric-lavender/20 shadow-[0_0_15px_rgba(139,125,255,0.15)]">
                        <Sparkles className="w-4 h-4 text-electric-lavender" />
                    </div>
                    <div>
                        <h2 className="text-lg font-sora font-semibold text-white">AI Insights</h2>
                        <p className="text-xs font-mono text-cool-mist/50 mt-1">Algorithmic pattern detection across campus metrics.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    {/* Insight Card */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center gap-2 mb-3">
                            <BrainCircuit className="w-4 h-4 text-electric-lavender/70" />
                            <h3 className="font-sora text-sm font-medium text-white">AI Insight</h3>
                        </div>
                        <p className="font-mono text-xs text-cool-mist leading-relaxed mb-3">
                            Stress levels increased by <span className="text-red-400">18%</span> in engineering departments during the last 5 days.
                        </p>
                        <p className="font-mono text-[10px] text-cool-mist/50 italic border-l-2 border-white/10 pl-2">
                            This pattern historically appears 1–2 weeks before midterms.
                        </p>
                    </div>

                    {/* Forecast Card */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center gap-2 mb-3">
                            <ChartIcon className="w-4 h-4 text-yellow-500/70" />
                            <h3 className="font-sora text-sm font-medium text-white">AI Risk Forecast</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-mono">
                                <span className="text-cool-mist/70">Predicted Event:</span>
                                <span className="text-yellow-400 font-semibold">Stress Spike Next Week</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono">
                                <span className="text-cool-mist/70">Confidence:</span>
                                <span className="text-white">82%</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono border-t border-white/5 pt-2 mt-2">
                                <span className="text-cool-mist/70">Primary Driver:</span>
                                <span className="text-cool-mist">Midterm Exams</span>
                            </div>
                        </div>
                    </div>

                    {/* Suggestion Card */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-green-400/70" />
                            <h3 className="font-sora text-sm font-medium text-white">AI Suggested Action</h3>
                        </div>
                        <p className="font-mono text-xs text-cool-mist mb-4">
                            Proactive intervention recommended to mitigate forecasted spike.
                        </p>
                        <ul className="space-y-2 font-mono text-[11px] text-cool-mist/80">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-0.5">•</span>
                                <span>Increase counseling slot availability.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-0.5">•</span>
                                <span>Send campus-wide wellness resource reminder.</span>
                            </li>
                        </ul>
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
                        <button onClick={() => navigate('/admin/escalations')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 flex items-center justify-center">
                                    <ShieldAlert className="w-4 h-4" />
                                </div>
                                <span className="font-sora text-sm font-medium text-cool-mist group-hover:text-white transition-colors">View Escalation Cases</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-cool-mist/30 group-hover:text-white transition-colors" />
                        </button>

                        <button onClick={() => navigate('/admin/interventions')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-electric-lavender/10 text-electric-lavender flex items-center justify-center">
                                    <Headset className="w-4 h-4" />
                                </div>
                                <span className="font-sora text-sm font-medium text-cool-mist group-hover:text-white transition-colors">Open Counseling Requests</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-cool-mist/30 group-hover:text-white transition-colors" />
                        </button>

                        <button onClick={() => alert('Generating Weekly Report... A secure copy has been dispatched to your institutional email.')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-green-400/10 text-green-400 flex items-center justify-center">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <span className="font-sora text-sm font-medium text-cool-mist group-hover:text-white transition-colors">View Weekly Report</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-cool-mist/30 group-hover:text-white transition-colors" />
                        </button>

                        <button onClick={() => window.open('/campus-readiness-brief.pdf', '_blank')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
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
