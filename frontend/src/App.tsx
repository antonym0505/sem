import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/new" element={<CreateEvent />} />
    </Routes>
  )
}

export default App
