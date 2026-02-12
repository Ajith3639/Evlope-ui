export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-orb-1" />
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-pink-300 rounded-full blur-3xl animate-orb-2" />
      <div className="absolute bottom-20 left-1/3 w-[450px] h-[450px] bg-blue-300 rounded-full blur-3xl animate-orb-3" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-cyan-300 rounded-full blur-3xl animate-orb-4" />
    </div>
  );
}
