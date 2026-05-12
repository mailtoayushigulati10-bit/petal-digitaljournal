import {

  Link,

  useNavigate

} from "react-router-dom";

import {

  useEffect,

  useState

} from "react";

import API from "../services/api";

function getSpotifyEmbed(url) {

  if (!url) return null;

  const match = url.match(
    /spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/
  );

  return match

    ? `https://open.spotify.com/embed/${match[1]}/${match[2]}`

    : null;

}

export default function Feed() {

  const navigate =
    useNavigate();

  const [posts, setPosts] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const [editingId, setEditingId] =
    useState(null);

  const [editedCaption,
    setEditedCaption] =
    useState("");

  // FETCH POSTS

  const fetchPosts = async () => {

    try {

      const res =
        await API.get("/posts");

      setPosts(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // CHECK LOGIN

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      navigate("/login");

      return;

    }

    const parsedUser =
      JSON.parse(storedUser);

    setUser(parsedUser);

    fetchPosts();

  }, [navigate]);

  // DELETE POST

  const deletePost = async(id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(

        `/posts/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      fetchPosts();

    } catch (err) {

      console.log(err);

      alert("Delete failed");

    }

  };

  // UPDATE POST

  const updatePost = async(id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.put(

        `/posts/${id}`,

        {
          caption: editedCaption
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      setEditingId(null);

      fetchPosts();

    } catch (err) {

      console.log(err);

      alert("Update failed");

    }

  };

  return (

    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "2.5rem 1.5rem"
      }}
    >

      {/* TOP */}

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "1.5rem"
        }}
      >

        <div>

          <span className="tag-pill">
            🌼 today's petals
          </span>

          <h1
            style={{
              marginTop: "0.5rem",
              fontSize: "1.85rem"
            }}
          >

            hi {user?.username} 🌸

          </h1>

        </div>

        <Link
          to="/create"
          className="btn-rose"
        >
          + new memory
        </Link>

      </div>

      {/* EMPTY */}

      {

        posts.length === 0 ? (

          <div
            className="card-soft"
            style={{
              textAlign: "center",
              padding: "3rem 1.5rem"
            }}
          >

            <div
              style={{
                fontSize: "2.25rem"
              }}
            >
              🌼
            </div>

            <p
              style={{
                marginTop: "0.75rem",
                color: "var(--muted)"
              }}
            >

              no petals yet —
              plant your first memory.

            </p>

            <Link
              to="/create"
              className="btn-rose"
              style={{
                marginTop: "1.25rem",
                display: "inline-block"
              }}
            >

              create a post

            </Link>

          </div>

        ) : (

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem"
            }}
          >

            {

              posts.map((p) => {

                const embed =
                  getSpotifyEmbed(p.song);

                const isOwner =

                  user?._id ===
                  p.user?._id;

                return (

                  <article
                    key={p._id}
                    className="card-soft"
                  >

                    {/* HEADER */}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "0.75rem"
                      }}
                    >

                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background:
                            "var(--blush)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            "center",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "var(--ink)"
                        }}
                      >

                        {

                          p.user?.username?.[0]
                          ?.toUpperCase()

                          || "P"

                        }

                      </div>

                      <div>

                        <div
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600
                          }}
                        >

                          {p.user?.username}

                        </div>

                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--muted)"
                          }}
                        >

                          {

                            new Date(
                              p.createdAt
                            ).toLocaleDateString()

                          }

                        </div>

                      </div>

                    </div>

                    {/* IMAGE */}

                    {

                      p.media && (

                        <img
                          src={p.media}
                          alt={p.caption}
                          style={{
                            width: "100%",
                            borderRadius:
                              "0.75rem",
                            objectFit: "cover",
                            maxHeight: 420
                          }}
                        />

                      )

                    }

                    {/* EDIT MODE */}

                    {

                      editingId === p._id ? (

                        <div
                          style={{
                            marginTop: "1rem"
                          }}
                        >

                          <input
                            className="input-soft"
                            value={editedCaption}
                            onChange={(e) =>
                              setEditedCaption(
                                e.target.value
                              )
                            }
                          />

                          <button
                            className="btn-rose"
                            style={{
                              marginTop: "0.75rem"
                            }}
                            onClick={() =>
                              updatePost(p._id)
                            }
                          >

                            save

                          </button>

                        </div>

                      ) : (

                        <>

                          {/* CAPTION */}

                          <p
                            style={{
                              marginTop: "0.75rem",
                              color:
                                "var(--ink)"
                            }}
                          >

                            {p.caption}

                          </p>

                          {/* OWNER BUTTONS */}

                          {

                            isOwner && (

                              <div
                                style={{
                                  display: "flex",
                                  gap: "0.75rem",
                                  marginTop: "1rem"
                                }}
                              >

                                <button
                                  className="btn-rose"
                                  onClick={() => {

                                    setEditingId(
                                      p._id
                                    );

                                    setEditedCaption(
                                      p.caption
                                    );

                                  }}
                                >

                                  edit

                                </button>

                                <button
                                  className="btn-rose"
                                  onClick={() =>
                                    deletePost(
                                      p._id
                                    )
                                  }
                                >

                                  delete

                                </button>

                              </div>

                            )

                          }

                        </>

                      )

                    }

                    {/* SPOTIFY */}

                    {

                      embed && (

                        <iframe
                          src={embed}
                          title="spotify"
                          height="80"
                          style={{
                            marginTop: "0.75rem",
                            width: "100%",
                            borderRadius:
                              "0.75rem",
                            border: 0
                          }}
                          allow="encrypted-media"
                        />

                      )

                    }

                  </article>

                );

              })

            }

          </div>

        )

      }

    </main>

  );

}