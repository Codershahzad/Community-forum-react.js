import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Forum = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(list);
    };
    fetchQuestions();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Q&A Forum</h1>
      {questions.length === 0 && <p className="text-center">No questions yet.</p>}
      <div className="flex flex-col gap-4">
        {questions.map((q) => (
          <div key={q.id} className="border p-4 rounded shadow hover:shadow-lg">
            <h2 className="font-bold text-xl">{q.title}</h2>
            <p className="text-gray-700">{q.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
