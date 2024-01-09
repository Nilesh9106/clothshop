import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"

const Sidebar = ({ setRoute }) => {
    const [isSide, SetIsSide] = useState(false)
    return (
        <>
            <div className="md:hidden dark:bg-neutral-800 p-3">
                <button className=" " onClick={() => SetIsSide(!isSide)}>
                    <AiOutlineMenu className="text-xl " />
                </button>
            </div>
            <div className={`sticky top-[90px] dark:bg-neutral-800 text-white h-screen   md:w-[300px]  ${isSide ? "max-md:block" : "max-md:hidden"}`}>
                <ul>
                    <li onClick={() => setRoute('home')} className="mb-2 cursor-pointer transition-all rounded hover:bg-neutral-900 p-2">Dashboard</li>
                    <li onClick={() => setRoute('addProduct')} className="mb-2 cursor-pointer transition-all rounded hover:bg-neutral-900 p-2">Add Products</li>
                    <li onClick={() => setRoute('products')} className="mb-2 cursor-pointer transition-all rounded hover:bg-neutral-900 p-2">All Products</li>
                    <li onClick={() => setRoute('orders')} className="mb-2 cursor-pointer transition-all rounded hover:bg-neutral-900 p-2">All Orders</li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
