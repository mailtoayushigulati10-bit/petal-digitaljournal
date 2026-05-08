import { Link } from "react-router-dom";

export default function Landing() {
  const features = [
    { e: "📸", t: "tiny snapshots", d: "save the photos that feel like sunshine." },
    { e: "🎶", t: "your soundtrack", d: "pin the songs that played in those moments." },
    { e: "💌", t: "soft thoughts", d: "write little notes only you will read." },
  ];
  return (
    <main style={{ maxWidth: 1024, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <span className="tag-pill">🌷 a soft little corner of the internet</span>
        <h1 style={{ marginTop: "1.5rem", fontSize: "3.25rem", lineHeight: 1.1 }}>
          keep the moments<br />
          <em style={{ color: "var(--rose)" }}>that made you smile.</em>
        </h1>
        <p style={{ marginTop: "1.25rem", fontSize: "1.05rem", color: "var(--muted)" }}>
          petal is your private memory diary — photos, thoughts, and the songs
          that played in the background. all yours, all gentle. 🌷
        </p>
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link to="/register" className="btn-rose">start your diary</Link>
          <Link to="/login" className="btn-ghost">i already have one</Link>
        </div>
      </div>

      <div style={{
        marginTop: "5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.25rem",
      }}>
        {features.map((f) => (
          <div key={f.t} className="card-soft" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.85rem" }}>{f.e}</div>
            <h3 style={{ marginTop: "0.75rem", fontSize: "1.25rem" }}>{f.t}</h3>
            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>{f.d}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
