import React, { useState } from 'react'
import AddProducts from './addproduct'
import Orders from './orders'
import Products from './products'
import Sidebar from '../../components/sidebar'


export default function Dashboard() {
    const [route, setRoute] = useState("home")
    return (
        <div className='flex'>
            <Sidebar setRoute={setRoute} />
            {route === "home" && <Home />}
            {route === "addProduct" && <AddProducts />}
            {route === "products" && <Products />}
            {route === "orders" && <Orders />}
        </div>
    )
}

const Home = () => {
    return (
        <h1 className='text-4xl text-center p-3'>
            Dashboard
        </h1>
    )
}
