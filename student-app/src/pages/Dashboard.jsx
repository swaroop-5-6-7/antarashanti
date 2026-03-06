import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
    Command,
    LogOut,
    User,
    Bell,
    Heart,
    Activity,
    History,
    ArrowRight,
    Sparkles,
    Loader2,
    Users,
    Send,
    RefreshCw,
    Wind,
    Flame,
    AlertTriangle,
    Phone
} from 'lucide-react';

const MOODS = [
    { id: 'happy', label: 'Happy', emoji: '😄', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', hover: 'hover:border-green-500/50 hover:bg-green-500/20' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hover: 'hover:border-blue-500/50 hover:bg-blue-500/20' },
    { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', hover: 'hover:border-gray-500/50 hover:bg-gray-500/20' },
    { id: 'stressed', label: 'Stressed', emoji: '😫', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', hover: 'hover:border-orange-500/50 hover:bg-orange-500/20' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', hover: 'hover:border-indigo-500/50 hover:bg-indigo-500/20' },
    { id: 'angry', label: 'Angry', emoji: '😡', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', hover: 'hover:border-red-500/50 hover:bg-red-500/20' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', hover: 'hover:border-yellow-500/50 hover:bg-yellow-500/20' },
    { id: 'overwhelmed', label: 'Overwhelmed', emoji: '🤯', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', hover: 'hover:border-purple-500/50 hover:bg-purple-500/20' },
];

const REASONS = [
    'Exams', 'Assignments', 'Academic pressure', 'Sleep issues', 'Social pressure',
    'Relationships', 'Health', 'Loneliness', 'Overthinking', 'Personal issues', 'Other'
];

const STATIC_RESPONSES = {
    happy: {
        response: "It's wonderful that you're experiencing a high note today. Embracing these moments helps build a reservoir of positive energy for the future.",
        quote: "Happiness is not something ready made. It comes from your own actions.",
        author: "Dalai Lama",
        exercises: [
            { type: "gratitude", name: "Gratitude Journal", icon: "📝", description: "Write down 3 specific things that contributed to your happiness today to capture this feeling.", duration: "3 mins" },
            { type: "timer", name: "Savoring Walk", icon: "🚶", description: "Take a short walk and intentionally notice the pleasant sights, sounds, and physical sensations.", duration: "5 mins" }
        ]
    },
    calm: {
        response: "Finding a state of calm is a beautiful achievement amidst a busy student life. This balance is your foundation for clarity.",
        quote: "Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself.",
        author: "Hermann Hesse",
        exercises: [
            { type: "timer", name: "Body Scan", icon: "🧘", description: "Mentally scan your body from head to toe, noticing your relaxed state without trying to change anything.", duration: "4 mins" },
            { type: "breathing", name: "Mindful Breathing", icon: "🌬️", description: "Notice your natural breath rhythm. Don't force it, just observe the gentle rise and fall of your chest.", duration: "2 mins" }
        ]
    },
    neutral: {
        response: "It's completely normal to have days that just feel 'okay'. These steady, neutral days are the quiet engine of your progress.",
        quote: "Sometimes the most productive thing you can do is relax.",
        author: "Mark Black",
        exercises: [
            { type: "timer", name: "Gentle Stretching", icon: "🤸", description: "Do some light neck and shoulder rolls to stay physically refreshed and prevent stiffness.", duration: "2 mins" },
            { type: "timer", name: "Task Prioritization", icon: "📋", description: "Since your mind is clear, take a moment to outline your top 3 realistic goals for tomorrow.", duration: "3 mins" }
        ]
    },
    stressed: {
        response: "It completely makes sense that you are feeling stressed right now. The pressure of student life is heavy, but you have the resilience to handle it step by step.",
        quote: "You don't have to see the whole staircase, just take the first step.",
        author: "Martin Luther King Jr.",
        exercises: [
            { type: "breathing", name: "Box Breathing", icon: "💨", description: "Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. This immediately lowers cortisol.", duration: "2 mins" },
            { type: "timer", name: "Brain Dump", icon: "🧠", description: "Write down absolutely everything you are worried about on a piece of paper to get it out of your head.", duration: "5 mins" }
        ]
    },
    sad: {
        response: "I hear that you're feeling down. Please know it's entirely okay to feel sad—it means you care deeply. Be gentle with yourself right now.",
        quote: "The word 'happiness' would lose its meaning if it were not balanced by sadness.",
        author: "Carl Jung",
        exercises: [
            { type: "timer", name: "Compassion Hold", icon: "🫂", description: "Place your hand over your heart and take slow breaths, offering yourself the same kindness you would a friend.", duration: "2 mins" },
            { type: "timer", name: "Comfort Activity", icon: "☕", description: "Make a warm cup of tea or listen to a familiar, comforting song without any other distractions.", duration: "5 mins" }
        ]
    },
    angry: {
        response: "Your frustration is valid. Anger is often a sign that a boundary has been crossed or a need isn't being met. It's okay to feel this heat.",
        quote: "For every minute you are angry you lose sixty seconds of happiness.",
        author: "Ralph Waldo Emerson",
        exercises: [
            { type: "timer", name: "Progressive Relaxation", icon: "✊", description: "Tense every muscle in your body as hard as you can for 5 seconds, then completely release.", duration: "3 mins" },
            { type: "timer", name: "Intense Output", icon: "🏃", description: "Do 20 jumping jacks or briskly walk up and down a flight of stairs to channel the adrenaline.", duration: "2 mins" }
        ]
    },
    anxious: {
        response: "It's completely understandable to feel anxious. Your mind is trying to protect you by anticipating the future, but right now, you are safe.",
        quote: "You don't have to control your thoughts. You just have to stop letting them control you.",
        author: "Dan Millman",
        exercises: [
            { type: "timer", name: "5-4-3-2-1 Grounding", icon: "👁️", description: "Name 5 things you see, 4 you can touch, 3 you can hear, 2 you smell, and 1 you taste.", duration: "3 mins" },
            { type: "timer", name: "Cold Water Reset", icon: "💦", description: "Splash cold water on your face or hold an ice cube to activate the mammalian dive reflex and calm the nervous system.", duration: "1 min" }
        ]
    },
    overwhelmed: {
        response: "When everything piles up, feeling overwhelmed is the natural response. You don't need to fix everything today. Let's just focus on the next hour.",
        quote: "Nothing diminishes anxiety faster than action.",
        author: "Walter Anderson",
        exercises: [
            { type: "timer", name: "Micro-Tasking", icon: "🎯", description: "Pick the absolute smallest, easiest task you can do right now (even just organizing 3 pens) and do only that.", duration: "2 mins" },
            { type: "timer", name: "Sensory Withdrawal", icon: "🎧", description: "Close your eyes, put on noise-canceling headphones or earplugs, and lie flat on the floor for a few moments.", duration: "3 mins" }
        ]
    }
};

const TIME_CONTEXTS = [
    { id: 'morning', label: '🌅 Morning' },
    { id: 'afternoon', label: '☀️ Afternoon' },
    { id: 'evening', label: '🌇 Evening' },
    { id: 'latenight', label: '🌙 Late Night' },
];

const CRISIS_KEYWORDS = [
    'hopeless', 'disappear', "can't handle", 'give up', 'giving up', 'end it', 'suicide', 'kill myself'
];

const IntensityVisualizer = ({ intensity }) => {
    const containerRef = useRef(null);
    const intensityRef = useRef(intensity);
    const numBars = 60;

    useEffect(() => {
        intensityRef.current = intensity;
        if (containerRef.current) {
            const bars = containerRef.current.children;
            const val = intensity * 10;
            for (let i = 0; i < bars.length; i++) {
                const variance = Math.random() * (val * 0.4);
                bars[i].style.height = `${Math.min(100, val + variance)}%`;
            }
        }
    }, [intensity]);

    useEffect(() => {
        if (!containerRef.current) return;
        const wrapper = containerRef.current;
        wrapper.innerHTML = '';

        const val = intensityRef.current * 10;
        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'flex-shrink-0 w-2 rounded-t-full transition-[height] duration-300 ease-out bg-electric-lavender shadow-[0_0_8px_rgba(139,125,255,0.8)]';

            const randomHeight = Math.floor(Math.random() * (val * 0.5)) + (val * 0.5);
            bar.style.height = `${randomHeight}%`;

            wrapper.appendChild(bar);
        }

        const clone = wrapper.cloneNode(true);
        while (clone.firstChild) {
            wrapper.appendChild(clone.firstChild);
        }

        const bars = wrapper.children;
        const intervalId = setInterval(() => {
            const currentVal = intensityRef.current * 10;
            for (let i = 0; i < 5; i++) {
                const index = Math.floor(Math.random() * bars.length);
                const variance = Math.random() * (currentVal * 0.3);
                bars[index].style.height = `${Math.min(100, currentVal + variance)}%`;
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    let speed = '15s';
    if (intensity > 4) speed = '8s';
    if (intensity > 7) speed = '3s';

    return (
        <div className="relative w-full h-32 overflow-hidden bg-white/[0.02] rounded-2xl border border-white/5 flex items-end p-3 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] shadow-inner">
            <style>
                {`
                @keyframes sideScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                `}
            </style>
            <div
                ref={containerRef}
                className="flex gap-1.5 w-max h-full items-end"
                style={{ animation: `sideScroll ${speed} linear infinite` }}
            >
            </div>
        </div>
    );
};

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [randomId, setRandomId] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Navigation State
    const [activeTab, setActiveTab] = useState('check-in'); // check-in, history, connection, notifications, profile

    // Profile & Notifications State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        displayName: '',
        bio: 'Computer Science major. Trying to find balance between code and calm.',
        avatarUrl: ''
    });
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'streak', title: '🔥 6 Day Streak!', message: 'You are crushing it. Keep up the daily reflection.', time: '2 hours ago', unread: true },
        { id: 2, type: 'ai', title: '✨ AI Insight Available', message: 'Your weekly emotional pattern analysis is ready.', time: '1 day ago', unread: true },
        { id: 3, type: 'connection', title: '🌊 Connection Ping', message: 'Someone in the "Calm" room resonated with your anonymous note.', time: '2 days ago', unread: false }
    ]);

    // Check-In State
    const [checkInStep, setCheckInStep] = useState('mood'); // mood, intensity, reflection, support, crisis
    const [selectedMood, setSelectedMood] = useState(null);
    const [intensity, setIntensity] = useState(5);
    const [timeContext, setTimeContext] = useState('');
    const [reflectionText, setReflectionText] = useState('');
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // AI Response State
    const [aiResponse, setAiResponse] = useState('');
    const [aiQuote, setAiQuote] = useState({ text: '', author: '' });
    const [aiExercises, setAiExercises] = useState([]);
    const [aiError, setAiError] = useState('');

    // Historical Day Modal State
    const [selectedPastDayData, setSelectedPastDayData] = useState(null);

    // Interactive Coping Toolkit State
    const [activeTool, setActiveTool] = useState(null);
    const [breathingPhase, setBreathingPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Hold
    const [breathingTimer, setBreathingTimer] = useState(4);
    const [toolCompleted, setToolCompleted] = useState(false);

    // Mocked Streak
    const streakDays = 6;

    useEffect(() => {
        async function getUserProfile() {
            if (!supabase) {
                setLoading(false);
                return;
            }

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/');
            } else {
                setUser(user);
                setRandomId(Math.floor(1000 + Math.random() * 9000).toString());
                setProfileData(prev => ({
                    ...prev,
                    displayName: user.user_metadata?.first_name || 'Student'
                }));
            }
            setLoading(false);
        }

        getUserProfile();
    }, [navigate]);

    // Breathing Exercise Effect
    useEffect(() => {
        let interval;
        if (activeTool && activeTool.type === 'breathing' && !toolCompleted) {
            interval = setInterval(() => {
                setBreathingTimer((prev) => {
                    if (prev === 1) {
                        setBreathingPhase(phase => {
                            if (phase === 'Inhale') return 'Hold 1';
                            if (phase === 'Hold 1') return 'Exhale';
                            if (phase === 'Exhale') return 'Hold 2';
                            if (phase === 'Hold 2') return 'Inhale';
                            return 'Inhale';
                        });
                        return 4; // 4 seconds per phase
                    }
                    return prev - 1;
                });
            }, 1000);

            // Stop after 60 seconds (approx 15 cycles of 4s)
            const timer = setTimeout(() => {
                clearInterval(interval);
                setToolCompleted(true);
            }, 60000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
        return () => clearInterval(interval);
    }, [activeTool, toolCompleted]);

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        navigate('/');
    };

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        setCheckInStep('intensity');
    };

    const submitIntensity = () => {
        if (!timeContext) return;
        setCheckInStep('reflection');
    };

    const toggleReason = (reason) => {
        if (selectedReasons.includes(reason)) {
            setSelectedReasons(selectedReasons.filter(r => r !== reason));
        } else {
            setSelectedReasons([...selectedReasons, reason]);
        }
    };

    const checkCrisis = (text) => {
        const lowerText = text.toLowerCase();
        return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
    };

    const submitReflection = async () => {
        if (checkCrisis(reflectionText)) {
            setCheckInStep('crisis');
            return;
        }

        setIsAnalyzing(true);
        setAiError('');

        // Simulate AI analysis delay for UX
        setTimeout(() => {
            try {
                const moodId = selectedMood?.id || 'neutral';
                const predefinedData = STATIC_RESPONSES[moodId];

                // Add intensity context to the response if it's high
                let finalResponse = predefinedData.response;
                if (intensity >= 8) {
                    finalResponse = `I see your intensity is very high at ${intensity}/10 right now. ` + finalResponse;
                }

                // Add context about reasons if provided
                if (selectedReasons.length > 0) {
                    finalResponse += ` It makes complete sense given that you're dealing with ${selectedReasons[0].toLowerCase()}.`;
                }

                setAiResponse(finalResponse);
                setAiQuote({ text: predefinedData.quote, author: predefinedData.author });
                setAiExercises(predefinedData.exercises || []);

                setCheckInStep('support');
            } catch (error) {
                console.error("Analysis generation failed:", error);
                // Fallback content if something breaks internally
                setAiResponse(`It's completely understandable to feel ${selectedMood?.label.toLowerCase()} at a high intensity of ${intensity}/10 right now. Your emotions are entirely valid. Taking the step to reflect is a victory in self-awareness.`);
                setAiQuote({ text: "Every storm runs out of rain.", author: "Maya Angelou" });
                setAiExercises([]);
                setAiError("Warning: Using fallback response because the engine encountered an error generating your reflection.");
                setCheckInStep('support');
            } finally {
                setIsAnalyzing(false);
            }
        }, 1500); // 1.5s simulated delay
    };

    const resetCheckIn = () => {
        setCheckInStep('mood');
        setSelectedMood(null);
        setIntensity(5);
        setTimeContext('');
        setReflectionText('');
        setSelectedReasons([]);
        setActiveTool(null);
        setToolCompleted(false);
        setAiResponse('');
        setAiQuote({ text: '', author: '' });
        setAiExercises([]);
        setAiError('');
    };

    // Generate heatmap mock data
    const renderHeatmap = () => {
        const days = [];
        const moodsMap = {
            0: 'bg-green-500/20', // calm/happy
            1: 'bg-gray-500/20', // neutral
            2: 'bg-orange-500/20', // stressed
            3: 'bg-indigo-500/20' // sad/anxious/overwhelmed
        };

        for (let i = 0; i < 30; i++) {
            const randomType = Math.floor(Math.random() * 4);
            days.push(
                <div
                    key={i}
                    className={`w-4 h-4 rounded-sm ${moodsMap[randomType]} border border-white/5 hover:border-electric-lavender transition-colors cursor-pointer`}
                    title={`Day ${30 - i} - Logged Mood`}
                />
            )
        }
        return days;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-electric-lavender animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050508] text-cool-mist flex overflow-hidden relative">

            {/* AMBIENT BACKGROUND ORBS */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-electric-lavender/10 blur-[120px] pointer-events-none mix-blend-screen z-0" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none mix-blend-screen z-0" />
            <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none mix-blend-screen z-0" />

            {/* SIDEBAR */}
            <aside className="w-64 border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl hidden md:flex flex-col animate-fade-in relative z-20 shadow-2xl">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl overflow-hidden bg-electric-lavender/10 border border-electric-lavender/20 shadow-[0_0_15px_rgba(139,125,255,0.2)]">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover scale-110" />
                    </div>
                    <span className="font-sora font-bold text-cool-mist text-lg tracking-tight">AntaraShanti</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <p className="px-4 font-mono text-[10px] uppercase tracking-widest text-cool-mist/30 mb-4">Wellness Core</p>

                    <button
                        onClick={() => setActiveTab('check-in')}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-sora text-sm rounded-lg transition-all ${activeTab === 'check-in'
                            ? 'bg-electric-lavender/5 text-electric-lavender border border-electric-lavender/10'
                            : 'text-cool-mist/70 hover:bg-[#121214] hover:text-cool-mist border border-transparent'
                            }`}
                    >
                        <Activity className="w-4 h-4" />
                        <span className="font-medium">Daily Check-In</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('connection')}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-sora text-sm rounded-lg transition-all group ${activeTab === 'connection'
                            ? 'bg-electric-lavender/5 text-electric-lavender border border-electric-lavender/10'
                            : 'text-cool-mist/70 hover:bg-[#121214] hover:text-cool-mist border border-transparent'
                            }`}
                    >
                        <Users className="w-4 h-4 group-hover:text-electric-lavender transition-colors" />
                        <span className="font-medium">Connection Board</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('history')}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-sora text-sm rounded-lg transition-all group ${activeTab === 'history'
                            ? 'bg-electric-lavender/5 text-electric-lavender border border-electric-lavender/10'
                            : 'text-cool-mist/70 hover:bg-[#121214] hover:text-cool-mist border border-transparent'
                            }`}
                    >
                        <History className="w-4 h-4 group-hover:text-electric-lavender transition-colors" />
                        <span className="font-medium">Mood History</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="mb-4 px-4">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-cool-mist/50">Current Identity</p>
                        <p className="font-sora text-sm mt-1 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-electric-lavender animate-pulse" />
                            Anonymous #{randomId}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500/70 hover:bg-red-500/10 hover:text-red-400 font-sora text-sm rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Secure Logout</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative bg-transparent z-10">

                {/* TOP BAR */}
                <header className="sticky top-0 z-30 bg-[#050508]/40 backdrop-blur-2xl border-b border-white/5 p-4 md:px-8 flex justify-between items-center shadow-lg">
                    <div className="md:hidden flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden bg-electric-lavender/10 border border-electric-lavender/20">
                            <img src={logo} alt="Logo" className="w-full h-full object-cover scale-110" />
                        </div>
                        <span className="font-sora font-semibold">AntaraShanti</span>
                    </div>
                    <div className="hidden md:block">
                        <h2 className="font-sora font-semibold text-lg flex items-center gap-2">
                            {activeTab === 'check-in' && <><Activity className="w-5 h-5 text-electric-lavender" /> Emotional Check-In Center</>}
                            {activeTab === 'connection' && <><Users className="w-5 h-5 text-electric-lavender" /> Anonymous Connection Board</>}
                            {activeTab === 'history' && <><History className="w-5 h-5 text-electric-lavender" /> Emotional Insights</>}
                            {activeTab === 'notifications' && <><Bell className="w-5 h-5 text-electric-lavender" /> Notifications Hub</>}
                            {activeTab === 'profile' && <><User className="w-5 h-5 text-electric-lavender" /> Personal Profile</>}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* DAILY STREAK INDICATOR */}
                        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
                            <Flame className="w-4 h-4 text-orange-400" />
                            <span className="font-sora text-sm font-semibold text-orange-100">{streakDays} Days</span>
                        </div>

                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`relative p-2 transition-colors rounded-lg hover:bg-white/5 ${activeTab === 'notifications' ? 'text-electric-lavender bg-white/5' : 'text-cool-mist/50 hover:text-cool-mist'}`}
                        >
                            <Bell className="w-5 h-5" />
                            {notifications.some(n => n.unread) && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-electric-lavender rounded-full" />
                            )}
                        </button>
                        <div className="h-6 w-px bg-white/10" />
                        <button
                            onClick={() => setActiveTab('profile')}
                            className="flex items-center gap-3 hover:bg-white/5 p-1 rounded-full transition-colors"
                        >
                            <div className="w-9 h-9 bg-electric-lavender/10 border border-electric-lavender/30 rounded-full flex items-center justify-center overflow-hidden">
                                {profileData.avatarUrl ? (
                                    <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-4 h-4 text-electric-lavender" />
                                )}
                            </div>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="md:hidden p-2 text-red-500/70 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* DASHBOARD CONTENT VIEWS */}
                <div className="p-4 pb-24 md:p-8 md:pb-8 flex-1 max-w-5xl mx-auto w-full">

                    {/* 1. DAILY CHECK-IN CENTER */}
                    {activeTab === 'check-in' && (
                        <div className="animate-fade-in relative">

                            {/* Background Glows */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-lavender/5 blur-[100px] rounded-full pointer-events-none" />

                            {/* Step 1: Mood Tracking Board */}
                            {checkInStep === 'mood' && (
                                <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in w-full max-w-4xl mx-auto">

                                    {/* EVERY DAY STREAK SECTION */}
                                    <div className="w-full flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden gap-6">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

                                        <div className="flex items-center gap-6 relative z-10 w-full md:w-auto text-left">
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
                                                <Flame className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-sora font-bold text-2xl text-white mb-2">{streakDays} Day Check-In Streak!</h3>
                                                <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50">Consistency builds resilience. Keep it going!</p>
                                            </div>
                                        </div>

                                        {/* Weekly Mini-Calendar for Streak */}
                                        <div className="flex gap-1 md:gap-2 relative z-10 w-full md:w-auto justify-between">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                                                const isCompleted = index < streakDays;
                                                const isToday = index === streakDays;

                                                // Hypothetical mock data for the days
                                                const mockData = [
                                                    { mood: 'Stressed', intensity: 8, emoji: '🌪️', color: 'text-orange-400', reason: 'Exams, Academic pressure', aiInsight: "You noted feeling tense in the morning. Writing down a priority list helped you regain control.", date: "Monday" },
                                                    { mood: 'Calm', intensity: 4, emoji: '🌊', color: 'text-blue-400', reason: 'Good sleep', aiInsight: "A peaceful start to the day. You maintained this balance through your evening walk.", date: "Tuesday" },
                                                    { mood: 'Happy', intensity: 7, emoji: '✨', color: 'text-green-400', reason: 'Friends', aiInsight: "Social connections boosted your mood significantly today.", date: "Wednesday" },
                                                    { mood: 'Anxious', intensity: 6, emoji: '⚡', color: 'text-yellow-400', reason: 'Deadlines', aiInsight: "While anxious about upcoming tasks, you successfully utilized the 60-second breathing tool.", date: "Thursday" },
                                                    { mood: 'Neutral', intensity: 5, emoji: '☁️', color: 'text-cool-mist', reason: 'Routine', aiInsight: "A balanced, steady day. Maintaining routine builds emotional resilience.", date: "Friday" },
                                                    { mood: 'Calm', intensity: 3, emoji: '🌊', color: 'text-blue-400', reason: 'Rest', aiInsight: "Excellent recovery day. You allowed yourself time to recharge.", date: "Saturday" },
                                                    null // Sunday (Today/Uncompleted)
                                                ];

                                                return (
                                                    <div
                                                        key={day}
                                                        onClick={() => isCompleted && setSelectedPastDayData(mockData[index])}
                                                        className={`flex flex-col items-center py-2 px-1 md:p-3 rounded-xl border flex-1 md:flex-none md:w-[60px] ${isCompleted ? 'bg-orange-500/10 border-orange-500/30 cursor-pointer hover:bg-orange-500/20 active:scale-95 transition-all' : isToday ? 'bg-[#121214] border-white/20' : 'bg-[#0A0A0C] border-white/5 opacity-50'}`}
                                                    >
                                                        <span className={`font-mono text-[8px] md:text-[10px] uppercase tracking-widest mb-1 md:mb-2 ${isCompleted ? 'text-orange-400/80 pointer-events-none' : 'text-cool-mist/50 pointer-events-none'}`}>{day}</span>
                                                        <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all pointer-events-none ${isCompleted ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] text-white scale-110' : isToday ? 'bg-white/5 text-white/30 border border-white/20' : 'bg-transparent text-transparent border border-white/10'}`}>
                                                            {isCompleted ? <Flame className="w-3 h-3 md:w-4 md:h-4 ml-[1px]" /> : <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${isToday ? 'bg-white/40 animate-pulse' : 'bg-white/10'}`} />}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <span className="font-mono text-[10px] uppercase tracking-widest text-electric-lavender mb-4 block px-3 py-1 bg-electric-lavender/10 rounded-full">Step 1 of 3</span>
                                    <h1 className="text-4xl md:text-5xl font-sora font-bold mb-3 text-center">How do you feel right now?</h1>
                                    <p className="text-cool-mist/50 font-mono tracking-widest uppercase text-xs mb-12 text-center">Select your current emotional state</p>

                                    {/* MOOD GRID */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                                        {MOODS.map(mood => (
                                            <button
                                                key={mood.id}
                                                onClick={() => handleMoodSelect(mood)}
                                                className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${mood.bg} ${mood.border} ${mood.hover} bg-opacity-30 backdrop-blur-md group shadow-sm hover:scale-105`}
                                            >
                                                <span className="text-4xl mb-3">{mood.emoji}</span>
                                                <span className={`font-sora font-semibold ${mood.color}`}>{mood.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Past Day Detail Modal Overlay */}
                                    {selectedPastDayData && (
                                        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
                                            <div className="bg-[#0A0A0C]/90 backdrop-blur-2xl border border-white/10 rounded-3xl max-w-md w-full p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                                <button
                                                    onClick={() => setSelectedPastDayData(null)}
                                                    className="absolute top-4 right-4 p-2 text-cool-mist/50 hover:text-white bg-white/5 rounded-full transition-colors"
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </button>

                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-16 h-16 bg-[#0A0A0C] border border-white/5 rounded-2xl flex items-center justify-center text-3xl">
                                                        {selectedPastDayData.emoji}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-sora font-bold text-xl text-white">{selectedPastDayData.date} Check-In</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`font-mono text-xs uppercase tracking-widest ${selectedPastDayData.color}`}>{selectedPastDayData.mood}</span>
                                                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                            <span className="font-mono text-[10px] text-cool-mist/50">Intensity: {selectedPastDayData.intensity}/10</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="bg-[#0A0A0C] p-4 rounded-xl border border-white/5">
                                                        <p className="font-mono text-[9px] uppercase tracking-widest text-cool-mist/50 mb-1">Identified Triggers</p>
                                                        <p className="font-sora text-sm text-cool-mist/90">{selectedPastDayData.reason}</p>
                                                    </div>
                                                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                                                        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-electric-lavender/10 blur-[80px] rounded-full pointer-events-none" />

                                                        <div className="w-12 h-12 bg-electric-lavender/10 border border-electric-lavender/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                                            <Sparkles className="w-6 h-6 text-electric-lavender" />
                                                        </div>
                                                        <p className="font-mono text-[9px] uppercase tracking-widest text-electric-lavender mb-2 flex items-center gap-1">
                                                            AI Retrospective
                                                        </p>
                                                        <p className="font-sora text-sm text-cool-mist/90 leading-relaxed italic">"{selectedPastDayData.aiInsight}"</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => setSelectedPastDayData(null)}
                                                    className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-white font-sora font-medium text-sm rounded-xl transition-colors"
                                                >
                                                    Close Details
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 1.5: Intensity & Time Context */}
                            {checkInStep === 'intensity' && (
                                <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto animate-fade-in">
                                    <button
                                        onClick={() => setCheckInStep('mood')}
                                        className="self-start mb-8 text-cool-mist/50 hover:text-cool-mist font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
                                    >
                                        ← Back to Mood
                                    </button>

                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                                        {selectedMood?.emoji}
                                    </div>

                                    <h1 className="text-3xl font-sora font-bold mb-8 text-center text-white">How intense is this feeling?</h1>

                                    <div className="w-full space-y-12 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                                        {/* Animated Signal Bar Intensity Slider */}
                                        <div className="space-y-6 w-full">
                                            <div className="flex justify-between items-end font-mono text-xs uppercase tracking-widest text-cool-mist/50 px-2 lg:px-4">
                                                <span>Mild</span>
                                                <div className="text-center animate-fade-in relative">
                                                    <div className="absolute inset-0 bg-electric-lavender/20 blur-xl rounded-full" />
                                                    <span className="text-electric-lavender text-4xl font-bold block mb-1 relative z-10">{intensity}</span>
                                                    <span className="text-[10px] relative z-10 text-electric-lavender/80">Level</span>
                                                </div>
                                                <span>Extreme</span>
                                            </div>

                                            <IntensityVisualizer intensity={intensity} />

                                            <div className="pt-2 px-2 lg:px-4">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="10"
                                                    value={intensity}
                                                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-electric-lavender outline-none focus:outline-none transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-electric-lavender [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(139,125,255,0.8)]"
                                                />
                                            </div>
                                        </div>

                                        {/* Time Context */}
                                        <div>
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50 mb-3 text-center">When did you feel this the most?</p>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                                                {TIME_CONTEXTS.map(time => (
                                                    <button
                                                        key={time.id}
                                                        onClick={() => setTimeContext(time.id)}
                                                        className={`py-3 rounded-xl border transition-colors ${timeContext === time.id ? 'bg-electric-lavender/10 border-electric-lavender text-electric-lavender' : 'bg-[#121214] border-white/5 text-cool-mist hover:border-white/20'}`}
                                                    >
                                                        {time.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={submitIntensity}
                                            disabled={!timeContext}
                                            className={`w-full py-4 font-sora font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${timeContext ? 'bg-electric-lavender text-midnight-blue hover:bg-electric-lavender/90 shadow-[0_0_20px_rgba(139,125,255,0.2)]' : 'bg-white/5 text-cool-mist/50 cursor-not-allowed'}`}
                                        >
                                            Continue <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Emotional Reflection Board */}
                            {checkInStep === 'reflection' && !isAnalyzing && (
                                <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto animate-fade-in relative z-20">
                                    <button
                                        onClick={() => setCheckInStep('intensity')}
                                        className="self-start mb-8 text-cool-mist/50 hover:text-cool-mist font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
                                    >
                                        ← Back to Details
                                    </button>

                                    <h1 className="text-3xl font-sora font-bold mb-2 text-center text-white">What made you feel {selectedMood?.label.toLowerCase()} today?</h1>
                                    <p className="text-cool-mist/50 font-mono uppercase tracking-widest text-[10px] mb-8 text-center">Select all that apply and write a reflection</p>

                                    <div className="w-full space-y-8">
                                        <div>
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50 mb-3">Trigger Selection (Select Multiple)</p>
                                            <div className="flex flex-wrap gap-2">
                                                {REASONS.map(reason => (
                                                    <button
                                                        key={reason}
                                                        onClick={() => toggleReason(reason)}
                                                        className={`px-4 py-2 rounded-lg font-sora text-sm transition-all border ${selectedReasons.includes(reason)
                                                            ? 'bg-electric-lavender text-midnight-blue border-electric-lavender'
                                                            : 'bg-[#121214] text-cool-mist border-white/5 hover:border-white/20'
                                                            }`}
                                                    >
                                                        {reason}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50 mb-3">Reflection</p>
                                            <textarea
                                                value={reflectionText}
                                                onChange={(e) => setReflectionText(e.target.value)}
                                                className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-48 text-white font-sora focus:outline-none focus:border-electric-lavender/50 resize-none transition-all placeholder:text-cool-mist/30 shadow-inner"
                                                placeholder="I'm feeling this way because..." />
                                        </div>

                                        <button
                                            onClick={submitReflection}
                                            className="w-full py-4 bg-electric-lavender hover:bg-electric-lavender/90 text-midnight-blue font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(139,125,255,0.2)] hover:shadow-[0_0_30px_rgba(139,125,255,0.4)] flex items-center justify-center gap-2"
                                        >
                                            Generate AI Support <Sparkles className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Emergency Emotional Risk Detection State */}
                            {checkInStep === 'crisis' && (
                                <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto animate-fade-in text-center p-8 bg-red-500/5 border border-red-500/20 rounded-3xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />

                                    <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
                                        <AlertTriangle className="w-10 h-10 text-red-500" />
                                    </div>

                                    <h2 className="text-3xl font-sora font-bold text-white mb-4">You are not alone.</h2>
                                    <p className="font-sora text-cool-mist/80 leading-relaxed mb-8">
                                        "It seems you're going through something really difficult. You don't have to face this alone. There are people who want to support you right now."
                                    </p>

                                    <div className="w-full space-y-4">
                                        <button className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-sora font-bold rounded-xl transition-colors flex items-center justify-center gap-3">
                                            <Phone className="w-5 h-5" /> Contact Mental Health Helpline (24/7)
                                        </button>
                                        <button className="w-full py-4 bg-[#121214] border border-white/10 hover:border-white/30 text-white font-sora rounded-xl transition-colors flex items-center justify-center gap-3">
                                            <Users className="w-5 h-5" /> Connect with Campus Counselor
                                        </button>
                                        <button
                                            onClick={() => { setCheckInStep('support'); setActiveTool('breathing'); }}
                                            className="w-full py-4 bg-[#121214] border border-white/10 hover:border-white/30 text-white font-sora rounded-xl transition-colors flex items-center justify-center gap-3"
                                        >
                                            <Wind className="w-5 h-5" /> Start completely calm grounding exercise
                                        </button>
                                    </div>

                                    <button onClick={() => setCheckInStep('reflection')} className="mt-8 font-mono text-[10px] text-cool-mist/50 uppercase tracking-widest hover:text-white">
                                        Return to reflection
                                    </button>
                                </div>
                            )}

                            {/* AI Loading State */}
                            {isAnalyzing && (
                                <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in relative z-20">
                                    <div className="relative">
                                        {/* Outer rotating ring */}
                                        <div className="absolute inset-0 border-t-2 border-electric-lavender rounded-full animate-spin h-24 w-24 opacity-50" />
                                        {/* Inner glow */}
                                        <div className="w-24 h-24 bg-electric-lavender/10 rounded-full flex items-center justify-center blur-sm" />
                                        <Sparkles className="w-8 h-8 text-electric-lavender absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                                    </div>
                                    <h3 className="font-sora font-semibold text-lg mt-8 text-white">AI Engine Analyzing...</h3>
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50 mt-2">Correlating triggers and calculating intensity mapping</p>
                                </div>
                            )}

                            {/* Step 3: AI Emotional Support Engine & Coping Toolkit */}
                            {checkInStep === 'support' && (
                                <div className="max-w-4xl mx-auto py-8 animate-fade-in relative z-20">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h1 className="text-3xl font-sora font-bold mb-1">Personalized Support</h1>
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50">Logged: {selectedMood?.label} (Intensity: {intensity}/10)</p>
                                        </div>
                                        <button onClick={resetCheckIn} className="text-cool-mist/50 hover:text-white transition-colors flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                            <RefreshCw className="w-3 h-3" /> Finish Check-In
                                        </button>
                                    </div>

                                    <div className="bg-white/[0.02] backdrop-blur-2xl border border-electric-lavender/20 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-lavender/10 blur-[80px] rounded-full pointer-events-none" />

                                        {/* Error State if API missing */}
                                        {aiError && (
                                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6 flex items-start gap-3">
                                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                                <p>{aiError}</p>
                                            </div>
                                        )}

                                        <Sparkles className="w-6 h-6 text-electric-lavender mb-6" />

                                        {/* Empathetic Response */}
                                        <p className="font-sora text-lg leading-relaxed text-cool-mist mb-6">
                                            {aiResponse}
                                        </p>

                                        {/* Uplifting Quote */}
                                        <div className="border-l-2 border-electric-lavender/50 pl-6 my-8">
                                            <p className="font-sora italic text-cool-mist/80 text-xl font-light">"{aiQuote.text}"</p>
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/40 mt-3">— {aiQuote.author}</p>
                                        </div>
                                    </div>

                                    {/* INTERACTIVE COPING TOOLKIT */}
                                    <h3 className="font-sora font-semibold text-xl mb-4 flex items-center gap-2">
                                        <Activity className="w-6 h-6 text-electric-lavender" /> Interactive Coping Toolkit
                                    </h3>

                                    {!activeTool ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                            {aiExercises && aiExercises.length > 0 ? (
                                                aiExercises.map((exercise, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => setActiveTool(exercise)}
                                                        className="bg-white/[0.02] backdrop-blur-lg border border-white/10 hover:border-electric-lavender/50 focus:border-electric-lavender transition-all p-6 rounded-3xl cursor-pointer group hover:bg-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex flex-col h-full"
                                                    >
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="w-12 h-12 rounded-xl bg-electric-lavender/10 border border-electric-lavender/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                                                {exercise.icon}
                                                            </div>
                                                            <span className="font-mono text-[10px] uppercase tracking-widest text-electric-lavender bg-electric-lavender/10 px-2 py-1 rounded-md border border-electric-lavender/20">{exercise.duration}</span>
                                                        </div>
                                                        <h4 className="font-sora font-semibold text-lg text-white mb-2 group-hover:text-electric-lavender transition-colors">{exercise.name}</h4>
                                                        <p className="text-sm text-cool-mist/60 font-sora leading-relaxed flex-1">{exercise.description}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <>
                                                    <div
                                                        onClick={() => setActiveTool('breathing')}
                                                        className="bg-white/[0.02] backdrop-blur-lg border border-white/10 hover:border-electric-lavender/50 focus:border-electric-lavender transition-all p-6 rounded-3xl cursor-pointer group hover:bg-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex flex-col"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                                                            <Wind className="w-6 h-6" />
                                                        </div>
                                                        <h4 className="font-sora font-semibold text-lg text-white mb-2 group-hover:text-electric-lavender transition-colors">60-Second Box Breathing</h4>
                                                        <p className="text-sm text-cool-mist/60 font-sora leading-relaxed flex-1">A guided animated breathing exercise to immediately lower your heart rate and center your focus.</p>
                                                    </div>

                                                    <div
                                                        onClick={() => setActiveTool('gratitude')}
                                                        className="bg-white/[0.02] backdrop-blur-lg border border-white/10 hover:border-electric-lavender/50 transition-all p-6 rounded-3xl cursor-pointer group hover:bg-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex flex-col"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 text-green-400 group-hover:scale-110 transition-transform">
                                                            <Heart className="w-6 h-6" />
                                                        </div>
                                                        <h4 className="font-sora font-semibold text-lg text-white mb-2 group-hover:text-electric-lavender transition-colors">Quick Gratitude Reset</h4>
                                                        <p className="text-sm text-cool-mist/60 font-sora leading-relaxed flex-1">A 2-minute interactive prompt to shift your cognitive framing towards grounding positive realities.</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="bg-white/[0.02] backdrop-blur-2xl border border-electric-lavender/30 rounded-3xl p-8 mb-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                                            <button onClick={() => setActiveTool(null)} className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-cool-mist/50 hover:text-white">← Back to Tools</button>

                                            {activeTool && activeTool.type === 'breathing' && (
                                                <>
                                                    {!toolCompleted ? (
                                                        <div className="flex flex-col items-center animate-fade-in">
                                                            <h4 className="text-2xl font-sora font-bold mb-2 text-white">{activeTool.name}</h4>
                                                            <p className="text-cool-mist/60 font-sora text-sm text-center max-w-md w-full mb-8 line-clamp-3">{activeTool.description}</p>

                                                            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                                                                <div className={`absolute inset-0 rounded-full border-4 border-electric-lavender/30 transition-all duration-1000 ${breathingPhase === 'Inhale' ? 'scale-150 opacity-0' : breathingPhase === 'Exhale' ? 'scale-50 opacity-0' : 'scale-100 opacity-50'}`} />
                                                                <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-1000 bg-electric-lavender/10 shadow-[0_0_30px_rgba(139,125,255,0.2)] ${breathingPhase === 'Inhale' ? 'scale-125 bg-electric-lavender/20' : breathingPhase === 'Exhale' ? 'scale-75' : 'scale-100'}`}>
                                                                    <span className="font-sora font-bold text-xl text-white">{breathingPhase}</span>
                                                                    <span className="font-mono text-2xl text-electric-lavender">{breathingTimer}s</span>
                                                                </div>
                                                            </div>
                                                            <p className="text-cool-mist/60 font-sora text-sm">Follow the animation. Exercise completes in 60s.</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center text-center animate-fade-in">
                                                            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                                                                <Activity className="w-8 h-8" />
                                                            </div>
                                                            <h4 className="text-2xl font-sora font-bold mb-2 text-white">Exercise Complete</h4>
                                                            <p className="text-cool-mist/60 font-sora text-sm">Your heart rate should be resting lower. Excellent work taking time for yourself.</p>
                                                            <button onClick={() => { setActiveTool(null); resetCheckIn(); }} className="mt-6 px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-sora font-medium transition-all">Finish</button>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {activeTool && activeTool.type === 'gratitude' && (
                                                <div className="w-full max-w-lg animate-fade-in">
                                                    <h4 className="text-2xl font-sora font-bold mb-4 text-white text-center">{activeTool.name}</h4>
                                                    <p className="text-cool-mist/60 font-sora text-sm text-center mb-8">{activeTool.description}</p>

                                                    {!toolCompleted ? (
                                                        <div className="space-y-4">
                                                            <textarea
                                                                placeholder="I am grateful for..."
                                                                className="w-full h-24 bg-[#0A0A0C] border border-white/10 rounded-xl p-4 text-white font-sora focus:border-electric-lavender transition-colors resize-none"
                                                            />
                                                            <button onClick={() => setToolCompleted(true)} className="w-full py-3 bg-electric-lavender text-midnight-blue font-sora font-bold rounded-xl hover:bg-electric-lavender/90 transition-colors">
                                                                Save Reflection
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
                                                            <span className="text-3xl mb-2 block">✨</span>
                                                            <h5 className="font-sora text-green-400 font-semibold mb-1">Perspective Shifted</h5>
                                                            <p className="font-sora text-xs text-cool-mist/70">Reflection securely logged. Returning to these moments builds long-term resilience.</p>
                                                            <button onClick={() => { setActiveTool(null); resetCheckIn(); }} className="mt-6 px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-sora font-medium transition-all">Finish</button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {activeTool && activeTool.type === 'timer' && (
                                                <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full max-w-md">
                                                    <div className="relative mb-6">
                                                        <div className="absolute inset-0 rounded-2xl bg-electric-lavender/20 animate-ping opacity-75" />
                                                        <div className="relative w-20 h-20 rounded-2xl bg-electric-lavender/10 border border-electric-lavender/30 flex items-center justify-center shadow-[0_0_30px_rgba(139,125,255,0.2)] text-4xl z-10">
                                                            {activeTool.icon}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-2xl font-sora font-bold mb-4 text-white">{activeTool.name}</h4>
                                                    <p className="text-cool-mist/70 text-lg font-sora leading-relaxed mb-8">
                                                        {activeTool.description}
                                                    </p>

                                                    {!toolCompleted && activeTool.duration && (
                                                        <div className="font-mono text-xs uppercase tracking-widest text-electric-lavender bg-electric-lavender/10 px-4 py-2 rounded-lg border border-electric-lavender/20 mb-8 animate-pulse">
                                                            Suggested Duration: {activeTool.duration}
                                                        </div>
                                                    )}

                                                    <button onClick={() => { setToolCompleted(true); setTimeout(() => { setActiveTool(null); resetCheckIn(); }, 1500); }} className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-sora font-medium transition-all hover:scale-105 active:scale-95">
                                                        {toolCompleted ? 'Completed ✓' : 'Mark as Complete'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Anonymous Transition */}
                                    <div className="bg-electric-lavender/5 border border-electric-lavender/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div>
                                            <h4 className="font-sora font-medium text-white mb-2">Not alone in feeling this way.</h4>
                                            <p className="text-xs text-cool-mist/60 font-sora max-w-md">There are currently multiple students feeling {selectedMood?.label.toLowerCase()} right now. Connect anonymously to share support.</p>
                                        </div>
                                        <button
                                            onClick={() => setActiveTab('connection')}
                                            className="whitespace-nowrap px-6 py-3 bg-[#0A0A0C] border border-electric-lavender/30 hover:border-electric-lavender text-electric-lavender font-sora text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
                                        >
                                            Join Connection Board <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 2. ANONYMOUS CONNECTION BOARD */}
                    {activeTab === 'connection' && (
                        <div className="animate-fade-in max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
                            <div className="mb-6 border-b border-white/5 pb-4">
                                <h1 className="text-3xl font-sora font-bold mb-2">Connection Board</h1>
                                <p className="text-cool-mist/50 font-sora text-sm">Anonymous peer support grouped by current emotional state.</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['All', 'Stressed', 'Anxious', 'Overwhelmed', 'Sad'].map(filter => (
                                        <button key={filter} className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest border ${filter === 'Stressed' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-[#121214] border-white/10 text-cool-mist/50 hover:text-white'}`}>
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 bg-[#121214] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                                <div className="p-4 border-b border-white/5 bg-[#0A0A0C] flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
                                        <span className="font-sora font-semibold text-sm">Stressed Collective</span>
                                    </div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50">4 Nodes Online</span>
                                </div>

                                {/* Chat Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    <div className="flex justify-center">
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-cool-mist/30 bg-white/5 px-2 py-1 rounded-full">Secure Connection Established</span>
                                    </div>

                                    <div className="flex flex-col gap-1 items-start max-w-[80%]">
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-cool-mist/50 ml-2">Anonymous #1924</span>
                                        <div className="bg-[#0A0A0C] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm text-sm font-sora text-cool-mist leading-relaxed">
                                            Finals are completely overwhelming me this week. The intensity is definitely a 9.
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 items-end self-end max-w-[80%] ml-auto">
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-electric-lavender mr-2">You (Anonymous #{randomId})</span>
                                        <div className="bg-electric-lavender/10 border border-electric-lavender/20 px-4 py-3 rounded-2xl rounded-tr-sm text-sm font-sora text-white leading-relaxed">
                                            Yes, the project specifically. Taking it one hour at a time right now.
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 items-start max-w-[80%] w-full">
                                        <div className="flex items-center gap-2 mb-1 ml-2">
                                            <Sparkles className="w-3 h-3 text-electric-lavender" />
                                            <span className="font-mono text-[9px] uppercase tracking-widest text-electric-lavender">System Moderator</span>
                                        </div>
                                        <div className="bg-electric-lavender/5 border border-electric-lavender/20 px-4 py-2 flex items-center gap-3 rounded-lg text-xs font-sora text-cool-mist w-full">
                                            A reminder that this is a safe space. For immediate crisis support, type /help.
                                        </div>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-white/5 bg-[#0A0A0C]">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Send an anonymous message..."
                                            className="w-full bg-[#121214] border border-white/10 rounded-xl py-3 pl-4 pr-12 font-sora text-sm text-white focus:outline-none focus:border-electric-lavender/50 transition-colors placeholder:text-cool-mist/30"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-electric-lavender text-midnight-blue rounded-lg hover:bg-electric-lavender/90 transition-colors">
                                            <Send className="w-4 h-4 ml-[-2px] mt-[1px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. MOOD HISTORY & ADVANCED ANALYTICS */}
                    {activeTab === 'history' && (
                        <div className="animate-fade-in max-w-5xl mx-auto space-y-6 pb-12">
                            <div className="mb-6">
                                <h1 className="text-3xl font-sora font-bold mb-2">Emotional Insights</h1>
                                <p className="text-cool-mist/50 font-sora text-sm">Aggregated patterns from your recent check-ins.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                {/* Intensity Heatmap (GitHub Style) */}
                                <div className="bg-[#121214] border border-white/5 p-6 rounded-2xl col-span-1 md:col-span-2 relative overflow-hidden">
                                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50 mb-4">Monthly Mood Heatmap</h4>

                                    <div className="flex flex-wrap gap-1.5 justify-start">
                                        {renderHeatmap()}
                                    </div>

                                    <div className="mt-6 flex items-center gap-4 border-t border-white/5 pt-4">
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-cool-mist/40 cursor-default">Mapping:</span>
                                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-green-500/20" /><span className="text-[10px] font-mono text-cool-mist/40 cursor-default">Calm</span></div>
                                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-gray-500/20" /><span className="text-[10px] font-mono text-cool-mist/40 cursor-default">Neutral</span></div>
                                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-orange-500/20" /><span className="text-[10px] font-mono text-cool-mist/40 cursor-default">Stressed</span></div>
                                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-indigo-500/20" /><span className="text-[10px] font-mono text-cool-mist/40 cursor-default">Sad/Anx</span></div>
                                    </div>
                                </div>

                                {/* Analytics Overview */}
                                <div className="bg-[#121214] border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50 mb-4">AI Pattern Detection</h4>
                                        <div className="space-y-4">
                                            <div className="bg-[#0A0A0C] border border-white/5 p-3 rounded-lg">
                                                <p className="font-mono text-[9px] uppercase tracking-widest text-orange-400 mb-1">Time Association</p>
                                                <p className="font-sora text-xs text-cool-mist/70">"You tend to feel anxious more often at <span className="text-white">Late Night</span>."</p>
                                            </div>
                                            <div className="bg-[#0A0A0C] border border-white/5 p-3 rounded-lg">
                                                <p className="font-mono text-[9px] uppercase tracking-widest text-electric-lavender mb-1">Trigger Correlation</p>
                                                <p className="font-sora text-xs text-cool-mist/70">70% of your recorded stress is directly related to <span className="text-white">Academic Pressure</span>.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                                <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50">Recent Logs</h4>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {[
                                        { mood: 'Stressed', intensity: 8, emoji: '🌪️', reason: 'Exams, Academic pressure', time: 'Today, 08:30 AM', color: 'text-orange-400' },
                                        { mood: 'Calm', intensity: 4, emoji: '🌊', reason: 'Other', time: 'Yesterday, 09:15 PM', color: 'text-blue-400' },
                                        { mood: 'Anxious', intensity: 7, emoji: '⚡', reason: 'Deadlines', time: 'Oct 12, 02:20 PM', color: 'text-yellow-400' },
                                    ].map((log, i) => (
                                        <div key={i} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl shrink-0 backdrop-blur-sm">
                                                    {log.emoji}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h5 className={`font-sora font-semibold text-sm ${log.color}`}>{log.mood}</h5>
                                                        <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-cool-mist/70">LVL {log.intensity}</span>
                                                    </div>
                                                    <p className="font-mono text-[10px] text-cool-mist/50 uppercase tracking-widest mt-1">Tags: {log.reason}</p>
                                                </div>
                                            </div>
                                            <div className="font-mono text-[9px] text-cool-mist/30 uppercase tracking-widest text-right">
                                                {log.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. NOTIFICATIONS HUB */}
                    {activeTab === 'notifications' && (
                        <div className="animate-fade-in max-w-3xl mx-auto space-y-6 pb-12">
                            <div className="mb-8 flex justify-between items-end">
                                <div>
                                    <h1 className="text-3xl font-sora font-bold mb-2">Notifications</h1>
                                    <p className="text-cool-mist/50 font-sora text-sm">Stay updated on your emotional journey.</p>
                                </div>
                                <button
                                    onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                                    className="font-mono text-[10px] uppercase tracking-widest text-electric-lavender hover:text-white transition-colors"
                                >
                                    Mark all as read
                                </button>
                            </div>

                            <div className="space-y-4">
                                {notifications.map(notif => (
                                    <div key={notif.id} className={`p-5 rounded-2xl border transition-all backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] ${notif.unread ? 'bg-white/[0.04] border-electric-lavender/30' : 'bg-white/[0.01] border-white/5 opacity-80'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                {notif.type === 'streak' && <Flame className="w-5 h-5 text-orange-400" />}
                                                {notif.type === 'ai' && <Sparkles className="w-5 h-5 text-electric-lavender" />}
                                                {notif.type === 'connection' && <Users className="w-5 h-5 text-blue-400" />}
                                                <h3 className={`font-sora font-semibold ${notif.unread ? 'text-white' : 'text-cool-mist'}`}>{notif.title}</h3>
                                            </div>
                                            <span className="font-mono text-[9px] uppercase tracking-widest text-cool-mist/40">{notif.time}</span>
                                        </div>
                                        <p className="font-sora text-sm text-cool-mist/80 ml-8">{notif.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. USER PROFILE DASHBOARD */}
                    {activeTab === 'profile' && (
                        <div className="animate-fade-in max-w-2xl mx-auto space-y-8 pb-12">
                            <div className="mb-8">
                                <h1 className="text-3xl font-sora font-bold mb-2">Personal Profile</h1>
                                <p className="text-cool-mist/50 font-sora text-sm">Manage your identity and preferences.</p>
                            </div>

                            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-lavender/10 blur-[80px] rounded-full pointer-events-none" />

                                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                    {/* Avatar Column */}
                                    <div className="flex flex-col items-center gap-4">
                                        <div
                                            className="w-32 h-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center overflow-hidden relative group shadow-lg"
                                        >
                                            {profileData.avatarUrl ? (
                                                <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-12 h-12 text-electric-lavender/50" />
                                            )}
                                            {isEditingProfile && (
                                                <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                    <span className="font-mono text-[9px] uppercase tracking-widest text-white mt-1">Upload Image</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                setProfileData({ ...profileData, avatarUrl: imageUrl });
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    {/* Details Column */}
                                    <div className="flex-1 space-y-6">
                                        <div>
                                            <label className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50 block mb-2">Display Name</label>
                                            {isEditingProfile ? (
                                                <input
                                                    type="text"
                                                    value={profileData.displayName}
                                                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                                                    className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 font-sora text-white focus:outline-none focus:border-electric-lavender/50 transition-colors shadow-inner"
                                                />
                                            ) : (
                                                <p className="font-sora text-xl text-white font-semibold">{profileData.displayName || 'Set your display name'}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="font-mono text-[10px] uppercase tracking-widest text-cool-mist/50 block mb-2">Bio / Status</label>
                                            {isEditingProfile ? (
                                                <textarea
                                                    value={profileData.bio}
                                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                    rows={3}
                                                    className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 font-sora text-sm text-cool-mist resize-none focus:outline-none focus:border-electric-lavender/50 transition-colors shadow-inner"
                                                />
                                            ) : (
                                                <p className="font-sora text-sm text-cool-mist/80 leading-relaxed bg-white/[0.03] backdrop-blur-md p-4 rounded-xl border border-white/5">{profileData.bio}</p>
                                            )}
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            {isEditingProfile ? (
                                                <div className="flex gap-3 w-full md:w-auto">
                                                    <button
                                                        onClick={() => setIsEditingProfile(false)}
                                                        className="flex-1 md:flex-none px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-sora font-semibold text-sm rounded-xl transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsEditingProfile(false);
                                                            // In a real app, you would await a Supabase update here
                                                        }}
                                                        className="flex-1 md:flex-none px-6 py-3 bg-electric-lavender text-midnight-blue hover:bg-white font-sora font-semibold text-sm rounded-xl transition-colors shadow-[0_0_20px_rgba(139,125,255,0.3)]"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setIsEditingProfile(true)}
                                                    className="w-full md:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-sora font-semibold text-sm rounded-xl transition-colors"
                                                >
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main >

            {/* MOBILE BOTTOM NAVIGATION */}
            < nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center p-3 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]" >
                <button
                    onClick={() => setActiveTab('check-in')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'check-in' ? 'text-electric-lavender' : 'text-cool-mist/50'}`}
                >
                    <Activity className="w-5 h-5" />
                    <span className="font-mono text-[9px] uppercase tracking-widest mt-1">Check-in</span>
                </button>
                <button
                    onClick={() => setActiveTab('connection')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'connection' ? 'text-electric-lavender' : 'text-cool-mist/50'}`}
                >
                    <Users className="w-5 h-5" />
                    <span className="font-mono text-[9px] uppercase tracking-widest mt-1">Connect</span>
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-electric-lavender' : 'text-cool-mist/50'}`}
                >
                    <History className="w-5 h-5" />
                    <span className="font-mono text-[9px] uppercase tracking-widest mt-1">History</span>
                </button>
            </nav >

        </div >
    );
}
