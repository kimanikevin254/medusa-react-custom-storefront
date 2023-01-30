import { createContext, useState } from "react";
import medusaClient from '../utils/medusaClient'

export const MedusaContext = createContext({
    items: 0,
    getAllProducts: () => {},
    getOneProduct: () => {},
    createACart: () => {},
    addALineItem: () => {},
    getACart: () => {},
    getCartCount: () => {},
})

export function MedusaProvider({children}){
    const [items, setItems] = useState(0)
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
        setItems(items + 1)
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
        const { cart } = await medusaClient.carts.retrieve(CartId)
        return { cart }
        // setCartProducts(items)
        // console.log(items)
    }

    //get cart items count
    const getCartCount = async () => {
        const { cart } = await getACart()

        let cartCount = 0

        cart?.items?.map(item => cartCount += item.quantity)

        return cartCount
        // const { cart } = await getACart()
        // setItems(cart.items)

    }

    const contextValue = {
        getAllProducts,
        getOneProduct,
        createACart,
        addALineItem,
        getACart,
        getCartCount,
        items
    }

    return (
        <MedusaContext.Provider value={contextValue}>
            {children}
        </MedusaContext.Provider>
    )
}

export default MedusaProvider;