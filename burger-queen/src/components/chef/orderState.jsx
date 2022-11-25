import React, {useEffect, useState } from "react";
import { BurgerContext } from "../../context/indexContext";
import { listOrder } from "../../petitions/productPetition";
import { ItemOrder } from "./itemOrder";


const OrderState = () => {

    const { 
        listOrders,
        setListOrders,
        orderFilter, 
        setOrderFilter,
      } = React.useContext(BurgerContext);

      const [editBtnStatus ,setEditBtnStatus] = useState(false)


    const getListOrder = () => {
        setOrderFilter([])
        listOrder().then(res => {
             setListOrders(res.data.map((order) => {
                return {
                    client: order.client,
                    id: order.id,
                    dataEntry: order.dataEntry,
                    products: order.products,
                    status: order.status,
                    userId: order.userId,
                }}))
        })
    }

    useEffect(() => {getListOrder()} , [])

    // const [orderFilter, setOrderFilter] = useState([])
    // setOrderFilter([])

    const viewPending =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'pending'))
        setEditBtnStatus(true)
    }

    const viewReady =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'ready' || order.status === 'delivered' ))
        setEditBtnStatus(false)   
    }

    return (
        <div>
           <div className="btnsStates">
           <button className="btnStatePending" onClick={viewPending}>Pendientes</button>
           <button className="btnStateDelivered btnStateReady" onClick={viewReady}>Entregados</button>
           </div>
             {orderFilter.map(data => (<ItemOrder key={data.id} id={data.id} client={data.client} dataEntry={data.dataEntry} products={data.products} status={data.status} userId={data.userId} editBtnStatus={editBtnStatus}/>))}
        </div>
    )
}

export {OrderState}