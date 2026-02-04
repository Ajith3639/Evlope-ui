import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sparkles, MessageSquare, Bell, Share2, Wand2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wand2,
      title: 'AI-Generated Themes',
      description: 'Beautiful invite designs created by AI in seconds',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      icon: MessageSquare,
      title: 'Chat-Based Creation',
      description: 'Natural conversation to build your perfect invite',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Bell,
      title: 'Smart Reminders & RSVP',
      description: 'Automated follow-ups and guest management',
      gradient: 'from-orange-400 to-yellow-400'
    },
    {
      icon: Share2,
      title: 'One-Click Sharing',
      description: 'Share via email, WhatsApp, or social media instantly',
      gradient: 'from-green-400 to-teal-400'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-6 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            InviteAI
          </span>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate('/library')}
          className="hover:bg-white/50"
        >
          My Library
        </Button>
      </motion.header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Create Stunning Invitations
            </span>
            <br />
            <span className="text-gray-800">with AI in Seconds</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Design beautiful, personalized invitations through AI-powered chat.
            Smart reminders, easy RSVP tracking, and instant sharing—all in one magical experience.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg rounded-2xl shadow-2xl shadow-purple-500/30 h-auto"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Your Invite
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer removed - AnimatedBackground handles decorative elements */}
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-sm text-gray-500 relative z-10">
        <p>© 2026 InviteAI. Create magical moments with AI-powered invitations.</p>
      </footer>
    </div>
  );
}