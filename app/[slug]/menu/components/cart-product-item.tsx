import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import FormatValue from "@/helpers/format-value";

import { CartContext, CartProduct } from "../context/cart";

interface CartItemProps {
    product: CartProduct;
}

const CartProductItem = ({product}: CartItemProps) => {
    const {decreaseProductQuantity, increaseProductQuantity, removeProduct} = useContext(CartContext)

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 rounded-xl bg-gray-100">
                    <Image src={product.imageUrl} alt={product.name} fill/>
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%]">{product.name}</p>
                    <p className="text-sm font-semibold">
                        {FormatValue(product.price)}
                    </p>
                
                    <div className="flex items-center gap-1 text-center">
                        <Button 
                        className="w-7 h-7 rounded-lg" 
                        variant="outline" 
                        onClick={() => decreaseProductQuantity(product.id)}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <p className="w-4 text-xs">
                            {product.quantity}
                        </p>
                        <Button 
                        className="w-7 h-7 rounded-lg" 
                        variant="destructive" 
                        onClick={() => increaseProductQuantity(product.id)}
                        >
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
            </div>

            <Button 
            className="w-7 h-7 rounded-lg" 
            variant="outline" 
            onClick={() => removeProduct(product.id)}
            >
                <TrashIcon />
            </Button>
        </div>
    )
}

export default CartProductItem;