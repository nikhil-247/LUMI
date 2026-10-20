import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const motivationalQuotes = [
  "You are enough.🩷",
  "It’s okay to rest.☘",
  "You are growing beautifully.🌸",
  "Take a deep breath. You’re doing great.🌺",
  "Self love is a daily journey.🌹"
];

const todaysPlan = [
  "✨ Meditate for 5 minutes",
  "📓 Write down 3 things you're grateful for",
  "🚶‍♀ Take a 10-minute walk",
  "💧 Drink a glass of water",
  "📖 Read one page of a book you like"
];

export default function SelfLoveLandingPage() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "🎶 New calming track added: ‘Sunset Breaths’" },
    { id: 2, message: "💬 Say hi to your Supportive Friend Chatbot" },
    { id: 3, message: "📝 Your Self Love Plan for today is ready!" }
  ]);
  const [journalEntries, setJournalEntries] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalText, setJournalText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleJournalSave = () => {
    const content = journalText.trim();
    if (!content) return;
    setJournalEntries((prev) => ({
      ...prev,
      [selectedDate.toDateString()]: content,
    }));
  };

  const handleJournalDateChange = (value: Date | null | (Date | null)[]) => {
    if (!(value instanceof Date)) return;
    setSelectedDate(value);
    setJournalText(journalEntries[value.toDateString()] ?? '');
  };

  const isJournaledDate = (date: Date) => {
    return Object.prototype.hasOwnProperty.call(journalEntries, date.toDateString());
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 text-gray-800 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-purple-600">Self Love</h1>
        <nav className="space-x-6 text-sm">
          <a href="#features">Features</a>
          <a href="#journal">Journal</a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <motion.h2
          className="text-4xl font-semibold text-purple-700 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Self Love Project 🩷
        </motion.h2>
        <p className="text-xl italic mb-6">"You deserve love — from the world and from yourself."</p>
        <motion.div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow-md mb-6" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
          <p className="text-lg text-gray-600">{motivationalQuotes[currentQuote]}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {['🎵 Music', '📖 Stories', '🤖 Chatbot', '🌿 Self Love Plan'].map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-lg font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <div className="fixed top-20 right-4 space-y-2 z-50">
        {notifications.map((note) => (
          <motion.div
            key={note.id}
            className="bg-white shadow-lg rounded-lg p-4 w-80 flex flex-col"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-700 font-medium mb-2">{note.message}</p>
              <button onClick={() => removeNotification(note.id)} className="text-gray-400 hover:text-red-500 ml-2">✕</button>
            </div>
            {note.id === 3 && (
              <ul className="text-sm text-gray-600 list-disc list-inside mt-2 space-y-1">
                {todaysPlan.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating Stickers
      <div className="fixed left-4 bottom-20 flex flex-col space-y-4 z-40">
        <motion.div className="text-3xl animate-bounce">💖</motion.div>
        <motion.div className="text-3xl animate-pulse delay-1000">🌸</motion.div>
        <motion.div className="text-3xl animate-spin-slow">🌿</motion.div>
      </div> */}

      {/* Features Section */}
      <section id="features" className="px-6 py-16 bg-purple-50">
        <h3 className="text-3xl font-semibold text-center text-purple-700 mb-10">Explore Our Features</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[{ title: "Music Library", desc: "Relaxing, curated tracks for every mood." },
            { title: "Healing Stories", desc: "Real, comforting stories to lift your spirit." },
            { title: "Supportive Chatbot", desc: "Talk, vent, and feel heard anytime." },
            { title: "Daily Plan", desc: "A unique set of gentle tasks just for you." }].map((feat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <h4 className="text-xl font-medium text-purple-600 mb-2">{feat.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{feat.desc}</p>
              <div className="bg-blue-50 p-2 rounded-md inline-block">
                <button className="text-sm text-blue-500 underline">Go to {feat.title}</button>
              </div>
            </div>
          ))}
        </div>

        {/* Self-Care Tips Horizontal Scroller */}
        <div className="mt-12 overflow-x-auto whitespace-nowrap space-x-4 px-2 flex">
          {["🌞 Sit in the sun for 5 mins", "☕ Sip your favorite drink", "📱 Unplug from your phone", "🌳 Go touch grass!"].map((tip, i) => (
            <div key={i} className="inline-block bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded-lg shadow min-w-[250px]">
              <p className="text-sm font-medium">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Journal */}
      <section id="journal" className="px-6 py-16 bg-white">
        <h3 className="text-3xl font-semibold text-center text-purple-700 mb-6">Your Personal Journal</h3>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <textarea
              rows={8}
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Write anything you want here..."
              className="w-full p-4 rounded-xl border border-purple-200 shadow focus:outline-none focus:ring-2 focus:ring-purple-300"
            ></textarea>
            <button onClick={handleJournalSave} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600">Save Entry</button>
            <p className="text-xs text-gray-500 mt-2">Entries are kept in page memory only and are lost when you refresh or leave this page. They are not synced to an account.</p>
          </div>
          <div className="w-full md:w-1/3">
            <Calendar
              onChange={handleJournalDateChange}
              value={selectedDate}
              tileClassName={({ date }) =>
                isJournaledDate(date) ? 'bg-purple-200 rounded-full' : null
              }
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-16 bg-purple-50">
        <motion.h3
          className="text-3xl font-semibold text-center text-purple-700 mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          💕 About Self Love 💕
        </motion.h3>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-lg text-gray-700 mb-4">
            🌸 Self Love is an inclusive AI-powered wellness platform made for everyone. We help you prioritize your mental and emotional well-being 🌈
            through thoughtful features like supportive chatbots, relaxing music, personalized plans, and more.
          </p>
          <p className="text-md text-gray-600">
            💌 Whether you're feeling anxious, unmotivated, or just need a friendly nudge, Self Love is your go-to space for care, reflection, and gentle empowerment. 🌿
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-purple-100 text-purple-800">
        <p>Made with love by Team SelfLove 💜</p>
      </footer>
    </motion.div>
  );
}