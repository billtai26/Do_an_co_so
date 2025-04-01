import Board from '~/pages/Boards/_id.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserProfile from '~/components/UserProfile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App