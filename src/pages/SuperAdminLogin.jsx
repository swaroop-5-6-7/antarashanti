import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SuperAdminLogin() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setStatus('loading');

        try {
            // STRICT SUPER ADMIN CHECK
            if (email.toLowerCase() !== '24100010106.uset@ltsu.ac.in') {
                setStatus('error');
                setErrorMsg("Access Denied: Unrecognized Super Admin credential.");
                return;
            }

            const { error: signInError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/super-admin/requests`,
                },
            });

            if (signInError) {
                setStatus('error');
                setErrorMsg(signInError.message);
                return;
            }

            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMsg("An unexpected connection error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sora selection:bg-electric-lavender selection:text-midnight-blue">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-electric-lavender blur-[150px] mix-blend-screen rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#0A0A0C] blur-[150px] mix-blend-multiply rounded-full" />
            </div>

            <div className="noise-overlay" />

            <div className="w-full max-w-md relative z-10 animate-[fade-in-up_0.6s_ease-out]">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flexitems-center justify-center flex shadow-[0_0_30px_rgba(139,125,255,0.15)] items-center">
                        <ShieldAlert className="w-8 h-8 text-electric-lavender" />
                    </div>
                </div>

                <div className="text-center mb-10 text-white">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Super Admin Portal</h1>
                    <p className="text-sm font-mono text-cool-mist/60 uppercase tracking-widest">Global Access Control</p>
                </div>

                <div className="bg-[#121214]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                    {/* Status UI */}
                    {status === 'success' ? (
                        <div className="text-center py-6 animate-[fade-in_0.4s_ease-out]">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                <CheckCircle2 className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Authentication Link Sent</h3>
                            <p className="text-sm text-cool-mist/80 mb-6 font-mono">
                                A secure magic link has been dispatched to <span className="text-white bg-white/10 px-1 py-0.5 rounded">{email}</span>.
                            </p>
                            <button onClick={() => setStatus('idle')} className="text-sm text-electric-lavender hover:text-white transition-colors font-mono">
                                Return to login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-6">
                            {errorMsg && (
                                <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono mb-4 flex items-start gap-2 animate-[shake_0.4s_ease-in-out]">
                                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-mono text-cool-mist/70 uppercase tracking-widest mb-2">
                                    Admin Node Email
                                </label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        required
                                        autoFocus
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@ltsu.ac.in"
                                        className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-4 py-3.5 text-white font-mono text-sm focus:outline-none focus:border-electric-lavender focus:ring-1 focus:ring-electric-lavender/50 transition-all placeholder:text-cool-mist/30"
                                        disabled={status === 'loading'}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-electric-lavender text-midnight-blue font-bold rounded-xl px-4 py-4 flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(139,125,255,0.2)] hover:shadow-[0_0_30px_rgba(139,125,255,0.4)] mt-4"
                            >
                                {status === 'loading' ? (
                                    <span className="font-mono text-sm tracking-widest uppercase flex items-center">
                                        Authenticating<span className="animate-[ellipsis_1.5s_infinite] inline-block w-4 text-left">...</span>
                                    </span>
                                ) : (
                                    <>
                                        Request Access Token <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <p className="font-mono text-[9px] text-cool-mist/30 mt-8 text-center uppercase tracking-widest">
                    Strict Gate: Unauthorized access attempts are monitored and IP-logged.
                </p>
            </div>
        </div>
    );
}
