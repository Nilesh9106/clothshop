import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'

const Item = (props) => {
    let { addToCart } = props;
    // console.log(props.maxQty)
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full max-w-[22rem]" >
                <Link href={`/products/${props.slug}`} className='w-full h-96'>
                    <img src={`${props.src}`} className=" w-full h-96 hover:scale-105 transition-all  object-cover object-top rounded-lg shadow-md" /></Link>

                <div className="w-56 -mt-10 z-10 overflow-hidden hover:scale-110 transition-all bg-white rounded-lg shadow-lg md:w-64 dark:bg-neutral-800">
                    <h3 className="py-2 font-bold tracking-wide text-center text-neutral-800 uppercase dark:text-white">{props.title}</h3>

                    <div className="flex items-center justify-between px-3 py-2 bg-neutral-200 dark:bg-neutral-700">
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">₹ {props.price}</span>
                        <button onClick={() => {
                            addToCart(props.slug, 1, props.price, props.title, props.size, props.Color, props.maxQty);
                            toast.success('Item added to cart');
                        }} className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-neutral-800 rounded hover:bg-neutral-700 dark:hover:bg-neutral-600 focus:bg-neutral-700 dark:focus:bg-neutral-600 focus:outline-none">Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item