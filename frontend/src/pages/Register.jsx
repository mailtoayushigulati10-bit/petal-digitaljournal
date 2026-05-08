import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    // 🔌 plug your backend call here:
    // await fetch("/api/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
    localStorage.setItem("petal_user", name);
    navigate("/feed");
  };

  return (
    <main style={{ maxWidth: 420, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div className="card-soft">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.85rem" }}>🌷</div>
          <h1 style={{ marginTop: "0.5rem", fontSize: "1.85rem" }}>join petal</h1>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>start your own little diary</p>
        </div>
        <form onSubmit={onSubmit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input className="input-soft" placeholder="your name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input-soft" type="email" placeholder="your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input-soft" type="password" placeholder="create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn-rose" style={{ width: "100%" }}>create account</button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", textAlign: "center", color: "var(--muted)" }}>
          already a petal? <Link to="/login" style={{ color: "var(--rose)", fontWeight: 600 }}>log in</Link>
        </p>
      </div>
    </main>
  );
}
