import { ReactNode } from "react";

export default function FeatureCard({icon, title, children}:{icon:ReactNode; title:string; children:ReactNode;}){
  return (
    <div className="card hover:shadow-xl transition">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-white/80">{children}</p>
    </div>
  );
}
