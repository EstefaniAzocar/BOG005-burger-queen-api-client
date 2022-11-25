
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
    const [changeColor, setChangeColor] = useState()

    const viewPending =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'pending'))
        setEditBtnStatus(false)
        setChangeColor('#A81F84 solid 3px')   
    }

    const viewToDeliver =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'ready'))
        setEditBtnStatus(true)
        setChangeColor('#FFD233 solid 3px')  
    }
    const viewToDelivered =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'delivered'))  
        setEditBtnStatus(false)
        setChangeColor('#1AE81A solid 3px') 
    }

    return (
        <div className="stateOrder_container">
           <h1> estados de las ordenes</h1>
           <div className="btnsStates">
           <button className="btnStatePending" onClick={viewPending}>Pendientes</button>
           <button className="btnStateToDeliver" onClick={viewToDeliver}>Por Entregar</button>
           <button className="btnStateDelivered" onClick={viewToDelivered}>Entregados</button>
           </div>
           <div className="order_Container">
             {orderFilter.map(data => (<OrderItem key={data.id} id={data.id} client={data.client} dataEntry={data.dataEntry} products={data.products} status={data.status} userId={data.userId} editBtnStatus={editBtnStatus} color={changeColor}/>))}
           </div>
        </div>
    )
}

export {StateOrder}