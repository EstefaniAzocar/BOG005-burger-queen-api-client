
import React, { useEffect } from "react";
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
        // setOrderFilter([])
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
        setOrderFilter(listOrders)
    }

    useEffect(() => { getListOrders() }, [])

    // const [orderFilter, setOrderFilter] = useState([])
    const [editBtnStatus, setEditBtnStatus] = useState(false)
    // setOrderFilter([])
    const [changeColor, setChangeColor] = useState()
    const [colorClick, setColorClick] = useState({
        c1: '',
        c2: '',
        c3:'',
    })

    const viewPending = () => {
        setOrderFilter(listOrders.filter(order => order.status === 'pending'))
        setEditBtnStatus(false)
        setChangeColor('#A81F84 solid 3px')
        setColorClick({
            c1: '#9c842e',
            c2: '',
            c3:'',
        })
        console.log('colores', colorClick.c1)
    }

    const viewToDeliver = () => {
        setOrderFilter(listOrders.filter(order => order.status === 'ready'))
        setEditBtnStatus(true)
        setChangeColor('#FFD233 solid 3px')
        setColorClick({
            c1: '',
            c2: '#9c842e',
            c3:'',
        })
    }
    const viewToDelivered = () => {
        setOrderFilter(listOrders.filter(order => order.status === 'delivered'))
        setEditBtnStatus(false)
        setChangeColor('#1AE81A solid 3px')
        setColorClick({
            c1: '',
            c2: '',
            c3:'#9c842e',
        })
    }

    return (
        <div className="stateOrder_container">
            <div className="btnsStates">
                <button className="btnStatePending" onClick={viewPending} style={{ background: colorClick.c1 }}>Pendientes</button>
                <button className="btnStateToDeliver" onClick={viewToDeliver} style={{ background: colorClick.c2 }}>Por Entregar</button>
                <button className="btnStateDelivered" onClick={viewToDelivered} style={{ background: colorClick.c3 }}>Entregados</button>
            </div>
            <div className="order_Container">
                {orderFilter.map(data => (<OrderItem key={data.id} id={data.id} client={data.client} dataEntry={data.dataEntry} products={data.products} status={data.status} userId={data.userId} editBtnStatus={editBtnStatus} color={changeColor} />))}
            </div>
        </div>
    )
}

export { StateOrder }