import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const AllOrders = () => {
    const [orders, setOrders] = useState([])
    const router = useRouter();
    useEffect(() => {

        const getOrders = async () => {
            const res = await fetch('/api/orders')
            const newOrders = await res.json()
            // console.log(newOrders.orders);
            setOrders(newOrders.orders)
        }
        getOrders()
    }, [])



    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            {orders?.length && <div className="overflow-x-auto mx-auto container w-full my-10">
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
                                Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Amount
                            </th>
                            <th scope="col" className="py-3 px-6">

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
                                        {data.Status}
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
        </div>
    );
};

export default AllOrders;
