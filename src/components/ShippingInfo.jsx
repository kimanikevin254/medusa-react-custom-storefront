import React, { useContext } from 'react'
import { Form, Button, Container, Row, Col} from 'react-bootstrap'
import { MedusaContext } from '../context/MedusaContext'
import { Link } from 'react-router-dom'

const ShippingAddress = () => {
    const medusaContext = useContext(MedusaContext)

    // empty object to hold the shipping info
    let shippingInformation = {}


  return (
    <Container className='mt-5'>
        {/* Shipping Info */}
    <h3>Shipping Information</h3>
    <Form style={{maxWidth: '60rem', marginTop:'2rem', textAlign: 'left'}}>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Your Email" onChange={(event) =>  shippingInformation['email'] = event.target.value} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone" onChange={(event) =>  shippingInformation['phone'] = event.target.value} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Company name" onChange={(event) => shippingInformation['company'] = event.target.value} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" onChange={(event) =>  shippingInformation['firstName'] = event.target.value} />
            </Form.Group>
            </Col>

            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" onChange={(event) =>  shippingInformation['lastName'] = event.target.value} />
            </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control type="text" placeholder="Address 1" onChange={(event) =>  shippingInformation['address1'] = event.target.value} />
                </Form.Group>
            </Col>
            
            <Col> 
                 <Form.Group className="mb-3">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control type="text" placeholder="Address 2" onChange={(event) =>  shippingInformation['address2'] = event.target.value} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="city" onChange={(event) =>  shippingInformation['city'] = event.target.value} />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Address 2" onChange={(event) =>  shippingInformation['postalCode'] = event.target.value} />
                </Form.Group>
            </Col>
        </Row>

        <Button variant="primary" type="submit" onClick={(event) => medusaContext.addShippingAddress(event, shippingInformation)}>
            Submit
        </Button>
        </Form>

        {/* Shipping address */}
            {
                medusaContext.showShippingOptions === true ?

                <Container className='mt-5'>
                    <h3>Shipping Options</h3>
                    {
                        medusaContext.availableShippingOptions?.map((option, id) => (
                            <div key={id}>
                                <div onClick={() => medusaContext.addShippingOption(option.id)} style={{borderBottom: '1px solid grey'}}>
                                    <p>Name: {option.name}</p>
                                    <p>Price(Inclusive Tax): € {(option.amount / 100).toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    }
                    <Link to='/checkout/payment'>
                        <Button>Proceed to Payment</Button>
                    </Link>
                </Container> :

                <></>
            }
        </Container>
  )
}

export default ShippingAddress