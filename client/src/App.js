import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import Homepage from './pages/Homepage'
import Moviepage from './pages/Moviepage'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import Profilepage from './pages/Profilepage'
import SelectShowpage from './pages/SelectShowpage'
import Bookingpage from './pages/Bookingpage'
import WatchHistorypage from './pages/WatchHistorypage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={Loginpage} />
          <Route path="/register" component={Registerpage} />
          <Route path="/profile" component={Profilepage} />
          <Route path="/watch-history" component={WatchHistorypage} />
          <Route path="/movie/:id/shows" component={SelectShowpage} />
          <Route path="/movie/:id" component={Moviepage} exact />
          <Route path="/show/:id" component={Bookingpage} />
          <Route path="/" component={Homepage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
