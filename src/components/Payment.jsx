import React, { useContext } from 'react'

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { MedusaContext } from '../context/MedusaContext'
import Form from './Form'
import { Container, Alert } from 'react-bootstrap'

const stripePromise = loadStripe("pk_test_51MQrXyEipZmHjcOJipfULGHayjlhZpigi9kBW2eREz5LwHnC13n5QruPdLKJSodMHTQb3qXYmjTkGTKUKOlTEVcd00V78lFDnN")

const Payment = () => {
    const medusaContext = useContext(MedusaContext)

    const CartId = localStorage.getItem('CartId')
    const clientSecret = medusaContext.paymentSession?.data.client_secret
    console.log(CartId, clientSecret)
    
  return (
    <Container className='mt-5'>
      {
        !clientSecret && medusaContext.showPayment === true &&
        <>
        <h3>Stripe Card Payment</h3>

        <Alert variant='info'>
          <Alert.Heading>Stripe card payment loading</Alert.Heading>
        </Alert>
        </>
      }
      {clientSecret && (
        <>
        <h3>Stripe Card Payment</h3>

        <Elements stripe={stripePromise} options={{
          clientSecret,
        }}>
        <Form clientSecret={clientSecret} CartId={CartId} />
      </Elements>
      </>
      )}
    </Container>
  )
}

export default Payment