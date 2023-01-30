import { createContext, useState } from "react";
import medusaClient from '../utils/medusaClient'

export const MedusaContext = createContext({
    // items: [],
    getAllProducts: () => {},
    getOneProduct: () => {},
    createACart: () => {},
    addALineItem: () => {},
    getACart: () => {},
})

export function MedusaProvider({children}){
    const [cartProducts, setCartProducts] = useState([])
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
        await medusaClient.carts.lineItems.create(cartId, {
            variant_id: variantId,
            quantity: 1
        })
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
        const { cart: { items } } = await medusaClient.carts.retrieve(CartId)
        return items
        // setCartProducts(items)
        // console.log(items)
    }

    const contextValue = {
        getAllProducts,
        getOneProduct,
        createACart,
        addALineItem,
        getACart,
    }

    return (
        <MedusaContext.Provider value={contextValue}>
            {children}
        </MedusaContext.Provider>
    )
}

export default MedusaProvider;