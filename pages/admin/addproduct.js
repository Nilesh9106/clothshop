import { useState } from "react";
import { toast } from "react-toastify"
const AddProducts = () => {
    const [product, setProduct] = useState({
        Title: "",
        Slug: "",
        Desc: "",
        Img: "",
        Category: "",
        Size: "",
        Color: "",
        Price: 0,
        AvailableQty: 1,
    })
    const handleSubmit = async () => {
        console.log(product);
        fetch('/api/addproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([product])
        }).then(res => res.json()).then(data => {
            console.log(data);
            toast.success("Product Added")
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="flex-1">
            <div className="py-4 md:px-6 px-3 mx-auto md:w-3/4 w-full space-y-3 ">
                <h1 className="text-3xl text-center" >Add product</h1>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={(e) => {
                        setProduct({ ...product, Title: e.target.value })
                    }} className="w-full input" />
                </div>
                <div>
                    <label htmlFor="slug">Slug</label>
                    <input type="text" id="slug" onChange={(e) => {
                        setProduct({ ...product, Slug: e.target.value })
                    }} className="w-full input" />
                </div>
                <div>
                    <label htmlFor="desc">Desc</label>
                    <input type="text" id="desc" onChange={(e) => {
                        setProduct({ ...product, Desc: e.target.value })
                    }} className="w-full input" />
                </div>
                <div>
                    <label htmlFor="img">Img</label>
                    <input type="text" id="img" onChange={(e) => {
                        setProduct({ ...product, Img: e.target.value })
                    }} className="w-full input" />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" onChange={(e) => {
                        setProduct({ ...product, Category: e.target.value })
                    }} className="w-full input" />
                </div>
                <div>
                    <label htmlFor="size">Size</label>
                    <input type="text" id="size" onChange={(e) => {
                        setProduct({ ...product, Size: e.target.value })
                    }} className="w-full input" />
                </div>
                <div>
                    <label htmlFor="color">Color</label>
                    <input type="text" id="color" onChange={(e) => {
                        setProduct({ ...product, Color: e.target.value })
                    }} className="w-full input" />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" onChange={(e) => {
                        setProduct({ ...product, Price: e.target.value })
                    }} className="w-full input" />
                </div>
                <div >
                    <label htmlFor="qty">Available Qty</label>
                    <input type="number" id="qty" onChange={(e) => {
                        setProduct({ ...product, AvailableQty: e.target.value })
                    }} className="w-full input" />
                </div>
                <button onClick={handleSubmit} className="w-full bg-blue-500 rounded-md px-3 py-2">Add Product</button>
            </div>
        </div>
    );
};

export default AddProducts;
