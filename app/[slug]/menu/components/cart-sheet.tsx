import { useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import FormatValue from "@/helpers/format-value";

import { CartContext } from "../context/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderButton from "./finish-order-button";

const CartSheet = () => {
    const {isOpen, toggleCart, products, total} = useContext(CartContext)

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
          <SheetContent className="w-[88%]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full py-5">
              <div className="flex-auto">
                {products.map((product) => (
                <CartProductItem key={product.id} product={product}/>
                 ))}
              </div>

              <Card className="mb-6">
                <CardContent className="p-5">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-sm font-semibold">{FormatValue(total)}</p>
                  </div>
                </CardContent>
              </Card>

              <FinishOrderButton />
            </div>
          </SheetContent>
        </Sheet>
    )
}

export default CartSheet;