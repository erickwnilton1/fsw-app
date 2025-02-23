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
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
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

        //checks if the product already exists and adds +1
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

    return (
        <CartContext.Provider 
        value={{
            isOpen: isOpen, 
            products: products, 
            toggleCart: toggleCart,
            addProduct: addProduct
            }}
            >
                {children}
        </CartContext.Provider>
    )
}