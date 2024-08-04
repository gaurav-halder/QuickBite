import { CON_URL } from "../common/constants";

const RestaurantCard = (props) =>{
    const {resData} = props;
    if (!resData) {
        return null;
    }

    return (
        <div className="m-6 p-4 w-[250px] rounded-lg bg-gray-50 hover:bg-gray-100">
            <img className="rounded-lg h-[150px] w-full" alt="res-logo" 
            src={CON_URL + resData.info.cloudinaryImageId} 
            />
            <div className="h-[150px]">
                <h3 className="font-bold py-2 text-lg">{resData.info.name.slice(0, 22) + (resData.info.name.length > 22 ? "..." : "") }</h3>
                <h7>{resData.info.cuisines.slice(0, 2).join(", ") + (resData.info.cuisines.length > 2 ? "..." : "")}</h7>
                <h5>⭐️ {resData.info.avgRating} stars</h5>
                <h5>{resData.info.costForTwo}</h5>
                <h5>{resData.info.sla.deliveryTime - 5}-{resData.info.sla.deliveryTime} mins</h5>
            </div>
        </div>
    );
};

//higher order component
//input - RestaurantCard => RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
    return (props)=>{
        return (
            <div>
                <label>Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}

export default RestaurantCard;