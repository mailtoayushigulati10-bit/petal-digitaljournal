import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function getSpotifyEmbed(url) {
  if (!url) return null;
  const m = url.match(/spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}` : null;
}

export default function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("petal_user");
    if (!u) { navigate("/login"); return; }
    setUser(u);
    // 🔌 replace with your API: fetch("/api/posts").then(r => r.json()).then(setPosts);
    setPosts(JSON.parse(localStorage.getItem("petal_posts") || "[]"));
  }, [navigate]);

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <span className="tag-pill">🌼 today's petals</span>
          <h1 style={{ marginTop: "0.5rem", fontSize: "1.85rem" }}>hi {user} 🌸</h1>
        </div>
        <Link to="/create" className="btn-rose">+ new memory</Link>
      </div>

      {posts.length === 0 ? (
        <div className="card-soft" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
          <div style={{ fontSize: "2.25rem" }}>🌼</div>
          <p style={{ marginTop: "0.75rem", color: "var(--muted)" }}>no petals yet — plant your first memory.</p>
          <Link to="/create" className="btn-rose" style={{ marginTop: "1.25rem", display: "inline-block" }}>create a post</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {posts.map((p) => {
            const embed = getSpotifyEmbed(p.song);
            return (
              <article key={p.id} className="card-soft">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "var(--blush)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)",
                  }}>
                    {p.author?.[0]?.toUpperCase() || "P"}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{p.author}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {p.image && (
                  <img src={p.image} alt={p.caption} style={{
                    width: "100%", borderRadius: "0.75rem",
                    objectFit: "cover", maxHeight: 420,
                  }} />
                )}
                {p.caption && <p style={{ marginTop: "0.75rem", color: "var(--ink)" }}>{p.caption}</p>}
                {embed && (
                  <iframe src={embed} title="song" height="80"
                    style={{ marginTop: "0.75rem", width: "100%", borderRadius: "0.75rem", border: 0 }}
                    allow="encrypted-media" />
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
