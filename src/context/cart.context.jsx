import {createContext, useReducer} from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartitem) => 
    cartitem.id === productToAdd.id);

    if(existingCartItem){
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartitem) => 
    cartitem.id === productToRemove.id);

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) => 
    cartItem.id === productToRemove.id ? 
    {...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    )
}

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount : 0,
    cartTotal : 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITAIL_STATE = {
    cartItems: [],
    isCartOpen: false,
    cartCount : 0,
    cartTotal : 0
}

const cartReducer = (state, action) => {
    const { type, payload} = action

    switch(type) {
      case CART_ACTION_TYPES.SET_CART_ITEMS:
        return{
            ...state,
            ...payload,
        };

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload,
            };
    


      default:
        throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}
export const CartProvider = ({children}) => {
    const [{cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITAIL_STATE);;

    const updateCartItmesReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((total, cartItem) =>
         total + cartItem.quantity * cartItem.price , 0);

         const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems, 
            cartTotal: newCartTotal, 
            cartCount:newCartCount
            })
        );     
    };

    const addItemToCart = (productToAdd) =>{
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItmesReducer(newCartItems);
    }
    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItmesReducer(newCartItems);
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItmesReducer(newCartItems);
    }
    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart,
        cartItems, 
        cartCount, 
        cartTotal,
    };
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
} 