import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const uEmail = user?.email;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${uEmail}`)
            .then(res => res.json())
            .then((data) => {
                setOrders(data);
            })
    }, [uEmail])

    const handleDelete = id => {
        const proceed = window.confirm("Are you sure");

        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('successfully deleted')
                        const remaining = orders.filter(ordr => ordr._id !== id)
                        setOrders(remaining);
                    }
                })
                .catch(err => console.error(err))
        }
    };

    const handleStatusUpdate = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id)
                    const approving = orders.find(ordr => ordr._id === id)
                    approving.status = 'Approved';
                    
                    const newOrders = [approving, ...remaining]
                    setOrders(newOrders);
                    alert('Approved');
                }
            })
    }


    return (
        <>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => <OrderRow
                                key={order._id}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                                order={order}>
                            </OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Orders;