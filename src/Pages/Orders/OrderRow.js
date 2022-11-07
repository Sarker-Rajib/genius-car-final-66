import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, serviceName, price, email, customer, message, service, status } = order;
    const [orderService, setOrderService] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service]);


    return (
        <tr>
            <th><button onClick={() => handleDelete(_id)} className='btn'>X</button></th>
            <th>
                <div className="flex items-center">
                    <div className="mask mask-square w-24 h24">
                        {
                            orderService?.img && <img src={orderService.img} alt='alt' />
                        }
                    </div>
                    <div className="name">
                        <span>{serviceName}</span>
                    </div>
                </div>
            </th>
            <td>{price}</td>
            <td>{email}</td>
            <td>{customer}</td>
            <td>{message}</td>
            <td>
                <button className='btn btn-ghost' onClick={() => handleStatusUpdate(_id)}>
                    {
                        status ? status : 'Pending'
                    }
                </button>
            </td>
        </tr>
    )
};

export default OrderRow;