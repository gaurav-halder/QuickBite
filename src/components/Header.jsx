import { LOGO_URL } from "../common/constants";
import { useState, useContext} from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../common/useOnlineStatus";
import UserContext from "../common/UserContext";
import { useSelector } from "react-redux";

const Header = () =>{

    const [btnNameReact , setBtnNameReact] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const data = useContext(UserContext);

    //suscribing to the store using selector
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    return(
        <div className="flex justify-between shadow-lg items-center">
            <div className="logo-container ps-10 flex">
                <img className="w-24 " src={LOGO_URL}></img>
                <h1 className="m-auto font-bold text-[22px] font-serif">QuickBite</h1>
            </div>
            <div className="flex items-center">
                <ul className="flex p-10 text-lg">
                    <li className="px-4 cursor-default">{onlineStatus ? "Online 🟢" : "Offline 🔴"}</li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="px-4"><Link to="/grocery">Grocery</Link></li>
                    <li className="px-4"><Link to="/cart">🛒 {cartItems.length}</Link></li>
                    <button className="px-4 text-lg" 
                    onClick={()=>{
                        btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
                        console.log(btnNameReact);
                        }}>{btnNameReact}</button>
                </ul>
            </div>
        </div>
    )
};
export default Header;