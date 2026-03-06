import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Loader2, Command, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (!supabase) {
            setError("System Error: Supabase connection is not configured.");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // Supabase returns a session if email confirmation is OFF, or null if it is ON
        if (data.session) {
            navigate('/dashboard');
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-midnight-blue flex flex-col justify-center items-center p-4">
            {/* Brand Header */}
            <div className="flex items-center gap-3 mb-12 animate-fade-in">
                <div className="w-12 h-12 bg-[#121214] border border-white/5 flex items-center justify-center rounded-xl overflow-hidden shadow-2xl relative">
                    <img src={logo} alt="Logo" className="w-full h-full object-cover scale-110" />
                    <div className="absolute inset-0 bg-electric-lavender/10 pointer-events-none" />
                </div>
                <div>
                    <h1 className="text-2xl font-sora font-bold text-cool-mist tracking-tight">AntaraShanti</h1>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50">Student Registration</p>
                </div>
            </div>

            {/* Register Card */}
            <div className="w-full max-w-md bg-[#121214] border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden">

                {/* Subtle glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-electric-lavender/5 blur-[100px] pointer-events-none" />

                <div className="mb-8 text-center relative z-10">
                    <h2 className="text-2xl font-sora font-semibold text-cool-mist mb-2">Create Account</h2>
                    <p className="text-white/80 text-sm">Join the AntaraShanti learning platform</p>
                </div>

                {success ? (
                    <div className="text-center space-y-4 animate-fade-in relative z-10">
                        <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-green-400 font-bold text-2xl">✓</span>
                        </div>
                        <h3 className="text-xl font-sora font-medium text-cool-mist">Registration Successful!</h3>
                        <p className="text-cool-mist/70 text-sm">Please check your email to verify your account before logging in.</p>
                        <Link to="/" className="inline-flex items-center gap-2 text-electric-lavender font-mono text-xs uppercase tracking-widest hover:text-white transition-colors mt-4">
                            Return to Login <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-cool-mist/50">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cool-mist/50" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#0A0A0C] border border-white/5 text-cool-mist placeholder:text-cool-mist/30 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-electric-lavender/50 focus:ring-1 focus:ring-electric-lavender/50 transition-all font-sora text-sm"
                                    placeholder="student@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-cool-mist/50">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cool-mist/50" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0A0A0C] border border-white/5 text-cool-mist placeholder:text-cool-mist/30 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-electric-lavender/50 focus:ring-1 focus:ring-electric-lavender/50 transition-all font-sora text-sm"
                                    placeholder="••••••••"
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-cool-mist/50">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cool-mist/50" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-[#0A0A0C] border border-white/5 text-cool-mist placeholder:text-cool-mist/30 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-electric-lavender/50 focus:ring-1 focus:ring-electric-lavender/50 transition-all font-sora text-sm"
                                    placeholder="••••••••"
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs p-3 rounded-lg flex items-start gap-2">
                                <span className="shrink-0 mt-0.5">!</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-electric-lavender text-midnight-blue font-sora font-semibold py-3 rounded-lg hover:bg-electric-lavender/90 transition-colors flex justify-center items-center gap-2 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Initialize Profile'
                            )}
                        </button>

                        <div className="text-center pt-2 border-t border-white/5 mt-6">
                            <p className="text-cool-mist/50 font-mono text-[10px] uppercase tracking-widest">
                                Already have an access node?
                            </p>
                            <Link to="/" className="text-electric-lavender hover:text-white font-sora text-sm transition-colors mt-2 inline-block">
                                Return to Auth Portal
                            </Link>
                        </div>
                    </form>
                )}
            </div>

            <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/30 flex items-center justify-center gap-2">
                    <span>SECURE UPLINK ESTABLISHED</span>
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                </p>
            </div>
        </div>
    );
}
