import { 
    CardElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js"

  import { MedusaContext } from '../context/MedusaContext'
  import { useContext } from "react"
  import medusaClient from "../utils/medusaClient"
import { Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

  
  export default function Form({ clientSecret, CartId }) {
    const medusaContext = useContext(MedusaContext)

    const billingDetails = medusaContext.billingDetails

    const stripe = useStripe()
    const elements = useElements()

    const navigate = useNavigate()
  
    const handlePayment = (e) => {
        e.preventDefault();

        return stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: billingDetails.first_name + billingDetails.last_name,
                email: medusaContext.custEmail,
                phone: billingDetails.phone,
                address: {
                  city: billingDetails.city,
                  line1: billingDetails.line_1,
                  line2: billingDetails.line_2,
                  postal_code: billingDetails.postal_code,
                },
              },
            },
          }).then(({ error, paymentIntent }) => {
            // TODO handle errors
            medusaClient.carts.complete(CartId).then((resp) => {
              console.log(resp)
              localStorage.removeItem('CartId')
              navigate('/')
            })
          })
    }
  
    return (
      <form className="my-4">
        <CardElement />
        <Button variant='success' className="mt-3" onClick={handlePayment}>Submit</Button>
    </form>
    )
  };