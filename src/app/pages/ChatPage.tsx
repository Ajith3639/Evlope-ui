import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Send, Sparkles, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { useApp, InviteData, MoodType } from '@/app/context/AppContext';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import InviteCardCarousel from '@/app/components/InviteCardCarousel';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  inviteVersions?: InviteData[];
}

const LANGUAGES = {
  english: { name: 'English', greeting: 'Join us for', rsvp: 'RSVP Now' },
  spanish: { name: 'Español', greeting: 'Únete a nosotros para', rsvp: 'Confirmar Asistencia' },
  french: { name: 'Français', greeting: 'Rejoignez-nous pour', rsvp: 'Répondre' },
  german: { name: 'Deutsch', greeting: 'Begleiten Sie uns zu', rsvp: 'Zusagen' },
  italian: { name: 'Italiano', greeting: 'Unisciti a noi per', rsvp: 'Conferma' },
  portuguese: { name: 'Português', greeting: 'Junte-se a nós para', rsvp: 'Confirmar Presença' },
  chinese: { name: '中文', greeting: '诚邀您参加', rsvp: '确认出席' },
  japanese: { name: '日本語', greeting: 'ご参加ください', rsvp: '出席を確認' },
  hindi: { name: 'हिन्दी', greeting: 'हमारे साथ शामिल हों', rsvp: 'पुष्टि करें' },
  arabic: { name: 'العربية', greeting: 'انضم إلينا في', rsvp: 'تأكيد الحضور' },
};

export default function ChatPage() {
  const navigate = useNavigate();
  const { saveInvite } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 What is your event about?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mood, setMood] = useState<MoodType>('elegant');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Form state
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [location, setLocation] = useState('');
  const [theme, setTheme] = useState('');
  const [language, setLanguage] = useState<keyof typeof LANGUAGES>('english');
  const [animated, setAnimated] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Show modal after first response
    if (messages.length === 1) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Perfect! Let me help you create an amazing invitation. Please fill in the event details.",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
        setTimeout(() => setShowModal(true), 500);
      }, 1000);
    } else {
      // AI responses based on context
      setTimeout(() => {
        const responses = [
          "That sounds wonderful! Let me suggest some design ideas...",
          "Great choice! I can help make this special.",
          "I love it! The invite will look amazing with that mood.",
          "Perfect! Let me adjust the design to match your vision."
        ];
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const generateInviteVersions = (): InviteData[] => {
    const baseInvite = {
      eventName,
      date: eventDate,
      time: eventTime,
      location,
      theme: theme || messages.find(m => m.sender === 'user')?.text || 'Celebration',
      language,
      animated,
      description: messages.find(m => m.sender === 'user')?.text,
      createdAt: new Date().toISOString(),
    };

    // Generate 3 versions with different moods and styles
    return [
      {
        ...baseInvite,
        id: `${Date.now()}-1`,
        mood: 'elegant' as MoodType,
        copyVariant: 'formal' as const,
      },
      {
        ...baseInvite,
        id: `${Date.now()}-2`,
        mood: 'playful' as MoodType,
        copyVariant: 'fun' as const,
      },
      {
        ...baseInvite,
        id: `${Date.now()}-3`,
        mood: mood,
        copyVariant: 'minimal' as const,
      },
    ];
  };

  const handleGenerate = () => {
    if (!eventName || !eventDate || !eventTime) {
      return;
    }

    setShowModal(false);

    // Show generating message
    setTimeout(() => {
      const generatingMessage: Message = {
        id: Date.now().toString(),
        text: "✨ Generating your invitations... I'm creating 3 beautiful versions for you!",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, generatingMessage]);
      toast.loading('Generating AI-powered invites...', { id: 'generating' });

      // Generate and show invites
      setTimeout(() => {
        const versions = generateInviteVersions();
        const inviteMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Here are your AI-generated invitations! Swipe through the carousel to see all versions. When you find one you love, you can export it.",
          sender: 'ai',
          timestamp: new Date(),
          inviteVersions: versions,
        };
        setMessages(prev => [...prev, inviteMessage]);
        toast.success('3 unique invite designs ready!', { id: 'generating' });
      }, 2000);
    }, 500);
  };

  const handleExport = (invite: InviteData) => {
    saveInvite(invite);
    navigate('/preview', { state: { invite, fromExport: true } });
  };

  return (
    <div className="h-screen relative flex flex-col">
      <AnimatedBackground />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-6 py-4 relative z-10 animate-fade-in-down">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">AI Assistant</h2>
                <p className="text-xs text-gray-500">Creating your invite</p>
              </div>
            </div>
          </div>

      
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 relative z-10">
        <div className="container mx-auto max-w-4xl">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 animate-fade-in-up ${message.sender === 'user' ? 'flex justify-end' : ''}`}
            >
                {message.sender === 'user' ? (
                  <div className="max-w-[80%] rounded-3xl px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="bg-white shadow-lg rounded-3xl px-6 py-4 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">AI Assistant</span>
                      </div>
                      <p className="text-gray-800">{message.text}</p>
                    </div>

                    {/* Invite Carousel */}
                    {message.inviteVersions && (
                      <div className="mt-6 animate-scale-in delay-300">
                        <InviteCardCarousel
                          invites={message.inviteVersions}
                          onExport={handleExport}
                          language={language}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

  
      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-purple-100 px-6 py-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your event or ask for suggestions..."
              className="flex-1 rounded-2xl bg-white border-purple-200 focus:border-purple-400"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
          >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold">Event Details</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowModal(false)}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g., Sarah's Birthday Party"
                    className="mt-2 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., 123 Main St, New York"
                    className="mt-2 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="theme">Theme Preference</Label>
                  <Input
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="e.g., Garden Party, Modern, Vintage"
                    className="mt-2 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="language">Language & Localization</Label>
                  <Select value={language} onValueChange={(val) => setLanguage(val as keyof typeof LANGUAGES)}>
                    <SelectTrigger className="mt-2 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(LANGUAGES).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          {val.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    Invite will be generated in {LANGUAGES[language].name}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animated">Animated Invite</Label>
                    <p className="text-xs text-gray-500 mt-1">Add motion effects</p>
                  </div>
                  <Switch
                    id="animated"
                    checked={animated}
                    onCheckedChange={setAnimated}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!eventName || !eventDate || !eventTime}
                  className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-12"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Invites
                </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}