import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shield, ShieldAlert, LogOut, Loader2 } from 'lucide-react';

export default function SuperAdminLayout() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center"><Loader2 className="w-8 h-8 text-electric-lavender animate-spin" /></div>;
    }

    if (!session) {
        return <Navigate to="/super-admin-login" replace />;
    }

    // STRICT CHECK: Only Super Admin email can access this layout
    const isSuperAdmin = session?.user?.email?.toLowerCase() === '24100010106.uset@ltsu.ac.in';

    if (!isSuperAdmin) {
        // Kick them back to standard login or home if they somehow got here
        return <Navigate to="/" replace />;
    }

    const NAV_ITEMS = [
        { path: '/super-admin/requests', label: 'Access Requests', icon: <Shield className="w-4 h-4" /> }
    ];

    return (
        <div className="min-h-screen border-t-4 border-electric-lavender bg-[#0A0A0C] text-cool-mist font-sora flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#0F0F12] flex flex-col pt-2">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-electric-lavender/10 border border-electric-lavender/30 flex items-center justify-center">
                        <ShieldAlert className="w-4 h-4 text-electric-lavender" />
                    </div>
                    <div>
                        <h2 className="font-bold text-white tracking-wide text-sm leading-none">Super Admin</h2>
                        <span className="text-[10px] font-mono text-electric-lavender uppercase tracking-widest mt-1 block">Approval Portal</span>
                    </div>
                </div>

                <div className="px-6 py-8 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-cool-mist/40 mb-4">Core Settings</p>
                    <nav className="space-y-1.5">
                        {NAV_ITEMS.map(item => {
                            const isActive = location.pathname.includes(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${isActive
                                        ? 'bg-white/5 text-white border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                                        : 'text-cool-mist hover:text-white hover:bg-white/[0.02] border-transparent'
                                        }`}
                                >
                                    <span className={`${isActive ? 'text-electric-lavender' : 'text-cool-mist/50'}`}>{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6 border-t border-white/5">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-cool-mist hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                        <LogOut className="w-4 h-4 opacity-50" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b border-white/5 bg-[#0F0F12] flex items-center px-8 justify-between">
                    <div className="flex items-center gap-2"></div>
                    <div className="flex items-center gap-6">
                        <span className="font-mono text-[10px] text-cool-mist/40 uppercase">Session ID: {session.user.id.substring(0, 8)}</span>
                        <div className="hidden sm:flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-cool-mist">
                            <span>{session.user.email}</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-8 relative">
                    <div className="max-w-6xl mx-auto relative z-10 h-full">
                        <Outlet context={{ userRole: 'System Administrator', email: session.user.email }} />
                    </div>
                </div>
            </main>
        </div>
    );
}
