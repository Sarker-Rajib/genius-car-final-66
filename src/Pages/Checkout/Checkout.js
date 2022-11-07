import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { title, price, _id } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handleOrder = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = `${form.fName.value} ${form.lName.value}`;
        const email = user?.email || "unregistered";
        const phone = form.phone.value;
        const messsage = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message: messsage,
        }

        // if (phone.length> 10) {
        //     alert('alert')
        // }
        // else{
        //     alert('ok')
        // }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('order placed');
                    form.reset();
                }
            })
            .catch(er => console.log(er)
            )
    };

    return (
        <>
            <form onSubmit={handleOrder}>
                <h2 className='text-4xl'>{title}</h2>
                <p>{price}$</p>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-slate-400'>
                    <input name='fName' type="text" placeholder='First Name' className='input-bordered input input-ghost w-full' />
                    <input name='lName' type="text" placeholder='Last Name' className='input-bordered input input-ghost w-full' />
                    <input name='phone' type="text" placeholder='Phone' className='input-bordered input input-ghost w-full' />
                    <input name='email' type="email" placeholder='email' className='input-bordered input input-ghost w-full text-purple-700' defaultValue={user?.email} readOnly />
                </div>
                <textarea name='message' className="teaxtarea textarea-bordered w-full input input-ghost h-24"></textarea>
                <input className='btn' type="submit" value="Place Your Order" />
            </form>
        </>
    );
};

export default Checkout;