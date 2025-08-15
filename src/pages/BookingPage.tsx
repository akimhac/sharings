import { useState } from "react";

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [reservation, setReservation] = useState<{ date: string; time: string } | null>(null);
  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return (
    <section className="sg-section">
      <div className="sg-container">
        <h2 className="sg-title-h2">Réserver un siège</h2>
        <div className="sg-mt-4">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
          />
        </div>
        {date && (
          <div className="sg-mt-4 sg-grid sg-grid-cols-2 sm:sg-grid-cols-4 sg-gap-3">
            {times.map(t => (
              <button
                key={t}
                onClick={() => setReservation({ date, time: t })}
                className="sg-btn-primary"
              >
                {t}
              </button>
            ))}
          </div>
        )}
        {reservation && (
          <p className="sg-mt-6">
            Vous avez réservé le {reservation.date} à {reservation.time}.
          </p>
        )}
      </div>
    </section>
  );
}
