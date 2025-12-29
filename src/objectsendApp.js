import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase"; // lowercase app
import "./App.css";

const db = getDatabase(app);

function App() {
  const shah = () => {
    set(ref(db, "users/shah"), {
      id: 1,
      name: "shah",
      age: 28,
    })
      .then(() => {
        alert("Data sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  };

  return (
    <div className="App">
      <h1>Firebase React App</h1>
      <button onClick={shah}>Send data</button>
    </div>
  );
}

export default App;
