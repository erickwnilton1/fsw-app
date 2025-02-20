import { notFound } from "next/navigation"

import { db } from "@/lib/prisma"

import RestaurantHeader from "./components/header"
import RestaurantCategories from "./components/restaurant-categories"

interface RestaurantMenuPageProps {
    params: Promise<{slug: string}>
    searchParams: Promise<{consumptionMethod: string}>
}

const isConsumptionMethodValid = (ConsumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(ConsumptionMethod.toUpperCase())
}

const RestaurantMenuPage = async ({params, searchParams}: RestaurantMenuPageProps) => {
    const {slug} = await params;
    const {consumptionMethod} = await searchParams;

    if(!isConsumptionMethodValid(consumptionMethod)) {
        return notFound;
    }

    const restaurant = await db.restaurant.findUnique({where: {slug}, include: {
        MenuCategories: {
            include: {Products: true}
        }
    }})

    if(!restaurant) {
        return notFound;
    }

    return (
        <div>
           <RestaurantHeader restaurant={restaurant} />
           <RestaurantCategories restaurant={restaurant} />
        </div>
    )
}

export default RestaurantMenuPage;