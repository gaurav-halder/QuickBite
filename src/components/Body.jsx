import RestaurantCard , { withPromotedLabel } from "./RestaurantCard";
import resList from "../common/mockData";
import { useState , useEffect} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../common/useOnlineStatus";
import { FaSearch } from "react-icons/fa";

const Body = () => {
    
    const [listOfRestaurant, setListOfRestaurant] = useState([]);
    const [filteredRestaurant , setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    // Whenever state variable update, react triggers a reconciliation cycle(re-renders the component)
    
    console.log(listOfRestaurant);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () =>{
        const data = await fetch(
            "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5753931&lng=88.47979029999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        
        const json = await data.json();
        
        console.log(json);
        setListOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false) return <h1>Looks like you are offline!! Check Internet Connection</h1>
    
    return listOfRestaurant.length === 0 ? (
        <Shimmer/> 
    ) : (
        <div className="body">
            <div className="flex justify-center items-center">
                <div className="my-3 mt-6 p-4">
                    <input type="text" className="p-3 mx-1 rounded-md border border-solid border-black" value={searchText} 
                    onChange ={(e)=>{
                        setSearchText(e.target.value);
                    }}/>
                    <button className="px-3"
                        onClick={()=>{

                        console.log(searchText);
                        
                        const filteredRestaurant = listOfRestaurant.filter((res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        
                        setFilteredRestaurant(filteredRestaurant);
                    }}><FaSearch size={30}/></button>
                
                    <button 
                    className="p-3.5 px-5 mx-10 rounded-md bg-gray-200" 
                    onClick={() => {
                        //filter logic
                        const filteredList = listOfRestaurant.filter((res) => res.info.avgRating > 4.2);
                        setFilteredRestaurant(filteredList);
                    }} >Top Rated Restaurant</button>
                </div>
            </div>
            <div className="flex flex-wrap mx-5 justify-center">
                {filteredRestaurant.length > 0 ? (
                    filteredRestaurant.map((restaurant) => (
                        <Link 
                            key={restaurant.info.id}
                            to={"/restaurants/" + restaurant.info.id}>
                            { restaurant.info.promoted ? (<RestaurantCardPromoted resData={restaurant}/> ) : (
                            <RestaurantCard resData={restaurant}/> )}
                        </Link>
                    ))
                ) : (
                    <div>No Match Found!</div>
                )}
            </div>
        </div>
    );
};
export default Body;
