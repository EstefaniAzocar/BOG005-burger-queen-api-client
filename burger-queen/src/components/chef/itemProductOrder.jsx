import React from "react";

const ItemProductOrder = (props) => {

// let totalAcum= props.qty * props.price
    return (
        <div className="orderProductItem">
            <div className="productName">
            <p >{props.name} </p>
            </div>
            <div className="productCant">
            <p>{props.qty} </p>
            </div>
            {/* total: {totalAcum} */}
        </div>
    )
}

export {ItemProductOrder}