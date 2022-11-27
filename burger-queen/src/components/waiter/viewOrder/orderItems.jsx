import React from "react";
import { BurgerContext } from "../../../context/indexContext";
import { deleteOrder, editOrder, listOrder } from "../../../petitions/productPetition";
import Swal from 'sweetalert2'
import { OrderProductItem } from "./orderProductsItem";
import { useState } from "react";


const OrderItem = (props) => {
    const {
        listOrders,
        setListOrders,
        orderFilter, 
        setOrderFilter,

    } = React.useContext(BurgerContext);

    const [viewDetailsOrder, setViewDetailsOrder] = useState(false)

    const deleteOrderBtn = () => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "No podrás recuperar la Orden!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrder(props.id)
                // const arrayFilterUser = orderFilter.filter(order => order.id !== props.id )
                // setOrderFilter(orderFilter.filter(order => order.id !== props.id ))
                setOrderFilter(orderFilter.filter(order => order.id !== props.id ))
                Swal.fire(
                    'Eliminado!',
                    'La Orden ha sido eliminada correctamente',
                    'Eliminada correctamente',
                )
            }
        })
    }


    let totalProduct = props.products.map(data => data.qty * data.product.price)
    let totalOrder = totalProduct.reduce(function (a, b) { return a + b; });

    const viewDetails = () => {
        viewDetailsOrder ? setViewDetailsOrder(false) : setViewDetailsOrder(true)
    }

    const editStatusOrder = () => {
        editOrder(props.id, 'delivered').then(res => {
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
        <div className="viewStateWaiter_Container" style={{border: props.color}}>
            <p className="client">Cliente: {props.client}</p>
            <p className="status">Estado: {props.status}</p>
            <p className="dataEntry">Fecha: {props.dataEntry}</p>
            <p className="totalOrder">Total: ${totalOrder}</p>
            <div className="btnStateWaiter">
                <button onClick={viewDetails} className="fa-solid fa-pen-to-square" style={{border: props.color}}></button>
                <button className="fa-solid fa-trash btnDelete" onClick={deleteOrderBtn} style={{border: props.color}}></button>
                {props.editBtnStatus ? <button onClick={editStatusOrder} className="fa-solid fa-check" style={{border: props.color}}></button> : null}
            </div>
            <div className="details">
                {viewDetailsOrder ? 
                props.products.map(data => (<OrderProductItem key={data.id} qty={data.qty} name={data.product.name} price={data.product.price} />)) : null}
            </div>
        </div>
    )
}


export { OrderItem }