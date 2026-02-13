import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  ArrowLeft,
  Download,
  Share2,
  Save,
  Calendar,
  Users,
  Bell,
  Mail,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useApp, InviteData } from '@/app/context/AppContext';
import InviteCard from '@/app/components/InviteCard';
import ReminderSetup from '@/app/components/ReminderSetup';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import { toast } from 'sonner';

export default function PreviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveInvite } = useApp();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [rsvpEnabled, setRsvpEnabled] = useState(false);
  const [guestList, setGuestList] = useState<string[]>([]);
  const [newGuest, setNewGuest] = useState('');

  const invite = location.state?.invite as InviteData;
  const fromExport = location.state?.fromExport;

  useEffect(() => {
    if (!invite) {
      navigate('/');
    }
  }, [invite, navigate]);

  if (!invite) {
    return null;
  }

  const handleSave = () => {
    saveInvite(invite);
    toast.success('Invite saved to library!');
  };

  const handleShare = (platform: string) => {
    toast.success(`Opening ${platform}...`);
    setShowShareMenu(false);
  };

  const handleExport = () => {
    toast.success('Exporting invite as PNG/PDF...');
  };

  const handleAddGuest = () => {
    if (newGuest.trim() && !guestList.includes(newGuest.trim())) {
      setGuestList([...guestList, newGuest.trim()]);
      setNewGuest('');
      toast.success('Guest added!');
    }
  };

  const handleEnableRSVP = () => {
    setRsvpEnabled(true);
    toast.success('RSVP tracking enabled!');
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-6 py-4 sticky top-0 z-20 animate-fade-in-down">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/library')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="font-semibold text-gray-800">Manage Your Invite</h2>
              <p className="text-xs text-gray-500">{invite.eventName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSave}
              className="rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              Save to Library
            </Button>
            <Button
              variant="outline"
              onClick={handleExport}
              className="rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <div className="relative">
              <Button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              {showShareMenu && (
                <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-2xl p-3 w-48 border border-purple-100 animate-scale-in">
                  <button
                    onClick={() => handleShare('Email')}
                    className="w-full text-left px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </button>
                  <button
                    onClick={() => handleShare('WhatsApp')}
                    className="w-full text-left px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare('Facebook')}
                    className="w-full text-left px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4 inline mr-2" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('Copy Link')}
                    className="w-full text-left px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Invite</h3>
              <InviteCard
                invite={invite}
                copyVariant={invite.copyVariant}
              />
            </div>
          </div>

          {/* Smart Features Panel */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            {/* RSVP Tracking */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">RSVP Tracking</h4>
                  <p className="text-xs text-gray-500">Manage guest responses</p>
                </div>
              </div>

              {!rsvpEnabled ? (
                <Button
                  onClick={handleEnableRSVP}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Enable RSVP Tracking
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newGuest}
                      onChange={(e) => setNewGuest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddGuest()}
                      placeholder="guest@email.com"
                      className="rounded-xl"
                    />
                    <Button onClick={handleAddGuest} className="rounded-xl">
                      Add
                    </Button>
                  </div>

                  {guestList.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Guest List ({guestList.length})
                      </p>
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {guestList.map((guest, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-xl text-sm"
                          >
                            <span>{guest}</span>
                            <span className="text-xs text-gray-500">Pending</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-xs text-gray-500">Confirmed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{guestList.length}</div>
                      <div className="text-xs text-gray-500">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">0</div>
                      <div className="text-xs text-gray-500">Declined</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Smart Reminders */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Smart Reminders</h4>
                  <p className="text-xs text-gray-500">AI-optimized timing</p>
                </div>
              </div>
              <ReminderSetup inviteId={invite.id} />
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Event Details</h4>
                  <p className="text-xs text-gray-500">Quick reference</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">
                    {new Date(invite.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{invite.time}</span>
                </div>
                {invite.location && (
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-right max-w-[60%]">
                      {invite.location}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium capitalize">{invite.language}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Mood</span>
                  <span className="font-medium capitalize">{invite.mood}</span>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-200">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                Quick Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-xs text-gray-600">Views</div>
                </div>
                <div className="bg-white rounded-2xl p-4">
                  <div className="text-2xl font-bold text-pink-600">0</div>
                  <div className="text-xs text-gray-600">Shares</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
