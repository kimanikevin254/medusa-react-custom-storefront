import { 
    CardElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js"

  import { MedusaContext } from '../context/MedusaContext'
  import { useContext } from "react"
  import medusaClient from "../utils/medusaClient"

  
  export default function Form({ clientSecret, CartId }) {
    const medusaContext = useContext(MedusaContext)

    // const CartId = localStorage.getItem('CartId')
    // const clientSecret = medusaContext.paymentSession?.data.client_secret
    const billingDetails = medusaContext.billingDetails

    console.log('billingDetails')
    
    const stripe = useStripe()
    const elements = useElements()
  
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
            medusaClient.carts.complete(CartId).then((resp) => console.log(resp))
          })
    }
  
    return (
      <form>
        <CardElement />
        <button onClick={handlePayment}>Submit</button>
    </form>
    )
  };