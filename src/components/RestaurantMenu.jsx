
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../common/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () =>{

    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null ) return <Shimmer/>;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info || {};

    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || [];
    // console.log(itemCards);
    // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") || [];
    console.log(categories);


    return  (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold ">{cuisines.join(", ")} - {costForTwoMessage}</p>

            {/* CATEGORY Accordian */}
            {categories.map((category) => (
            <RestaurantCategory key={category?.card?.card?.Id} data={category?.card?.card}/>
            ))}

        </div>
    );
};
export default RestaurantMenu;