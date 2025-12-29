import React, { useState } from "react";

const AskQuestionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onSubmit({
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
      author: "Current User",
      date: new Date().toISOString().slice(0, 10),
      votes: 0,
    });
    setTitle("");
    setDescription("");
    setTags("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Question Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Describe your question..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-bold">
        Post Question
      </button>
    </form>
  );
};

export default AskQuestionForm;
