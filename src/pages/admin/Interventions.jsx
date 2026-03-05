import React from 'react';
import { Activity, Beaker, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function Interventions() {
    return (
        <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <div>
                <h1 className="text-2xl font-sora font-semibold text-white">Counseling Requests</h1>
                <p className="text-sm font-mono text-cool-mist/60 mt-1">Active and recent student outreach and support requests.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Request Card 1 */}
                <div className="bg-[#121214] border border-electric-lavender/20 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-electric-lavender" />
                    <div className="flex justify-between items-start mb-4">
                        <HeartHandshake className="w-5 h-5 text-electric-lavender" />
                        <span className="px-2 py-1 rounded bg-electric-lavender/10 text-electric-lavender text-[10px] font-mono tracking-widest uppercase">Active Case</span>
                    </div>
                    <h3 className="font-sora font-semibold text-white mb-2">Student Check-In Follow-up</h3>
                    <p className="font-mono text-xs text-cool-mist/70 mb-6">Student indicated feeling overwhelmed for 3 consecutive days. Direct outreach initiated.</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cool-mist/50 pt-4 border-t border-white/5">
                        <span>Assigned To: Dr. Smith</span>
                        <span>Today, 9:00 AM</span>
                    </div>
                </div>

                {/* Request Card 2 */}
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
                    <div className="flex justify-between items-start mb-4">
                        <Activity className="w-5 h-5 text-orange-400" />
                        <span className="px-2 py-1 rounded bg-orange-400/10 text-orange-400 text-[10px] font-mono tracking-widest uppercase">Pending</span>
                    </div>
                    <h3 className="font-sora font-semibold text-white mb-2">Academic Anxiety Session</h3>
                    <p className="font-mono text-xs text-cool-mist/70 mb-6">Student requested an appointment through the Wellness Toolkit regarding Midterm stress.</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cool-mist/50 pt-4 border-t border-white/5">
                        <span>Scheduling...</span>
                        <span>Waiting</span>
                    </div>
                </div>

                {/* Request Card 3 */}
                <div className="bg-[#121214] border border-green-500/20 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                    <div className="flex justify-between items-start mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-mono tracking-widest uppercase">Completed</span>
                    </div>
                    <h3 className="font-sora font-semibold text-white mb-2">Roommate Conflict Mediation</h3>
                    <p className="font-mono text-xs text-cool-mist/70 mb-6">Resolved via mediated conversation with Residence Life and Counseling Center.</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cool-mist/50 pt-4 border-t border-white/5">
                        <span>Feedback: Positive</span>
                        <span>Resolved</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
