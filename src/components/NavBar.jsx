import React, { useContext, useState } from 'react'
import { Button, Navbar, Modal, Table } from 'react-bootstrap';
import { MedusaContext } from '../context/MedusaContext'

const NavBar = () => {
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([])

    const medusaContext = useContext(MedusaContext)

    // functions to handle modal closing and opening
    const handleShow = () => {
        setShow(true)
        const items = medusaContext.getACart()
        .then(res => {
            setItems(res)
            console.log(res)
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
          <Button variant='success' onClick={handleShow}>Cart (n Items)</Button>
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
            </tbody>
            </Table> :

            <p>no items</p>
            }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavBar