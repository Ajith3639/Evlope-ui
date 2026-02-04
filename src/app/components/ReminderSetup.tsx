import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Clock, MessageSquare, X, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { toast } from 'sonner';

interface ReminderSchedule {
  enabled: boolean;
  timing: string;
  message: string;
  autoFollowUp: boolean;
}

interface ReminderSetupProps {
  inviteId?: string;
  onSetup?: () => void;
}

export default function ReminderSetup({ inviteId, onSetup }: ReminderSetupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [schedule, setSchedule] = useState<ReminderSchedule>({
    enabled: true,
    timing: '1-week',
    message: 'auto',
    autoFollowUp: true,
  });

  const handleSave = () => {
    toast.success('Reminder schedule saved!');
    setIsOpen(false);
    if (onSetup) {
      onSetup();
    }
  };

  const aiSuggestedMessages = {
    '1-week': "Just a friendly reminder - we'd love to see you next week!",
    '3-days': "The big day is almost here! Hope you can make it! 🎉",
    '1-day': "Tomorrow's the day! Can't wait to see you there!",
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start rounded-xl"
      >
        <Bell className="w-4 h-4 mr-2" />
        Smart Reminders
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Smart Reminders</h3>
                    <p className="text-sm text-gray-500">AI-optimized timing</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enabled">Enable Reminders</Label>
                  <Switch
                    id="enabled"
                    checked={schedule.enabled}
                    onCheckedChange={(enabled) => setSchedule({ ...schedule, enabled })}
                  />
                </div>

                {schedule.enabled && (
                  <>
                    <div>
                      <Label htmlFor="timing">Send Reminder</Label>
                      <Select
                        value={schedule.timing}
                        onValueChange={(timing) => setSchedule({ ...schedule, timing })}
                      >
                        <SelectTrigger className="mt-2 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-week">1 week before</SelectItem>
                          <SelectItem value="3-days">3 days before</SelectItem>
                          <SelectItem value="1-day">1 day before</SelectItem>
                          <SelectItem value="custom">Custom timing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 mb-1">AI-Generated Message</p>
                          <p className="text-sm text-gray-700 italic">
                            "{aiSuggestedMessages[schedule.timing as keyof typeof aiSuggestedMessages]}"
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toast.success('Message customized!')}
                        className="text-xs text-purple-600 hover:text-purple-700 font-medium mt-2"
                      >
                        Customize message
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoFollowUp">Auto Follow-ups</Label>
                        <p className="text-xs text-gray-500 mt-1">For non-responders</p>
                      </div>
                      <Switch
                        id="autoFollowUp"
                        checked={schedule.autoFollowUp}
                        onCheckedChange={(autoFollowUp) => setSchedule({ ...schedule, autoFollowUp })}
                      />
                    </div>

                    <div className="bg-green-50 rounded-2xl p-4">
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 mb-1">Post-Event Thank You</p>
                          <p className="text-xs text-gray-600">
                            Automatically send thank you messages after the event
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 h-12"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Save Reminder Schedule
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}