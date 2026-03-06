import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldCheck, XCircle, Clock, Search, AlertOctagon, User } from 'lucide-react';

export default function StudentApprovals() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data, error } = await supabase
                .from('student_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus, email) => {
        try {
            const { error: updateError } = await supabase
                .from('student_requests')
                .update({ status: newStatus })
                .eq('id', id);

            if (updateError) throw updateError;

            setRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
            );
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    if (loading) {
        return <div className="p-8 text-cool-mist font-mono text-sm">Loading student array...</div>;
    }

    return (
        <div className="p-8 space-y-8 animate-[fade-in_0.3s_ease-out]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-sora font-semibold text-white mb-2">Student Access Approvals</h1>
                    <p className="text-sm font-mono text-cool-mist/60 max-w-2xl">
                        Review pending student registrations. Approving a student provisions their application credentials securely.
                    </p>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg font-mono text-sm flex items-center gap-3">
                    <AlertOctagon className="w-5 h-5 flex-shrink-0" />
                    <span>Failed to retrieve the student registry schema: {error}</span>
                </div>
            )}

            <div className="bg-[#121214] border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm font-mono">
                        <thead className="bg-white/5 text-cool-mist border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Registered Email</th>
                                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Submission Date</th>
                                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Authorization Level</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-white/[0.02] text-white transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-cool-mist/70" />
                                            </div>
                                            <div className="text-electric-lavender">{req.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-cool-mist/50">
                                        {new Date(req.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {req.status === 'pending' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => updateStatus(req.id, 'approved', req.email)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded hover:bg-emerald-500/20 transition-colors text-xs uppercase tracking-wider"
                                                >
                                                    <ShieldCheck className="w-3.5 h-3.5" /> Approve
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(req.id, 'rejected', req.email)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 transition-colors text-xs uppercase tracking-wider"
                                                >
                                                    <XCircle className="w-3.5 h-3.5" /> Reject
                                                </button>
                                            </div>
                                        )}
                                        {req.status === 'approved' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-emerald-400/70 border border-emerald-500/10 bg-emerald-500/5 rounded text-xs uppercase tracking-wider">
                                                <ShieldCheck className="w-3 h-3" /> Provisioned
                                            </span>
                                        )}
                                        {req.status === 'rejected' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-red-400/70 border border-red-500/10 bg-red-500/5 rounded text-xs uppercase tracking-wider">
                                                <XCircle className="w-3 h-3" /> Denied
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {requests.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-cool-mist/50 text-sm">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Clock className="w-6 h-6 opacity-30" />
                                            <span>No student registrations have been logged yet.</span>
                                            <span className="text-xs">Incoming student accounts via the /student/register portal will populate here.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
