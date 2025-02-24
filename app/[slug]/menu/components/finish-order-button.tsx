import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  

const FinishOrderButton = () => {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="w-full rounded-full">
                    Finalizar Pedido
            </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        Finalizar Pedido
                    </DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o seu pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer> 
    )
};

export default FinishOrderButton;