import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RefreshmentListPage from './pages/RefreshmentListPage'
import RefreshmentAddPage from './pages/RefreshmentAddPage'
import RefreshmentEditPage from './pages/RefreshmentEditPage'
import MovieListPage from './pages/MovieListPage'
import MovieAddPage from './pages/MovieAddPage'
import MovieEditPage from './pages/MovieEditPage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/refreshments" component={RefreshmentListPage} />
          <Route path="/add/refreshments" component={RefreshmentAddPage} />
          <Route
            path="/edit/refreshments/:id"
            component={RefreshmentEditPage}
          />
          <Route path="/movies" component={MovieListPage} />
          <Route path="/add/movies" component={MovieAddPage} />
          <Route path="/edit/movies/:id" component={MovieEditPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
