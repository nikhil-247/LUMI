import VoiceAssistant from './VoiceAssistant';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  CalendarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import AIChat from './AIChat';
import MedicineReminder from './MedicineReminder';
import PeriodTracker from './PeriodTracker';
import ActivityChart from './ActivityChart';
import PremiumPage from './PremiumPage'; // Import PremiumPage
import Music from './Music'; // Assuming you have a Music component
import Calendar from 'react-calendar';
import Home from './Home';
import Profile from './Profile';
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [date, setDate] = useState(new Date());

  const handleVoiceCommand = (command: string) => {
    // Map voice commands to actions
    if (command.toLowerCase().includes('open chat')) {
      setActiveTab('chat');
    } else if (command.toLowerCase().includes('open music')) {
      setActiveTab('music');
    } else if (command.toLowerCase().includes('open profile')) {
      setActiveTab('profile');
    } else if (command.toLowerCase().includes('open premium')) {
      setActiveTab('premium');
    } else if (command.toLowerCase().includes('dashboard')) {
      setActiveTab('overview');
    } else if (command.toLowerCase().includes('stop listening')) {
      console.log('Stopping voice assistant...');
    } else {
      console.log('Unknown command:', command);
    }
  };

  const navItems = [

    { id: 'home', name: 'Home', icon: HomeIcon },
    { id: 'overview', name: 'Dashboard', icon: HomeIcon },
    { id: 'chat', name: 'AI Chat', icon: ChatBubbleLeftIcon },
    { id: 'medicine', name: 'Medicine', icon: BellIcon },
    { id: 'period', name: 'Period Tracker', icon: CalendarIcon },
    { id: 'music', name: 'Music', icon: UserGroupIcon },
    // { id: 'community', name: 'Community', icon: UserGroupIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
    { id: 'premium', name: 'Premium', icon: ChartBarIcon }, // Add Premium tab
    { id: 'profile', name: 'Profile', icon: UserGroupIcon },

  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <AIChat />;
      case 'medicine':
        return <MedicineReminder />;
      case 'period':
        return <PeriodTracker />;
      case 'premium': // Handle Premium tab
        return <PremiumPage />;
      case 'music':
        return <Music />;
      case 'settings':
        return <div className="text-gray-600">Settings Page</div>;
      case 'community':
        return <div className="text-gray-600">Community Page</div>;
      case 'profile':
        return <Profile />;
      case 'home':
        return <Home />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card col-span-2"
            >
              <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
              <ActivityChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-xl font-semibold mb-4">Calendar</h2>
              <Calendar
                onChange={(value) => value && setDate(value as Date)}
                value={date}
                className="w-full border-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mood Today</span>
                  <span className="text-primary font-semibold">Great 😊</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Medicine Taken</span>
                  <span className="text-green-500 font-semibold">3/4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Period</span>
                  <span className="text-primary font-semibold">In 12 days</span>
                </div>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="sidebar w-64 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <img src="/lumi-logo.svg" alt="Lumi" className="w-8 h-8" />
          <h1 className="text-white text-xl font-bold">Lumi</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-white text-sm mb-2">Download our mobile app</p>
            <button className="btn-primary w-full">Get App</button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, Taylor
            </h1>
            <p className="text-gray-500">Track your wellness journey</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-primary" onClick={() => setActiveTab('premium')}>
              Premium
            </button>
            <img
              src="https://ui-avatars.com/api/?name=Taylor&background=8B5CF6&color=fff"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {renderContent()}

        {/* Add the Voice Assistant */}
        <VoiceAssistant onCommand={handleVoiceCommand} />
      </main>
    </div>
  );
};

export default Dashboard;