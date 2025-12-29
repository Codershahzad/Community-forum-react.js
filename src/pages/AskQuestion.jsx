import { push, ref } from "firebase/database";
import { db, auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AskQuestion() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    if (!auth.currentUser) {
      alert("Please login to post a question");
      return;
    }

    if (!title.trim() || !desc.trim() || !category.trim()) {
      alert("Title, Description and Category are required");
      return;
    }

    setLoading(true);

    try {
      await push(ref(db, "posts"), {
        title: title.trim(),
        description: desc.trim(),
        category: category.trim(),
        tags: tags
          .split(",")
          .map(t => t.trim())
          .filter(Boolean),
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || auth.currentUser.email,
        createdAt: Date.now(),
        votes: {},
        comments: {},
        answers: {}
      });

      alert("✅ Question posted successfully!");

      // reset form
      setTitle("");
      setDesc("");
      setCategory("");
      setTags("");

      navigate("/");
    } catch (error) {
      alert("❌ Error posting question");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Ask a Question</h2>

      <div style={styles.field}>
        <label>Title</label>
        <input
          style={styles.input}
          placeholder="Enter your question title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div style={styles.field}>
        <label>Description</label>
        <textarea
          style={{ ...styles.input, height: 120 }}
          placeholder="Explain your problem in detail"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>

      <div style={styles.field}>
        <label>Category</label>
        <input
          style={styles.input}
          placeholder="e.g. React, Firebase, JavaScript"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </div>

      <div style={styles.field}>
        <label>Tags</label>
        <input
          style={styles.input}
          placeholder="react, firebase, auth"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Posting..." : "Post Question"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: 20,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  heading: {
    marginBottom: 20
  },
  field: {
    marginBottom: 15
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginTop: 5
  },
  button: {
    padding: "10px 20px",
    borderRadius: 6,
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer"
  }
};
