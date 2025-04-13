import Board from '~/pages/Boards/_id.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserProfile from '~/components/UserProfile'
import TaskManager from '~/components/TaskManager'
import CommentsSection from '~/components/CommentsSection'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/comments" element={<CommentsSection />} />
      </Routes>
    </Router>
  )
}

export default App;
