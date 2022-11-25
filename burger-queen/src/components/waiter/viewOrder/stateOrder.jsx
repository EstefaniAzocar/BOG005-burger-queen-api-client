
import React, {useEffect } from "react";
import { useState } from "react";
import { BurgerContext } from "../../../context/indexContext";
import { listOrder } from "../../../petitions/productPetition";
import { OrderItem } from "./orderItems";

const StateOrder = () => {

    const { 
        listOrders,
        setListOrders,
        orderFilter, 
        setOrderFilter,
      } = React.useContext(BurgerContext);


    const getListOrders = () => {
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

    useEffect(() => { getListOrders() } , [])

    // const [orderFilter, setOrderFilter] = useState([])
    const [editBtnStatus ,setEditBtnStatus] = useState(false)
    // setOrderFilter([])

    const viewPending =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'pending'))
        setEditBtnStatus(false)   
    }

    const viewToDeliver =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'ready'))
        setEditBtnStatus(true)
    }
    const viewToDelivered =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'delivered'))  
        setEditBtnStatus(false)
    }

    return (
        <div className="login_container">
           <h1> estados de las ordenes</h1>
           <div className="btnsStates">
           <button className="btnStatePending" onClick={viewPending}>Pendientes</button>
           <button className="btnStateToDeliver" onClick={viewToDeliver}>Por Entregar</button>
           <button className="btnStateDelivered" onClick={viewToDelivered}>Entregados</button>
           </div>
             {orderFilter.map(data => (<OrderItem key={data.id} id={data.id} client={data.client} dataEntry={data.dataEntry} products={data.products} status={data.status} userId={data.userId} editBtnStatus={editBtnStatus}/>))}
        </div>
    )
}

export {StateOrder}