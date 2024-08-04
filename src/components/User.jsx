import { useState } from "react";

const User = ({name}) =>{
    const [count] = useState(0);
    const [count2] = useState(2);

    return (
    <div className="user-card">
        <h2>Name : {name}</h2>
        <h3>Location</h3>
        <h3>Contact</h3>
        <h3>Count: {count}</h3>
        <h3>Count: {count2}</h3>
    </div>
    );
};
export default User;