import { createContext, useState } from "react";
import medusaClient from '../utils/medusaClient'

export const MedusaContext = createContext({
    getAllProducts: () => {},
    getOneProduct: () => {},
    createACart: () => {},
    addALineItem: () => {},
    getACart: () => {},
    getCartCount: () => {},
    addShippingAddress: () => {},
    availableShippingOptions: [],
    showShippingOptions: Boolean,
    addShippingOption: () => {},
    paymentSession: {},
    billingDetails: {},
    custEmail: '',
    cartCount: 0,
    showPayment: Boolean
})

export function MedusaProvider({children}){
    const [availableShippingOptions, setAvailableShippingOptions] = useState([])
    const [showShippingOptions, setShowShippingOptions] = useState(false)
    const [paymentSession, setPaymentSession] = useState(null)
    const [billingDetails, setBillingDetails] = useState(null)
    const [custEmail, setCustEmail] = useState('')

    const [cartCount, setCartCount] = useState(0)

    const [showPayment, setShowPayment] = useState(false)

    // fetch all products from the server
    const getAllProducts = async () => {
        const { products } = await medusaClient.products.list()

        console.log(products)
        
        return products
    }

    // fetch a single product
    const getOneProduct = async (id) => {
        const { product } = await medusaClient.products.retrieve(id)

        // console.log(product)
        
        return product
    }

    // add a line item to cart
    const addALineItem = async (cartId, variantId) => {
        const { cart } = await medusaClient.carts.lineItems.create(cartId, {
            variant_id: variantId,
            quantity: 1
        })
        return getCartCount();
    }

    // create a cart
    const createACart = async (variantId) => {
        const CartId = localStorage.getItem('CartId')
        if(CartId){
            // console.log('exists')
            addALineItem(CartId, variantId)
        }
        else{
            const { cart } = await medusaClient.carts.create()
            console.log(cart)
            localStorage.setItem('CartId', cart.id)
            addALineItem(cart.id, variantId)
        }
    }

    //get a cart
    const getACart = async () => {
        const CartId = localStorage.getItem('CartId')
        if(CartId){
            const { cart } = await medusaClient.carts.retrieve(CartId)
            return { cart }
        }else{
            return 
        }
    }

    //get cart items count
    const getCartCount = async () => {
        const CartId = localStorage.getItem('CartId')

        if(CartId){
            const { cart } = await getACart()

            let noOfCartItems = 0

            cart.items.map(item => noOfCartItems += item.quantity)

            // setCartCount(cart?.items?.length)
            setCartCount(noOfCartItems)

            return cartCount
        }
    }

    // update cart with the shipping address
    const addShippingAddress = async (e, shippingAddress) => {
        e.preventDefault()

        const CartId = localStorage.getItem('CartId')

        let { company, firstName, lastName, address1, address2, city, postalCode, phone, email } = shippingAddress 

        const { cart: { shipping_address } } = await medusaClient.carts.update(CartId, {
            shipping_address: {
                company,
                first_name: firstName,
                last_name: lastName,
                address_1: address1,
                address_2: address2,
                city,
                postal_code: postalCode,
                phone
            }
        })

        // update the cart with the user's email
        await medusaClient.carts.update(CartId, {
            email: email
        })

        // retrieve the list of updated shipping options
        const { shipping_options } = await medusaClient.shippingOptions.listCartOptions(CartId)
        console.log(shipping_options)
        setAvailableShippingOptions(shipping_options)

        // show the available shipping options
        setShowShippingOptions(true)
    }

    // choose shipping option
    const addShippingOption = async (id) => {
        setShowPayment(true)
        
        const CartId = localStorage.getItem('CartId')

        await medusaClient.carts.addShippingMethod(CartId, {
            option_id: id, // the ID of the selected option
          })

        // initialize a payment session
        await medusaClient.carts.createPaymentSessions(CartId)

        const { cart } = await medusaClient.carts.setPaymentSession(CartId, {
            provider_id: 'stripe',
        })
        setPaymentSession(cart.payment_session)
        setBillingDetails(cart.shipping_address)
        setCustEmail(cart.email)
        console.log(cart.payment_session)
        console.log(cart)
    }

    const contextValue = {
        getAllProducts,
        getOneProduct,
        createACart,
        addALineItem,
        getACart,
        getCartCount,
        addShippingAddress,
        availableShippingOptions,
        showShippingOptions,
        addShippingOption,
        billingDetails, 
        custEmail,
        paymentSession,
        showPayment
    }

    return (
        <MedusaContext.Provider value={contextValue}>
            {children}
        </MedusaContext.Provider>
    )
}

export default MedusaProvider;