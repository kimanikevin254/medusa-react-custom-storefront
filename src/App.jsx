import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import { Container } from 'react-bootstrap'
import MedusaProvider from './context/MedusaContext'
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';

function App() {

  return (
    <MedusaProvider>
      <Container>
        <NavBar />
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout/payment' element={<Payment />} />
          </Routes>
      </Container>
    </MedusaProvider>
  )
}

export default App
