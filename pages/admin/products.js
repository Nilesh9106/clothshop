import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AllProducts = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const getProducts = async () => {
            const res = await fetch('/api/products');
            const data = await res.json();
            // console.log(data);
            setProducts(data.products);
        }
        getProducts();
    }, []);
    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            {products.length && <div className="overflow-x-auto mx-auto container w-full my-10">
                <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                    <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Title
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Category
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Color
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Size
                            </th>
                            <th scope="col" className="py-3 px-6">
                                price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Available Qty
                            </th>
                            <th scope="col" className="py-3 px-6">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(products).map((data, index) => {

                            return (
                                <tr className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100" key={index}>
                                    <th scope="row" className="py-4 px-6 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                                        {data.Title}
                                    </th>
                                    <td className="py-4 px-6">
                                        {data.Category}
                                    </td>

                                    <td className="py-4 px-6">
                                        {data.Color}
                                    </td>
                                    <td className="py-4 px-6">
                                        {data.Size}
                                    </td>
                                    <td className="py-4 px-6">
                                        ₹ {data.Price}
                                    </td>
                                    <td className="py-4 px-6">
                                        {data.AvailableQty}
                                    </td>
                                    <td onClick={() => {
                                        console.log(`/products/${data.Slug}`);
                                        router.push(`/products/${data.Slug}`)
                                    }} className="py-4 cursor-pointer text-blue-500  underline underline-offset-2 px-6">
                                        View Product
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




export default AllProducts;