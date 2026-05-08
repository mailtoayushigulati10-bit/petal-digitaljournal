import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CreatePost() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [song, setSong] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("petal_user");
    if (!u) navigate("/login");
    else setUser(u);
  }, [navigate]);

  const onFile = (f) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result);
    r.readAsDataURL(f);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image && !caption) return;
    // 🔌 plug your backend: POST /api/posts with FormData (image file, caption, song)
    const posts = JSON.parse(localStorage.getItem("petal_posts") || "[]");
    posts.unshift({
      id: crypto.randomUUID(),
      image, caption, song,
      createdAt: Date.now(),
      author: user || "petal",
    });
    localStorage.setItem("petal_posts", JSON.stringify(posts));
    navigate("/feed");
  };

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div className="card-soft">
        <h1 style={{ fontSize: "1.85rem" }}>a new little memory 🌸</h1>
        <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>add a photo, a caption, and the song that played.</p>

        <form onSubmit={onSubmit} style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label style={{ display: "block" }}>
            <div style={{
              border: "2px dashed var(--border)",
              borderRadius: "1rem", padding: "1.5rem",
              textAlign: "center", cursor: "pointer",
            }}>
              {image ? (
                <img src={image} alt="preview" style={{ margin: "0 auto", maxHeight: 240, borderRadius: "0.75rem" }} />
              ) : (
                <>
                  <div style={{ fontSize: "1.85rem" }}>📸</div>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>click to upload a photo</p>
                </>
              )}
              <input type="file" accept="image/*" style={{ display: "none" }}
                onChange={(e) => onFile(e.target.files?.[0])} />
            </div>
          </label>

          <textarea
            placeholder="write a soft little caption..."
            value={caption} onChange={(e) => setCaption(e.target.value)}
            rows={3}
            style={{
              width: "100%", background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "1rem", padding: "0.75rem 1.25rem",
              fontFamily: "inherit", color: "var(--ink)",
              outline: "none", resize: "vertical", boxSizing: "border-box",
            }}
          />

          <input className="input-soft" placeholder="paste a Spotify link 🎶 (optional)"
            value={song} onChange={(e) => setSong(e.target.value)} />

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => navigate("/feed")} className="btn-ghost">cancel</button>
            <button type="submit" className="btn-rose">save memory</button>
          </div>
        </form>
      </div>
    </main>
  );
}
