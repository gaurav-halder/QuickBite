import { useDispatch } from "react-redux";
import { CON_URL } from "../common/constants";
import { addItem } from "../common/cartSlice";

const MenuItemList = ({items}) =>{

    const dispatch = useDispatch();
    const handleAddItem = (item) => {
        //dispatch action
        dispatch(addItem(item));
    };

    console.log(items);
    return(
        <div>
            <div>
                {items.map((item) => (
                    <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between">
                        <div className="w-9/12">
                            <div className="py-2">
                                <span>{item.card.info.name}</span>
                                <span> - ₹ {item.card.info.price ? item.card.info.price/100 : item.card.info.defaultPrice/100}</span>
                            </div>
                            <p className="text-xs">{item.card.info.description}</p>
                        </div>
                        <div className="w-3/12 p-2">
                            <div className="absolute">
                                <button className="mx-12 my-20 p-1 px-2 bg-white shadow-lg rounded-lg text-green-500 font-bold"
                                onClick={() => handleAddItem(item)}>ADD</button>
                            </div>
                            <img src = {CON_URL + item.card.info.imageId} className="w-full h-24"/>
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MenuItemList;