import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../context/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
    const {isOpen, toggleCart, products} = useContext(CartContext)

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
          <SheetContent className="w-[88%]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            {products.map((product) => (
              <CartProductItem key={product.id} product={product}/>
            ))}
          </SheetContent>
        </Sheet>
    )
}

export default CartSheet;