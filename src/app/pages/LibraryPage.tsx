import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Sparkles, Copy, Trash2, Share2, Edit, Film, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useApp } from '@/app/context/AppContext';
import { toast } from 'sonner';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function LibraryPage() {
  const navigate = useNavigate();
  const { invites, deleteInvite, setCurrentInvite } = useApp();

  const handleEdit = (invite: any) => {
    setCurrentInvite(invite);
    navigate('/preview', { state: { invite, fromExport: true } });
  };

  const handleDuplicate = (invite: any) => {
    const duplicate = {
      ...invite,
      id: Date.now().toString(),
      eventName: `${invite.eventName} (Copy)`,
      createdAt: new Date().toISOString(),
    };
    setCurrentInvite(duplicate);
    navigate('/preview', { state: { invite: duplicate, fromExport: true } });
  };

  const handleDelete = (id: string) => {
    deleteInvite(id);
    toast.success('Invite deleted');
  };

  const handleShare = () => {
    toast.success('Opening share options...');
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-6 py-4 sticky top-0 z-10"
      >
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
                <h2 className="font-semibold text-gray-800">My Library</h2>
                <p className="text-xs text-gray-500">{invites.length} saved invites</p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate('/chat')}
            className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New
          </Button>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8">
        {invites.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center mb-6"
            >
              <Sparkles className="w-16 h-16 text-purple-500" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Invites Yet</h3>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Start creating beautiful invitations with AI. Your saved designs will appear here.
            </p>
            <Button
              onClick={() => navigate('/chat')}
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Invite
            </Button>
          </motion.div>
        ) : (
          /* Grid of Invites */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {invites.map((invite, index) => (
                <motion.div
                  key={invite.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[2/3] bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
                    {/* Mini preview */}
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          {invite.animated ? (
                            <div className="px-3 py-1 bg-purple-500 text-white text-xs rounded-full flex items-center gap-1">
                              <Film className="w-3 h-3" />
                              Animated
                            </div>
                          ) : (
                            <div className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" />
                              Static
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{invite.eventName}</h3>
                        <p className="text-sm text-gray-600 mb-1">{new Date(invite.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{invite.theme}</p>
                      </div>

                      {/* Mood indicator */}
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs capitalize">
                          {invite.mood}
                        </div>
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Button
                        size="icon"
                        onClick={() => handleEdit(invite)}
                        className="rounded-full bg-white text-gray-800 hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => handleDuplicate(invite)}
                        className="rounded-full bg-white text-gray-800 hover:bg-gray-100"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={handleShare}
                        className="rounded-full bg-white text-gray-800 hover:bg-gray-100"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => handleDelete(invite.id)}
                        className="rounded-full bg-red-500 text-white hover:bg-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Created {new Date(invite.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}