import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Activity, Shield, Users, Bell, LogOut, Loader2, FileDigit, BarChart } from 'lucide-react';

export default function AdminLayout() {
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
        return <Navigate to="/institution-login" replace />;
    }

    // Only Institution Admins arrive here. Super Admins go to SuperAdminLayout.
    const userRole = 'Institution Admin';

    const NAV_ITEMS = [
        { path: '/admin/overview', label: 'Student Well-Being', icon: <Activity className="w-4 h-4" /> },
        { path: '/admin/escalations', label: 'Stress Alerts', icon: <Bell className="w-4 h-4" /> },
        { path: '/admin/compliance', label: 'Weekly Trends', icon: <BarChart className="w-4 h-4" /> },
        { path: '/admin/interventions', label: 'Counseling Requests', icon: <Users className="w-4 h-4" /> }
    ];

    const authorizedNavItems = NAV_ITEMS;

    return (
        <div className="min-h-screen border-t-4 border-electric-lavender bg-[#0A0A0C] text-cool-mist font-sora flex">
            {/* Sidebar Command Line */}
            <aside className="w-64 border-r border-white/5 bg-[#0F0F12] flex flex-col pt-2">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-electric-lavender/10 border border-electric-lavender/30 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-electric-lavender" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white tracking-wide">AntaraShanti</h1>
                        <p className="text-[9px] font-mono text-electric-lavender uppercase tracking-widest">Enterprise Mode</p>
                    </div>
                </div>

                <div className="px-6 py-8 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-cool-mist/40 mb-4">Platform Modules</p>
                    <nav className="space-y-1.5">
                        {authorizedNavItems.map(item => {
                            const isActive = location.pathname.includes(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${isActive ? 'bg-electric-lavender/10 text-electric-lavender border border-electric-lavender/20' : 'text-cool-mist/70 hover:bg-white/5 hover:text-white border border-transparent'}`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-4 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-8 h-8 rounded-full bg-electric-lavender flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 text-[#0A0A0C]" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs text-white truncate w-full">{session.user.email}</p>
                            <p className="text-[9px] font-mono text-electric-lavender truncate mt-0.5">{userRole}</p>
                        </div>
                    </div>
                    <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono uppercase tracking-widest text-cool-mist/50 hover:text-white hover:bg-white/5 rounded transition-colors">
                        <LogOut className="w-3 h-3" /> Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b border-white/5 bg-[#0F0F12] flex items-center px-8 justify-between">
                    <div className="flex items-center gap-2">
                        {/* Removed the 'Network Secure' technical ping per user request */}
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="font-mono text-[10px] text-cool-mist/40 uppercase">Session ID: {session.user.id.substring(0, 8)}</span>
                        <button className="text-cool-mist/50 hover:text-white transition-colors relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-electric-lavender rounded-full" />
                        </button>
                    </div>
                </header>
                <div className="flex-1 p-8 overflow-y-auto relative">
                    {/* Background global admin styling */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-electric-lavender/5 rounded-full blur-[100px] pointer-events-none" />
                    <Outlet context={{ userRole, session }} />
                </div>
            </main>
        </div>
    );
}
