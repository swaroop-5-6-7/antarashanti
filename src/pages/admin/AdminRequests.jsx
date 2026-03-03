import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Shield, Check, X, Search, Building2, Mail, Clock, ShieldCheck, Loader2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export default function AdminRequests() {
    const { userRole } = useOutletContext();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUpdating, setIsUpdating] = useState(null); // track ID being updated

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('institution_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                // Ignore error if table doesn't exist yet visually, just set empty to fail gracefully.
                console.error('Error fetching requests:', error);
                setRequests([]);
            } else {
                setRequests(data || []);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        setIsUpdating(id);
        try {
            const { error } = await supabase
                .from('institution_requests')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
        } catch (err) {
            console.error(`Error updating request to ${newStatus}:`, err);
            alert(`Failed to update to ${newStatus}. See console.`);
        } finally {
            setIsUpdating(null);
        }
    };

    const filteredRequests = requests.filter(req =>
    (req.institution_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const pendingCount = requests.filter(r => r.status === 'pending').length;

    if (userRole !== 'System Administrator' && userRole !== 'Super Admin') {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <Shield className="w-16 h-16 text-electric-lavender/30 mb-4" />
                <h2 className="text-xl font-sora font-semibold text-white mb-2">Access Restricted</h2>
                <p className="text-cool-mist/60 font-mono text-sm max-w-sm">
                    Only System Administrators are authorized to approve new institutional requests.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-sora font-semibold text-white flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-electric-lavender" />
                        Access Requests
                    </h1>
                    <p className="text-sm font-mono text-cool-mist/60 mt-1">
                        Review and vet incoming institutional access requests.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-cool-mist/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#121214] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm font-mono text-white placeholder:text-cool-mist/40 focus:outline-none focus:border-electric-lavender/50 text-xs w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#121214] border border-white/5 rounded-xl p-5 border-l-2 border-l-yellow-500/50">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-2">Pending Review</p>
                    <span className="font-sora text-2xl font-bold text-white">{pendingCount}</span>
                </div>
                <div className="bg-[#121214] border border-white/5 rounded-xl p-5 border-l-2 border-l-green-500/50">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-2">Approved Institutions</p>
                    <span className="font-sora text-2xl font-bold text-white">{requests.filter(r => r.status === 'approved').length}</span>
                </div>
                <div className="bg-[#121214] border border-white/5 rounded-xl p-5 border-l-2 border-l-red-500/50">
                    <p className="font-mono text-[10px] uppercase text-cool-mist/50 mb-2">Rejected</p>
                    <span className="font-sora text-2xl font-bold text-white">{requests.filter(r => r.status === 'rejected').length}</span>
                </div>
            </div>

            <div className="bg-[#121214] border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-4 text-[10px] font-mono uppercase text-cool-mist/40 font-semibold tracking-wider">Institution</th>
                                <th className="p-4 text-[10px] font-mono uppercase text-cool-mist/40 font-semibold tracking-wider">Contact</th>
                                <th className="p-4 text-[10px] font-mono uppercase text-cool-mist/40 font-semibold tracking-wider">Requested On</th>
                                <th className="p-4 text-[10px] font-mono uppercase text-cool-mist/40 font-semibold tracking-wider">Status</th>
                                <th className="p-4 text-[10px] font-mono uppercase text-cool-mist/40 font-semibold tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-cool-mist/50">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 opacity-50" />
                                        <span className="font-mono text-xs uppercase tracking-widest">Fetching Array</span>
                                    </td>
                                </tr>
                            ) : filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center font-mono text-xs text-cool-mist/50 uppercase tracking-widest">
                                        No requests found.
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map(req => (
                                    <tr key={req.id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center flex-shrink-0">
                                                    <Building2 className="w-4 h-4 text-cool-mist/70" />
                                                </div>
                                                <span className="font-semibold text-white truncate max-w-[200px]">{req.institution_name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-cool-mist/70">
                                                <Mail className="w-3 h-3 opacity-50" />
                                                <span className="font-mono text-xs">{req.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-cool-mist/70">
                                                <Clock className="w-3 h-3 opacity-50" />
                                                <span className="font-mono text-xs">
                                                    {new Date(req.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border ${req.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                req.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            {req.status === 'pending' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleUpdateStatus(req.id, 'approved')}
                                                        disabled={isUpdating === req.id}
                                                        className="p-1.5 rounded-md hover:bg-green-500/20 text-green-500/70 hover:text-green-400 transition-colors disabled:opacity-50 border border-transparent hover:border-green-500/30"
                                                        title="Approve Validation"
                                                    >
                                                        {isUpdating === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(req.id, 'rejected')}
                                                        disabled={isUpdating === req.id}
                                                        className="p-1.5 rounded-md hover:bg-red-500/20 text-red-500/70 hover:text-red-400 transition-colors disabled:opacity-50 border border-transparent hover:border-red-500/30"
                                                        title="Reject Request"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-mono text-cool-mist/30 uppercase tracking-widest">Resolved</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
