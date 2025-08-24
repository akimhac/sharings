export default function TechGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-32 left-1/2 h-[48rem] w-[48rem] -translate-x-1/2 blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(35% 35% at 50% 50%, #60a5fa 0%, rgba(96,165,250,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[-12rem] right-[-12rem] h-[36rem] w-[36rem] blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, #a78bfa 0%, rgba(167,139,250,0) 70%)",
        }}
      />
      <div
        className="absolute top-[30%] left-[-10rem] h-[28rem] w-[28rem] blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, #f472b6 0%, rgba(244,114,182,0) 70%)",
        }}
      />
    </div>
  );
}
