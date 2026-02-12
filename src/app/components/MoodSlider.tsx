import { MoodType } from '@/app/context/AppContext';

interface MoodSliderProps {
  value: MoodType;
  onChange: (mood: MoodType) => void;
}

const moods: { value: MoodType; label: string; color: string }[] = [
  { value: 'casual', label: 'Casual', color: 'from-blue-400 to-cyan-400' },
  { value: 'elegant', label: 'Elegant', color: 'from-purple-400 to-pink-400' },
  { value: 'luxurious', label: 'Luxurious', color: 'from-yellow-400 to-orange-400' },
  { value: 'playful', label: 'Playful', color: 'from-green-400 to-teal-400' },
];

export default function MoodSlider({ value, onChange }: MoodSliderProps) {
  const currentIndex = moods.findIndex(m => m.value === value);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Mood</span>
        <span className="font-medium text-gray-800">{moods[currentIndex].label}</span>
      </div>
      
      <div className="relative">
        <div className="flex gap-2">
          {moods.map((mood, index) => (
            <button
              key={mood.value}
              onClick={() => onChange(mood.value)}
              className="flex-1 relative group"
            >
              <div
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? `bg-gradient-to-r ${mood.color}`
                    : 'bg-gray-200'
                }`}
              />
              <div
                className={`absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${mood.color} shadow-lg transition-all ${
                  index === currentIndex ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
