import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { InviteData } from '@/app/context/AppContext';
import { Button } from '@/app/components/ui/button';

interface InviteCardProps {
  invite: InviteData;
  copyVariant?: 'formal' | 'fun' | 'minimal';
  customColor?: string;
  onClick?: () => void;
}

const LANGUAGE_CONTENT = {
  english: {
    invitedTo: { formal: 'You are cordially invited to', fun: "Let's celebrate!", minimal: 'Join us for' },
    date: 'Date',
    time: 'Time',
    location: 'Location',
    rsvp: { formal: 'RSVP Now', fun: 'Count me in! 🎉', minimal: 'Confirm' },
    addToCalendar: 'Add to Calendar',
    createdWith: 'Created with InviteAI ✨',
  },
  spanish: {
    invitedTo: { formal: 'Está cordialmente invitado a', fun: '¡Celebremos!', minimal: 'Únete a nosotros para' },
    date: 'Fecha',
    time: 'Hora',
    location: 'Ubicación',
    rsvp: { formal: 'Confirmar Asistencia', fun: '¡Cuenten conmigo! 🎉', minimal: 'Confirmar' },
    addToCalendar: 'Agregar al Calendario',
    createdWith: 'Creado con InviteAI ✨',
  },
  french: {
    invitedTo: { formal: 'Vous êtes cordialement invité à', fun: 'Célébrons ensemble!', minimal: 'Rejoignez-nous pour' },
    date: 'Date',
    time: 'Heure',
    location: 'Lieu',
    rsvp: { formal: 'Répondre', fun: 'Je serai là! 🎉', minimal: 'Confirmer' },
    addToCalendar: 'Ajouter au Calendrier',
    createdWith: 'Créé avec InviteAI ✨',
  },
  german: {
    invitedTo: { formal: 'Sie sind herzlich eingeladen zu', fun: 'Lasst uns feiern!', minimal: 'Begleiten Sie uns zu' },
    date: 'Datum',
    time: 'Uhrzeit',
    location: 'Ort',
    rsvp: { formal: 'Zusagen', fun: 'Ich bin dabei! 🎉', minimal: 'Bestätigen' },
    addToCalendar: 'Zum Kalender hinzufügen',
    createdWith: 'Erstellt mit InviteAI ✨',
  },
  italian: {
    invitedTo: { formal: 'Siete cordialmente invitati a', fun: 'Festeggiamo insieme!', minimal: 'Unisciti a noi per' },
    date: 'Data',
    time: 'Ora',
    location: 'Luogo',
    rsvp: { formal: 'Conferma', fun: 'Ci sarò! 🎉', minimal: 'Confermare' },
    addToCalendar: 'Aggiungi al Calendario',
    createdWith: 'Creato con InviteAI ✨',
  },
  portuguese: {
    invitedTo: { formal: 'Você está cordialmente convidado para', fun: 'Vamos celebrar!', minimal: 'Junte-se a nós para' },
    date: 'Data',
    time: 'Hora',
    location: 'Local',
    rsvp: { formal: 'Confirmar Presença', fun: 'Estarei lá! 🎉', minimal: 'Confirmar' },
    addToCalendar: 'Adicionar ao Calendário',
    createdWith: 'Criado com InviteAI ✨',
  },
  chinese: {
    invitedTo: { formal: '诚邀您参加', fun: '让我们一起庆祝！', minimal: '加入我们' },
    date: '日期',
    time: '时间',
    location: '地点',
    rsvp: { formal: '确认出席', fun: '我会去！🎉', minimal: '确认' },
    addToCalendar: '添加到日历',
    createdWith: '由 InviteAI 创建 ✨',
  },
  japanese: {
    invitedTo: { formal: 'ご招待いたします', fun: '一緒にお祝いしましょう！', minimal: 'ご参加ください' },
    date: '日付',
    time: '時間',
    location: '場所',
    rsvp: { formal: '出席を確認', fun: '参加します！🎉', minimal: '確認' },
    addToCalendar: 'カレンダーに追加',
    createdWith: 'InviteAI で作成 ✨',
  },
  hindi: {
    invitedTo: { formal: 'आप सादर आमंत्रित हैं', fun: 'आइए मनाएं!', minimal: 'हमारे साथ शामिल हों' },
    date: 'तारीख',
    time: 'समय',
    location: 'स्थान',
    rsvp: { formal: 'पुष्टि करें', fun: 'मैं आऊंगा! 🎉', minimal: 'पुष्टि' },
    addToCalendar: 'कैलेंडर में जोड़ें',
    createdWith: 'InviteAI के साथ बनाया गया ✨',
  },
  arabic: {
    invitedTo: { formal: 'أنت مدعو بكل سرور إلى', fun: 'دعونا نحتفل!', minimal: 'انضم إلينا في' },
    date: 'التاريخ',
    time: 'الوقت',
    location: 'الموقع',
    rsvp: { formal: 'تأكيد الحضور', fun: 'سأكون هناك! 🎉', minimal: 'تأكيد' },
    addToCalendar: 'إضافة إلى التقويم',
    createdWith: 'تم الإنشاء باستخدام InviteAI ✨',
  },
};

