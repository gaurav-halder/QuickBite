import { useDispatch, useSelector } from "react-redux";
import MenuItemList from "./MenuItemList";
import { clearCart } from "../common/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();
    const handleClearCart = ()=>{
        dispatch(clearCart());
    };

    //calculate total price
    const totalPrice = cartItems.reduce((total, item) =>{
        const price = item.card.info.price ? item.card.info.price/100 : item.card.info.defaultPrice / 100;
        return total + price;
    }, 0);

    return(
        <div className="text-center my-4 py-4">
            <div className="w-6/12 m-auto">
                {cartItems.length === 0 && (
                    <div className="my-6">
                        <h1 className="text-2xl mb-10 font-bold text">Cart</h1>
                        <h1>Your Cart is Empty!</h1> 
                        <h2>Add Items to Cart</h2>
                    </div>
                )}
                {cartItems.length !==0  &&(
                    <div className="flex justify-between font-bold">
                        <h1 className="text-3xl">Cart</h1>
                        <button className="text-xl"
                        onClick={handleClearCart}
                        >X</button>
                    </div>
                )}
                <MenuItemList items={cartItems} />
                {cartItems.length !==0 &&(
                    <div className="flex justify-between font-bold px-6">
                        <h1 className="text-xl">To Pay</h1>
                        <h1 className="text-xl">₹ {totalPrice.toFixed(2)}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Cart;