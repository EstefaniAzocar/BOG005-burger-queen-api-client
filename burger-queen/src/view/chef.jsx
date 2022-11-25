
import React from "react";
import { OrderState, OrderStatus } from "../components/chef/orderState";
import { Navbar } from "../components/header/navBar";


const Chef= () => {
    return (
        <div className="chef_container"  >
            <Navbar />
            <OrderState/>
        </div>
    )
}

export {Chef}
