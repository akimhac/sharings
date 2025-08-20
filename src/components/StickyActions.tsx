import { Link } from "react-router-dom";

 codex/add-background-carousel-and-styling-components
export default function StickyActions(){

export default function StickyActions() {
 main
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-2 flex gap-2">
        <Link to="/signup?role=salon" className="flex-1 btn-primary text-center">Je suis un Salon</Link>
        <Link to="/signup?role=indep" className="flex-1 btn-ghost text-center">Indépendant</Link>
      </div>
    </div>
  );
}
 codex/add-background-carousel-and-styling-components
 main
