import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
const Checkout = ({ Cart, addToCart, removeFromCart, subTotal, User }) => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Address, setAddress] = useState('')
    const [Phone, setPhone] = useState('')
    const [City, setCity] = useState('')
    const [State, setState] = useState('')
    const [Pincode, setPincode] = useState('')
    const [Disabled, setDisabled] = useState(true)
    let router = useRouter();
    useEffect(() => {
        if (!User.Email) {
            router.push('/login')
            toast.info("please login to continue")
        }
        setEmail(User.Email);
        setName(User.Name);
    }, [User.Email, User.Name])
    useEffect(() => {
        if (Name && Email && Phone && Address.length > 5 && Pincode.length > 2) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [Name, Email, Address, Phone, Pincode])


    const submitDetails = async (e) => {
        e.preventDefault();
        console.log(Name);
        if (!Object.keys(Cart).length) {
            alert('Your Cart is Empty ! please add Item to Cart')
            return;
        }
        let body = { Email, Cart, Address, Pincode, Phone, subTotal }
        let Response = await fetch('/api/order', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        Response = await Response.json();

        router.push(`/order/${Response.id}`)

    }
    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <form onSubmit={submitDetails}>
                <div className="container px-5 mx-auto">
                    <h1 className='text-3xl font-bold text-center my-5'>Checkout</h1>
                    <h2 className='text-xl font-semibold  my-5'>1. Delivery Details</h2>

                    <div className='grid md:grid-cols-2 grid-cols-1 gap-3 '>
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm dark:text-neutral-100 text-neutral-600">Name</label>
                            <input onChange={(e) => {
                                setName(e.target.value)
                            }} value={Name} type="text" id="name" name="name" placeholder='Name' className="w-full input" required={true} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="leading-7 text-sm dark:text-neutral-100 text-neutral-600">Email</label>
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }} value={Email} type="email" id="email" name="email" placeholder='Email' className="w-full input" required={true} readOnly={true} />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-3 '>
                        <div className="mb-4">
                            <label htmlFor="address" className="leading-7 text-sm dark:text-neutral-100 text-neutral-600">Address</label>
                            <textarea onChange={(e) => {
                                setAddress(e.target.value)
                            }} value={Address} id="address" name="address" className="w-full h-32 resize-none input" placeholder='Address' required={true}></textarea>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-3 '>
                        <div className="mb-4">
                            <label htmlFor="phone" className="leading-7 text-sm dark:text-neutral-100 text-neutral-600">Phone Number</label>
                            <input onChange={(e) => {
                                setPhone(e.target.value)
                            }} value={Phone} type="phone" id="phone" name="phone" placeholder='Phone Number' className="w-full input" required={true} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pincode" className="leading-7 text-sm dark:text-neutral-100 text-neutral-600 ">Pincode</label>
                            <input onChange={(e) => {
                                setPincode(e.target.value)
                                fetch(`https://api.postalpincode.in/pincode/${e.target.value}`).then((res) => {
                                    return res.json();
                                }).then((data) => {
                                    if (data[0].Status === 'Success') {
                                        setState(data[0].PostOffice[0].State);
                                        setCity(data[0].PostOffice[0].Block);
                                    }
                                })
                            }} value={Pincode} type="text" id="pincode" name="pincode" placeholder='Pin Code' className="w-full input " required={true} />
                        </div>

                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-3 '>
                        <div className="mb-4">
                            <label htmlFor="state" className="leading-7 text-sm dark:text-neutral-100 text-neutral-600">State</label>
                            <input onChange={(e) => {
                                setState(e.target.value)
                            }} value={State} type="text" id="state" name="state" placeholder='State' className="w-full input" readOnly={true} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city" className="leading-7 text-sm dark:text-neutral-100 text-neutral-600 ">city</label>
                            <input onChange={(e) => {
                                setCity(e.target.value)
                            }} value={City} type="text" id="city" name="city" placeholder='City' className="w-full input " readOnly={true} />
                        </div>
                    </div>

                    <h2 className='text-xl font-semibold  my-5'>2. Review Cart Item</h2>


                    <div className="container">
                        <div className={` bg-blue-100 md:px-10 px-5 md:mx-10 py-6 my-5 transition-all duration-300 ease-in-out  dark:bg-neutral-800 `}>
                            <h3 className='text-2xl p-3 text-center font-bold '> Shopping Cart</h3>
                            {Object.keys(Cart).length === 0 && <div className='text-lg font-normal px-6 py-3'>Your Cart Is Empty </div>}
                            <ul className='list-decimal px-5'>
                                {Object.keys(Cart).map((data, index) => {

                                    return (
                                        <li className='my-3' key={index}>
                                            <div className='flex font-semibold'>
                                                <Link href={`/products/${data}`}><span className='w-2/3'>{Cart[data].name} ( {Cart[data].size}/{Cart[data].variant} )</span></Link>
                                                <div className='w-1/3 flex items-center justify-center text-lg '><AiOutlineMinusCircle onClick={() => {
                                                    removeFromCart(data, 1);
                                                }} className='text-blue-700 cursor-pointer' /><span className='mx-4'>{Cart[data].qty}</span> <AiOutlinePlusCircle className='text-blue-700 cursor-pointer' onClick={() => {
                                                    addToCart(data, 1, Cart[data].price, Cart[data].name, Cart[data].size, Cart[data].variant);
                                                }} /></div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className='bg-neutral-500 py-[0.5px] my-3'></div>
                            <span className='mt-4 mx-4 text-lg font-bold'>Sub Total : {subTotal}</span>

                        </div>
                        <h2 className='text-xl font-semibold  my-5'>3. Payment Method</h2>
                        <div className=' flex px-10 gap-5'>
                            <div className='flex gap-5'>
                                <label htmlFor="cod">Cash On Delivery</label>
                                <input type="radio" name="paymentMethod" id="cod" defaultChecked />
                            </div>
                            <div className='flex gap-5'   >
                                <label htmlFor="online" className='disabled:text-neutral-400'>Online</label>
                                <input type="radio" name="paymentMethod" id="online" disabled={true} />
                            </div>
                        </div>
                        <button disabled={Disabled} type='submit' className="disabled:bg-blue-300 flex justify-center items-center  text-white text-center bg-blue-500 border-0 my-4 md:mx-10  py-2 px-4 focus:outline-none hover:bg-blue-600 rounded " >Buy Now</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Checkout