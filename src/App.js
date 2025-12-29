import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetails from "./pages/QuestionDetails";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/ask" element={user ? <AskQuestion /> : <Navigate to="/login" />} />
        <Route path="/question/:id" element={<QuestionDetails user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}
