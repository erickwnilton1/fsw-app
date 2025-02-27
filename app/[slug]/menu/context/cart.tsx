"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

//create an interface to extend the Product table by adding the quantity method: number
export interface CartProduct 
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    total: number,
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProduct: () => {},
    total: 0
});

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen((prev) => !prev)
    }

    const addProduct = (product: CartProduct) => {
        const productIsAlredyOnTheCart = products.some(
            (prevProduct) => prevProduct.id === product.id
        );

        if(!productIsAlredyOnTheCart) {
            return setProducts((prev) => [...prev, product])
        }

        setProducts((prevProducts) => {
           return prevProducts.map((prevProduct) => {
            if(prevProduct.id === product.id) {
                return {
                    ...prevProduct,
                    quantity: prevProduct.quantity + product.quantity
                }
            }

            return prevProduct;
           })
        })
    }

    const decreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if(prevProduct.id === productId) {
                    if(prevProduct.quantity === 1) {
                        return prevProduct;
                    }
                    return {...prevProduct, quantity: prevProduct.quantity -1}
                }

                return prevProduct
            })
        })
    }

    const increaseProductQuantity = (productId: string) => {
        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => {
                if(prevProduct.id !== productId) {
                    return prevProduct;
                }

                return {...prevProduct, quantity: prevProduct.quantity + 1}
            })
        })
    }

    const removeProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id !== productId))
    }

    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity
    }, 0)

    return (
        <CartContext.Provider 
        value={{
            isOpen: isOpen, 
            products: products, 
            toggleCart: toggleCart,
            addProduct: addProduct,
            decreaseProductQuantity: decreaseProductQuantity,
            increaseProductQuantity: increaseProductQuantity,
            removeProduct: removeProduct,
            total: total
            }}
            >
                {children}
        </CartContext.Provider>
    )
}