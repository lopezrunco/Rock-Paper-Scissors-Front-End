import { Routes, Route } from 'react-router-dom'

import WelcomeScreen from './pages/WelcomeScreen'
import NotFound from './pages/NotFound'
import MultiPlayerStartScreen from './pages/MultiPlayerStartScreen'

import BackgroundShape from './components/BackgroundShape'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SinglePlayerStartScreen from './pages/SinglePlayerStartScreen'
import NavigationScrollToTop from './components/NavigationScrollToTop'

import './App.scss'

function App() {
  return (
    <div className="App">

      <BackgroundShape />
      <Nav />
      <NavigationScrollToTop />

      <Routes>
        <Route path="/multi-player-start-screen" element={<MultiPlayerStartScreen />} />
        <Route path="/single-player-start-screen" element={<SinglePlayerStartScreen />} />
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
  )
}

export default App
