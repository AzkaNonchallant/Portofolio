import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageTransition from './components/PageTransition'
import Projects from './pages/Project.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <PageTransition>
        <Routes>
   
          <Route path="/projects" element={<Projects />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  )
}