const getMoodGradient = (mood: string) => {
  switch (mood) {
    case 'casual':
      return 'from-blue-400 to-cyan-400';
    case 'elegant':
      return 'from-purple-400 to-pink-400';
    case 'luxurious':
      return 'from-yellow-400 to-orange-400';
    case 'playful':
      return 'from-green-400 to-teal-400';
    default:
      return 'from-purple-400 to-pink-400';
  }
};

export default function InviteCard({ invite, copyVariant = 'formal', customColor, onClick }: InviteCardProps) {
  const gradient = getMoodGradient(invite.mood);
  const lang = invite.language && invite.language in LANGUAGE_CONTENT 
    ? LANGUAGE_CONTENT[invite.language as keyof typeof LANGUAGE_CONTENT]
    : LANGUAGE_CONTENT.english;
  const variant = copyVariant || 'formal';
  
  const title = lang.invitedTo[variant as keyof typeof lang.invitedTo] || lang.invitedTo.formal;
  const rsvpText = lang.rsvp[variant as keyof typeof lang.rsvp] || lang.rsvp.formal;

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transition-all animate-scale-in ${onClick ? 'cursor-pointer hover-scale' : ''}`}
      style={{ aspectRatio: '2/3', maxWidth: '400px' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Top Gradient Bar */}
      <div className={`h-3 bg-gradient-to-r ${gradient}`} />

      {invite.animated && (
        <div className="absolute top-8 right-8 z-10 animate-pulse-slow">
          <div className="animate-rotate">
            <Sparkles className="w-8 h-8 text-purple-400 opacity-60" />
          </div>
        </div>
      )}

      <div className="p-8 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="animate-fade-in-up delay-200">
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">{title}</p>
            <h2 className="text-3xl font-bold mb-2" style={{ color: customColor || '#8b5cf6' }}>
              {invite.eventName}
            </h2>
            {invite.theme && (
              <p className="text-gray-600 italic">{invite.theme}</p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 flex-1 animate-fade-in delay-400">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{lang.date}</p>
              <p className="font-medium text-gray-800">
                {new Date(invite.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{lang.time}</p>
              <p className="font-medium text-gray-800">{invite.time}</p>
            </div>
          </div>

          {invite.location && (
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{lang.location}</p>
                <p className="font-medium text-gray-800">{invite.location}</p>
              </div>
            </div>
          )}

          {invite.description && (
            <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-700 italic">"{invite.description}"</p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-8 space-y-3 animate-fade-in-up delay-600">
          <Button
            className={`w-full rounded-2xl bg-gradient-to-r ${gradient} hover:opacity-90 text-white h-12`}
          >
            {rsvpText}
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-2xl"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {lang.addToCalendar}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>{lang.createdWith}</p>
        </div>
      </div>
    </div>
  );
}