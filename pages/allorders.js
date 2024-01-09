import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const AllOrders = ({ User }) => {
    const router = useRouter();
    const [orders, setOrders] = useState([])
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/');
        }
        let url = `${process.env.NEXT_PUBLIC_URL}/api/getorder`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ Email: User.Email })
        }).then((data) => {
            return data.json()
        }).then((data) => {
            setOrders(data.order)

        })
    }, [router.query])





    return (
        <>
            <Head>
                <title>Orders</title>
            </Head>

            {orders.length && <div className="overflow-x-auto mx-auto container md:w-[70%] my-10">
                <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                    <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Order Id
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Address
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Amount
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(orders).map((data, index) => {

                            return (
                                <tr className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100" key={index}>
                                    <th scope="row" className="py-4 px-6 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                                        {data.OrderId}
                                    </th>
                                    <td className="py-4 px-6">
                                        {data.Address}
                                    </td>

                                    <td className="py-4 px-6">
                                        ₹ {data.Amount}
                                    </td>
                                    <td onClick={() => {
                                        console.log(`/order/${data.OrderId}`);
                                        router.push(`/order/${data.OrderId}`)
                                    }} className="py-4 cursor-pointer text-blue-500  underline underline-offset-2 px-6">
                                        View Order
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>}

        </>
    )
}


export default AllOrders