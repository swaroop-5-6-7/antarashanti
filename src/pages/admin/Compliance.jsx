import React from 'react';
import { ShieldCheck, Lock, Database, Server } from 'lucide-react';

export default function Compliance() {
    return (
        <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-sora font-semibold text-white">Compliance & Audit</h1>
                    <p className="text-sm font-mono text-cool-mist/60 mt-1">Infrastructure security state and data handling logs.</p>
                </div>
                <div className="px-4 py-2 rounded-lg border border-green-500/20 bg-green-500/10 text-green-400 font-mono text-[10px] uppercase flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    System Secure
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                    <h3 className="font-sora font-semibold text-white mb-6 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-electric-lavender" /> Active Protocols
                    </h3>
                    <div className="space-y-4 font-mono text-xs">
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <span className="text-cool-mist/70">FERPA Obfuscation</span>
                            <span className="text-green-400">Active</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <span className="text-cool-mist/70">End-to-End Encryption</span>
                            <span className="text-green-400">AES-256 Active</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <span className="text-cool-mist/70">Data Retention Policy</span>
                            <span className="text-electric-lavender">30-Day Rolling</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-cool-mist/70">Row Level Security (DB)</span>
                            <span className="text-green-400">Enforced</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                    <h3 className="font-sora font-semibold text-white mb-6 flex items-center gap-2">
                        <Database className="w-4 h-4 text-electric-lavender" /> Anonymization Nodes
                    </h3>
                    <div className="space-y-4 font-mono text-xs">
                        <div className="flex items-center gap-4">
                            <Server className="w-4 h-4 text-cool-mist/30" />
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-cool-mist">Node Alpha-1</span>
                                    <span className="text-green-400">99.9%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-electric-lavender w-[99%]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Server className="w-4 h-4 text-cool-mist/30" />
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-cool-mist">Node Beta-2</span>
                                    <span className="text-green-400">100%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-electric-lavender w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-[10px] text-cool-mist/50 border-t border-white/5 pt-4">
                        All student PII is stripped at the edge before hitting the central database. Audit logs are Immutable.
                    </p>
                </div>
            </div>
        </div>
    );
}
