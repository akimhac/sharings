import { useState } from "react";

export default function ContractPage() {
  const [salon, setSalon] = useState("");
  const [pro, setPro] = useState("");
  const [date, setDate] = useState("");
  const [contract, setContract] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setContract(
      `Contrat de réservation entre ${salon} et ${pro} pour le ${date}.\nLe professionnel s'engage à respecter les conditions du salon.`
    );
  };

  return (
    <section className="sg-section">
      <div className="sg-container sg-max-w-xl">
        <h2 className="sg-title-h2">Création de contrat</h2>
        <form onSubmit={handleGenerate} className="sg-mt-4 sg-flex sg-flex-col sg-gap-4">
          <input
            required
            placeholder="Nom du salon"
            value={salon}
            onChange={e => setSalon(e.target.value)}
            className="sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
          />
          <input
            required
            placeholder="Nom du professionnel"
            value={pro}
            onChange={e => setPro(e.target.value)}
            className="sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
          />
          <input
            type="date"
            required
            value={date}
            onChange={e => setDate(e.target.value)}
            className="sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
          />
          <button type="submit" className="sg-btn-primary">
            Générer le contrat
          </button>
        </form>
        {contract && (
          <pre className="sg-mt-6 sg-whitespace-pre-wrap sg-rounded-lg sg-border sg-border-black/10 sg-p-4">
            {contract}
          </pre>
        )}
      </div>
    </section>
  );
}
