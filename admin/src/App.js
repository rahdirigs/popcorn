import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Refreshmentpage from './pages/Refreshmentpage'
import Employeespage from './pages/Employeespage'
import Moviespage from './pages/Moviespage'
import Showspage from './pages/Showspage'
import Reportspage from './pages/Reportspage'
import Utilitiespage from './pages/Utilitiespage'
import AddEmployeepage from './pages/addpages/AddEmployeepage'
import AddMoviepage from './pages/addpages/AddMoviepage'
import AddRefreshmentpage from './pages/addpages/AddRefreshmentpage'
import AddShowpage from './pages/addpages/AddShowpage'
import UpdateEmployeepage from './pages/updatepages/UpdateEmployeepage'
import UpdateMoviepage from './pages/updatepages/UpdateMoviepage'
import UpdateRefreshmentpage from './pages/updatepages/UpdateRefreshmentpage'
import UpdateShowpage from './pages/updatepages/UpdateShowpage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Homepage} exact />
          <Route path="/refreshments" component={Refreshmentpage} />
          <Route path="/employees" component={Employeespage} />
          <Route path="/movies" component={Moviespage} />
          <Route path="/shows" component={Showspage} />
          <Route path="/reports" component={Reportspage} />
          <Route path="/utilities" component={Utilitiespage} />
          <Route path="/add/employees" component={AddEmployeepage} />
          <Route path="/add/movies" component={AddMoviepage} />
          <Route path="/add/refreshments" component={AddRefreshmentpage} />
          <Route path="/add/shows" component={AddShowpage} />
          <Route path="/update/employees" component={UpdateEmployeepage} />
          <Route path="/update/movies" component={UpdateMoviepage} />
          <Route
            path="/update/refreshments"
            component={UpdateRefreshmentpage}
          />
          <Route path="/update/shows" component={UpdateShowpage} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
