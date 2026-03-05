import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

export default function Escalations() {
    const mockLogs = [
        { id: 'ALT-9921', risk: 'High', status: 'Pending Review', time: '2 mins ago', identifier: 'Student-89A2' },
        { id: 'ALT-9920', risk: 'Medium', status: 'Routed to Counselor', time: '14 mins ago', identifier: 'Student-4B1C' },
        { id: 'ALT-9919', risk: 'High', status: 'Outreach Active', time: '1 hour ago', identifier: 'Student-7F3D' },
        { id: 'ALT-9918', risk: 'Medium', status: 'Resolved', time: '3 hours ago', identifier: 'Student-2E9A' },
    ];

    return (
        <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-sora font-semibold text-white">Stress Alerts</h1>
                    <p className="text-sm font-mono text-cool-mist/60 mt-1">Real-time student wellness alerts requiring immediate attention.</p>
                </div>
                <div className="px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 font-mono text-[10px] uppercase flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    2 Urgent Alerts
                </div>
            </div>

            <div className="bg-[#121214] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left font-mono text-sm text-cool-mist">
                    <thead className="bg-[#0A0A0C] border-b border-white/5 text-[10px] uppercase tracking-wider text-cool-mist/50">
                        <tr>
                            <th className="px-6 py-4">Alert ID</th>
                            <th className="px-6 py-4">Student Group / Identifier</th>
                            <th className="px-6 py-4">Stress Level</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {mockLogs.map((log, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer group">
                                <td className="px-6 py-4 text-white font-semibold">{log.id}</td>
                                <td className="px-6 py-4 font-mono text-xs opacity-50">{log.identifier}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] uppercase ${log.risk === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                                        {log.risk}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex items-center gap-2 text-xs">
                                    {log.status === 'Resolved' && <CheckCircle className="w-3 h-3 text-green-400" />}
                                    {log.status === 'Pending Review' && <AlertCircle className="w-3 h-3 text-red-400" />}
                                    {(log.status === 'Outreach Active' || log.status.includes('Routed')) && <Clock className="w-3 h-3 text-electric-lavender" />}
                                    {log.status}
                                </td>
                                <td className="px-6 py-4 text-right text-xs opacity-50">{log.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
