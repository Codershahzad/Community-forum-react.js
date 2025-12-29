import { ref, onValue, update, push } from "firebase/database";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaSearch, FaTag, FaFolderOpen, FaPaperPlane } from "react-icons/fa";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [commentText, setCommentText] = useState({});
  const user = auth.currentUser;

  useEffect(() => {
    const postsRef = ref(db, "posts");
    const unsub = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setPosts([]);
        return;
      }
      const list = Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }));
      setPosts(list.sort((a, b) => b.createdAt - a.createdAt));
    });
    return () => unsub();
  }, []);

  const handleVote = (postId, type) => {
    if (!user) {
      alert("Please login to vote!");
      return;
    }
    update(ref(db, `posts/${postId}/votes`), {
      [user.uid]: type,
    });
  };

  const handleComment = (postId) => {
    if (!user) {
      alert("Login required");
      return;
    }
    if (!commentText[postId]?.trim()) return;

    push(ref(db, `posts/${postId}/comments`), {
      text: commentText[postId],
      userId: user.uid,
      userName: user.displayName || user.email,
      createdAt: Date.now(),
    });

    setCommentText({ ...commentText, [postId]: "" });
  };

  const countVotes = (votes = {}) => {
    let up = 0, down = 0;
    Object.values(votes).forEach((v) => {
      if (v === "up") up++;
      if (v === "down") down++;
    });
    return { up, down };
  };

  const filteredPosts = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      {/* Header & Search Section */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10 px-4 py-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">All Discussions</h2>
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg font-medium">No questions found</p>
          </div>
        )}

        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const { up, down } = countVotes(post.votes);

            return (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  {/* Category & Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full uppercase">
                      <FaFolderOpen size={10} /> {post.category || "General"}
                    </span>
                    {post.tags?.map((tag, i) => (
                      <span key={i} className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Question Content */}
                  <Link to={`/question/${post.id}`} className="group">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-6 leading-relaxed">{post.description}</p>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-b py-3 mb-6">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleVote(post.id, "up")}
                        className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors font-medium px-3 py-1.5 hover:bg-green-50 rounded-lg"
                      >
                        <FaThumbsUp /> <span>{up}</span>
                      </button>
                      <button 
                        onClick={() => handleVote(post.id, "down")}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg"
                      >
                        <FaThumbsDown /> <span>{down}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaCommentAlt /> 
                      <span>{post.comments ? Object.keys(post.comments).length : 0} Comments</span>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="space-y-4">
                    {post.comments && Object.values(post.comments)
                      .sort((a, b) => a.createdAt - b.createdAt)
                      .map((c, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                            {c.userName?.charAt(0).toUpperCase()}
                          </div>
                          <div className="bg-gray-50 rounded-2xl px-4 py-2 text-sm flex-1 border border-gray-100">
                            <span className="font-bold text-gray-800 mr-2">{c.userName}</span>
                            <p className="text-gray-600 mt-0.5">{c.text}</p>
                          </div>
                        </div>
                      ))}

                    {/* Add Comment Input */}
                    {user ? (
                      <div className="flex items-center gap-3 mt-6">
                        <input
                          placeholder="Write a comment..."
                          value={commentText[post.id] || ""}
                          onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        />
                        <button 
                          onClick={() => handleComment(post.id)}
                          className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition-all active:scale-95"
                        >
                          <FaPaperPlane size={14} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-center text-gray-400 mt-4 italic">
                        Login to join the conversation
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}