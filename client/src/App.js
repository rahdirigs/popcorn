import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import Homepage from './pages/Homepage'
import Moviepage from './pages/Moviepage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Homepage} exact />
          <Route path="/movie/:id" component={Moviepage} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
