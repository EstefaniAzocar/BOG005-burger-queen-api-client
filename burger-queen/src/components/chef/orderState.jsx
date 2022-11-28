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
      const [stateColor, setStateColor] = useState()


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
        setStateColor('#A81F84 solid 3px') 
    }

    const viewReady =()=>{
        setOrderFilter(listOrders.filter(order=> order.status === 'ready' || order.status === 'delivered' ))
        setEditBtnStatus(false)
        setStateColor('#1AE81A solid 3px')    
    }

    return (
        <div className="containerStateOrder">
           <div className="btnsStates">
           <button className="btnStatePending" onClick={viewPending}>Pendientes</button>
           <button className="btnStateDelivered btnStateReady" onClick={viewReady}>Entregados</button>
           </div>
           <div className="containerOrder">
             {orderFilter.map(data => (<ItemOrder key={data.id} id={data.id} client={data.client} dataEntry={data.dataEntry} products={data.products} status={data.status} userId={data.userId} editBtnStatus={editBtnStatus} color={stateColor}/>))}
           </div>
        </div>
    )
}

export {OrderState}