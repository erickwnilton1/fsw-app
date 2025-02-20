"use client";

import { MenuCategory, Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            MenuCategories: {
                include: {Products: true}
            }
        }
    }>
}

const RestaurantCategories = ({restaurant}: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(
        restaurant.MenuCategories[0],
    );
    
    const handleCategoryClick = (category: MenuCategory) => {
        setSelectedCategory(category)
    }

    const getCategoryButtonVariant = (category: MenuCategory) => {
        return selectedCategory.id === category.id ? "default" : "secondary"
    }

    return (
    <div className="relative z-20 mt-[-1.5rem] rounded-t-3xl border bg-white">
        <div className="p-5">
            <div className="flex items-center gap-3">
                <Image 
                src={restaurant.avatarImageUrl} 
                alt={restaurant.name} 
                width={45} 
                height={45} 
                />
               <div>
                    <h2 className="font-semibold text-lg">{restaurant.name}</h2>
                    <p className="text-xs opacity-55">{restaurant.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-green-500">
                <ClockIcon />
                <p>Aberto</p>
            </div>
       </div>

        <ScrollArea className="w-full">
            <div className="flex w-max space-x-4 p-4 pt-3">
                {restaurant.MenuCategories.map(category => (
                    <Button onClick={() => { handleCategoryClick(category)}} key={category.id} variant={
                        getCategoryButtonVariant(category)
                    } size="sm" className="rounded-full">
                        {category.name}
                    </Button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    </div>
    )
}

export default RestaurantCategories;