import { ReactNode } from "react";

 codex/add-background-carousel-and-styling-components
export default function FeatureCard({icon, title, children}:{icon:ReactNode; title:string; children:ReactNode;}){

export default function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
 main
  return (
    <div className="card hover:shadow-xl transition">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-white/80">{children}</p>
    </div>
  );
}
 codex/add-background-carousel-and-styling-components


 main
