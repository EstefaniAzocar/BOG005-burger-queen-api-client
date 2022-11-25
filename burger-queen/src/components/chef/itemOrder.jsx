import React from "react";
import { BurgerContext } from "../../context/indexContext";
import { editOrder, listOrder } from "../../petitions/productPetition";
import { ItemProductOrder } from "./itemProductOrder";

const ItemOrder = (props) => {
    const {
        listOrders,
        setListOrders,
        orderFilter,
        setOrderFilter,
    } = React.useContext(BurgerContext);


    let totalProduct = props.products.map(data => data.qty * data.product.price)
    let totalOrder = totalProduct.reduce(function (a, b) { return a + b; });


    const editStatusOrder = () => {
        editOrder(props.id, 'ready').then(res => {
            listOrder().then(res => {
                setListOrders(res.data.map((order) => {
                    return {
                        client: order.client,
                        id: order.id,
                        dataEntry: order.dataEntry,
                        products: order.products,
                        status: order.status,
                        userId: order.userId,
                    }
                }))
            })
            setOrderFilter(orderFilter.filter(order => order.id !== props.id ))
        })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div>
            <div className="userItem_Container">
                <p className="client">{props.client}</p>
                <p className="status">{props.status}</p>
                <p className="dataEntry">{props.dataEntry}</p>
                <p className="totalOrder">Total: ${totalOrder}</p>

            </div>
            {props.editBtnStatus ? <button onClick={editStatusOrder}>Listo</button> : null}
            <div className="details">
                {props.products.map(data => (<ItemProductOrder key={data.id} qty={data.qty} name={data.product.name} price={data.product.price} />))}
            </div>
        </div>

    )
}
export { ItemOrder }