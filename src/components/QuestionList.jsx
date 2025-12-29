import React from "react";
import QuestionCard from "./Login";

const QuestionList = ({ questions }) => {
  return (
    <div className="flex flex-col gap-6">
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  );
};

export default QuestionList;
