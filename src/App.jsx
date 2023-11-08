import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Drip from './pages/Drip'
import Premium from './pages/Premium'
import Support from './pages/Support'
import NotFound from './pages/404'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Drip cid={'MUMBAI'} />} />
        <Route path='/mumbai' element={<Drip cid={'MUMBAI'} />} />
        <Route path='/athens' element={<Drip cid={'ATHENS'} />} />
        <Route path='/fuji' element={<Drip cid={'FUJI'} />} />
        <Route path='/premium' element={<Premium />} />

        <Route path='/support' element={<Support />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
