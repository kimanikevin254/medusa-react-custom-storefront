import React, { useContext, useState, useEffect } from 'react'
import { Button, Navbar, Modal, Table, Container } from 'react-bootstrap';
import { MedusaContext } from '../context/MedusaContext'

const NavBar = () => {
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([])
    const [cart, setCart] = useState()

    const medusaContext = useContext(MedusaContext)

    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const getCartCountValue = async () => {
            const count = await medusaContext.getCartCount()
            setCartCount(count)
        }
        getCartCountValue()
    }, [medusaContext])

    // functions to handle modal closing and opening
    const handleShow = () => {
        setShow(true)
        medusaContext.getACart()
        .then(({ cart }) => {
            setItems(cart.items)
            setCart(cart)
            console.log(cart.items)
        })
    }
    const handleClose = () => setShow(false)

  return (
    <>
        <Navbar expand="sm">
        <Navbar.Brand href='/'>MyStore</Navbar.Brand>
        <Navbar.Toggle />

        {/* The items to collapse */}
        <Navbar.Collapse className='justify-content-end'>
          <Button variant='success' onClick={handleShow}>Cart ({cartCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Cart Modal */}
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>My Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                items ?

                <Container  className="d-flex flex-column" style={{ width: "100%", justifyContent: "center" }}>

                <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>Thumbnail</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item, id) => (
                        <tr key={id}>
                            <td>{id + 1}</td>
                            <td><img src={item.thumbnail} alt={item.title} style={{maxWidth: '100px'}} /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>€ {item.unit_price}</td>
                            <td>€ {item.total}</td>
                        </tr>
                    ))
                }
                <tr>
                    <td colSpan='5' className="text-end">Sub total:</td>
                    <td>€ {cart?.subtotal}</td>
                </tr>
                <tr>
                    <td colSpan='5' className="text-end">Tax:</td>
                    <td>€ {cart?.tax_total}</td>
                </tr>
                <tr>
                    <td colSpan='5' className="text-end">Total:</td>
                    <td>€ {cart?.total}</td>
                </tr>
            </tbody>
            </Table> 
            <Button variant='success' className='mt-4 mx-auto'>Checkout</Button>
            
            </Container> :

            <p>no items</p>
            }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavBar