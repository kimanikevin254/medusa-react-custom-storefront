import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import { Container } from 'react-bootstrap'
import MedusaProvider from './context/MedusaContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/Product';

function App() {

  return (
    <MedusaProvider>
      <Container>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='/product/:id' element={<Product />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </MedusaProvider>
  )
}

export default App
