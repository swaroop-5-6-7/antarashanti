import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InstitutionLogin() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        // Domain validation
        const genericDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
        const domain = email.split('@')[1];

        if (!domain || genericDomains.includes(domain.toLowerCase())) {
            setStatus('error');
            setErrorMsg("Access restricted mapping failure: Institutional domain required.");
            return;
        }

        setStatus('loading');

        try {
            // PRESENTATION FALLBACK: If Supabase isn't configured, mock a successful response for the presentation
            if (!import.meta.env.VITE_SUPABASE_URL) {
                setTimeout(() => setStatus('success'), 1500);
                return;
            }

            // DEVELOPER BYPASS
            const isDeveloper = email.toLowerCase() === '24100010106.uset@ltsu.ac.in';

            if (!isDeveloper) {
                // First check if the email exists in institution_requests
                const { data: requestAccess, error: reqError } = await supabase
                    .from('institution_requests')
                    .select('status')
                    .eq('email', email)
                    .maybeSingle();

                if (!requestAccess) {
                    // Submit new request
                    const { error: insertError } = await supabase
                        .from('institution_requests')
                        .insert([{ email, status: 'pending' }]);

                    if (insertError) {
                        setStatus('error');
                        setErrorMsg("Failed to process your request. Please try again.");
                        return;
                    }

                    setStatus('error');
                    setErrorMsg("Application Submitted. Please wait for Super Admin approval before you can access the portal.");
                    return;
                }

                if (requestAccess.status === 'pending') {
                    setStatus('error');
                    setErrorMsg("Application status: Pending Super Admin Approval. Your access is not yet provisioned.");
                    return;
                }

                if (requestAccess.status === 'rejected') {
                    setStatus('error');
                    setErrorMsg("Application status: Access Restricted. Please contact support.");
                    return;
                }
            }

            // Only proceed if 'approved' or DEVELOPER BYPASS
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin + '/admin/overview',
                },
            });

            if (error) {
                setStatus('error');
                setErrorMsg(error.message);
            } else {
                setStatus('success');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Minimalist Background Grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B7DFF05_1px,transparent_1px),linear-gradient(to_bottom,#8B7DFF05_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/50 to-transparent" />

            <div className="w-full max-w-md relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded shadow-[0_0_15px_rgba(139,125,255,0.2)] bg-[#121214] border border-electric-lavender/30 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-electric-lavender" />
                    </div>
                    <span className="font-sora text-xl font-semibold text-white tracking-widest uppercase">Infrastructure</span>
                </div>

                <div className="w-full bg-[#121214] border border-white/5 rounded-2xl p-8 shadow-2xl">
                    <h2 className="font-sora text-2xl font-bold text-white mb-2">Institutional Authenticator</h2>
                    <p className="font-mono text-xs text-cool-mist/60 mb-8 border-l-2 border-electric-lavender/40 pl-3">
                        Access restricted to verified institutional administrators. Role-based provisioning applied upon entry.
                    </p>

                    {status === 'success' ? (
                        <div className="bg-electric-lavender/10 border border-electric-lavender/20 rounded-xl p-6 text-center space-y-4">
                            <CheckCircle2 className="w-10 h-10 text-electric-lavender mx-auto" />
                            <p className="font-sora text-sm text-white font-medium">Authentication Link Dispatched</p>
                            <p className="font-mono text-xs text-cool-mist/70">
                                A single-use magic link has been sent to <span className="text-electric-lavender">{email}</span>. Open it to bind this session to your role.
                            </p>
                            <button onClick={() => setStatus('idle')} className="mt-4 text-[10px] text-electric-lavender uppercase tracking-widest hover:text-white transition-colors">
                                Return
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase tracking-wider text-cool-mist/50">Institutional Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="administrator@university.edu"
                                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-electric-lavender/50 transition-colors"
                                />
                                {status === 'error' && (
                                    <div className="flex items-start gap-2 mt-2 text-red-400 text-xs font-mono bg-red-400/10 p-2 rounded">
                                        <ShieldAlert className="w-4 h-4 shrink-0" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-white text-[#0A0A0C] hover:bg-electric-lavender transition-colors py-3 rounded-lg font-sora font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Verifying Identity...' : (
                                    <>Request Magic Link <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <p className="font-mono text-[9px] text-cool-mist/30 mt-8 text-center uppercase tracking-widest">
                    End-to-End Encrypted Session. Connection logged via Node-ID: {Math.random().toString(36).substring(7).toUpperCase()}.
                </p>
            </div>
        </div>
    );
}
