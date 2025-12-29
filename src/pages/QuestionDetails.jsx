import { ref, onValue, push } from "firebase/database";
import { db, auth } from "../firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function QuestionDetails({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    onValue(ref(db, `posts/${id}`), snap => setPost(snap.val()));
  }, [id]);

  const submitAnswer = () => {
    push(ref(db, `posts/${id}/answers`), {
      text: answer,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.email
    });
  };

  if (!post) return null;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      {user && (
        <>
          <textarea onChange={e => setAnswer(e.target.value)} />
          <button onClick={submitAnswer}>Answer</button>
        </>
      )}

      {post.answers &&
        Object.values(post.answers).map((a, i) => (
          <p key={i}><b>{a.userName}</b>: {a.text}</p>
        ))}
    </div>
  );
}
