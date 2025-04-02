import Board from "~/pages/Boards/_id.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "~/components/UserProfile";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
