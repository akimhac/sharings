import { useState } from "react";

export default function MessagingPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <section className="sg-section">
      <div className="sg-container sg-max-w-xl">
        <h2 className="sg-title-h2">Messagerie</h2>
        <div className="sg-mt-4 sg-border sg-border-black/10 sg-rounded-lg sg-p-4 sg-h-64 sg-overflow-y-auto">
          {messages.length === 0 ? (
            <p>Aucun message.</p>
          ) : (
            messages.map((m, i) => (
              <div key={i} className="sg-mb-2">{m}</div>
            ))
          )}
        </div>
        <div className="sg-mt-4 sg-flex sg-gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Votre message"
            className="sg-flex-1 sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
          />
          <button onClick={handleSend} className="sg-btn-primary">
            Envoyer
          </button>
        </div>
      </div>
    </section>
  );
}
