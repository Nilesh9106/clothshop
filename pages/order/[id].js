import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Order from '../../models/Order'
import mongoose from "mongoose";

const MyOrder = ({ order, User }) => {
    const router = useRouter();
    const [Status, setStatus] = useState(order.Status)
    const [loading, setLoading] = useState(false)
    // console.log(order);

    let total = 0;
    useEffect(() => {

        if (!order) {
            router.push('/');
        }

        if (!localStorage.getItem('token')) {
            router.push('/');
        }
        if (order.Email !== User.Email) {
            router.push('/');
        }
    }, [router.query])

    const handleStatus = () => {
        setLoading(true)
        fetch('/api/order', {
            method: 'PUT',
            body: JSON.stringify({
                id: order.OrderId,
                status: Status
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
            setLoading(false)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })
    }

    return (
        <>
            {order && <section className="text-neutral-600 dark:text-neutral-200 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-neutral-500 tracking-widest">BRAND NAME</h2>
                            <h1 className="text-neutral-900 dark:text-neutral-200 text-3xl title-font font-medium mb-4">Order Id : {order.OrderId}</h1>
                            <p className="leading-relaxed mb-4 text-green-600">Your Order Placed Successfully !!</p>

                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <a className="flex-grow border-b-2 border-neutral-300 py-2 text-lg px-1">Title</a>
                                <a className="flex-grow border-b-2 border-neutral-300 py-2 text-center text-lg px-1">Quantity</a>
                                <a className="flex-grow border-b-2 border-neutral-300 py-2 text-center text-lg px-1">Sub Total</a>
                            </div>
                            {Object.keys(order.Products).map((data) => {
                                // console.log(order.Products[data]);
                                total += (order.Products[data].qty * order.Products[data].price);

                                return (
                                    <div className="grid grid-cols-3 gap-2 mb-3  py-2" key={data}>
                                        <span className="text-neutral-500 dark:text-neutral-100 ">{order.Products[data].name} ( {order.Products[data].size}/{order.Products[data].variant} )</span>
                                        <span className=" text-neutral-900 dark:text-neutral-100 text-center">{order.Products[data].qty}</span>
                                        <span className=" text-neutral-900 dark:text-neutral-100 text-center">{order.Products[data].qty * order.Products[data].price}</span>
                                    </div>
                                )
                            })}


                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-neutral-900 dark:text-white">₹ {total}</span>
                                <div className="flex justify-center items-center px-5 text-lg">
                                    Status : {Status}
                                </div>
                            </div>
                            <div className="flex gap-2 py-2">
                                {User.isAdmin && <>
                                    <select className="input" value={Status} onChange={(e) => setStatus(e.target.value)}>
                                        <option>Cancel</option>
                                        <option>Delivered</option>
                                        <option>Shipped</option>
                                        <option>Pending</option>
                                    </select>
                                    <button onClick={handleStatus} className="bg-blue-500 px-4 py-2 rounded-md active:scale-95 transition-all">
                                        {loading ? "Updating..." : "Update"}
                                    </button>
                                </>
                                }
                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-[45%] w-full lg:h-auto lg:ml-12 my-10  object-cover object-center rounded" src="/Order-delivered.png" />
                    </div>

                </div>
            </section>}
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    let order = await Order.findOne({ OrderId: context.query.id });

    return {
        props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
    }
}
export default MyOrder