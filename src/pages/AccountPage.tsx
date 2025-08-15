import PreferencesForm from "../features/preferences/PreferencesForm";
import Navbar from "../components/Navbar";

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container-page">
          <h1 className="title-h2">Mon compte</h1>
          <p className="text-white/80 mt-2">Gérez vos préférences et vos alertes.</p>
          <div className="mt-6 grid gap-6">
            <PreferencesForm />
          </div>
        </div>
      </section>
    </>
  );
}
