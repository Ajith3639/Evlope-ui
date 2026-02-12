import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Save, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { InviteData } from '@/app/context/AppContext';
import InviteCard from '@/app/components/InviteCard';
import { toast } from 'sonner';

interface InviteCardCarouselProps {
  invites: InviteData[];
  onExport: (invite: InviteData) => void;
  language: string;
}

export default function InviteCardCarousel({ invites, onExport, language }: InviteCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? invites.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === invites.length - 1 ? 0 : prev + 1));
  };

  const handleShare = () => {
    toast.success('Opening share options...');
  };

  const currentInvite = invites[currentIndex];

  return (
    <div className="relative">
      {/* Version badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {invites.map((invite, idx) => (
            <button
              key={invite.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                idx === currentIndex
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-300'
              }`}
            >
              Version {idx + 1}
              <span className="ml-2 text-xs opacity-80 capitalize">
                ({invite.copyVariant || invite.mood})
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Sparkles className="w-4 h-4" />
          <span>AI Generated</span>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 rounded-3xl p-8">
        {/* Navigation Buttons */}
        <Button
          onClick={handlePrevious}
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-xl hover:bg-gray-50 w-12 h-12"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </Button>
        <Button
          onClick={handleNext}
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-xl hover:bg-gray-50 w-12 h-12"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </Button>

        {/* Card Display */}
        <div className="flex justify-center items-center min-h-[600px] overflow-hidden">
          <div 
            key={currentIndex}
            className={`w-full flex justify-center transition-all duration-300 ${
              direction > 0 ? 'animate-slide-in-right' : direction < 0 ? 'animate-slide-in-left' : 'animate-scale-in'
            }`}
          >
            <InviteCard
              invite={currentInvite}
              copyVariant={currentInvite.copyVariant}
            />
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {invites.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`transition-all rounded-full ${
                idx === currentIndex
                  ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center animate-fade-in-up delay-500">
        <Button
          onClick={() => onExport(currentInvite)}
          size="lg"
          className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8"
        >
          <Download className="w-5 h-5 mr-2" />
          Export & Continue
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          size="lg"
          className="rounded-2xl"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
      </div>

      {/* Info Text */}
      <div className="mt-6 text-center animate-fade-in delay-700">
        <p className="text-sm text-gray-600">
          💡 Export your favorite version to access RSVP tracking, smart reminders, and more features!
        </p>
      </div>
    </div>
  );
}
