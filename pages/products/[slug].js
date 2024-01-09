import mongoose from 'mongoose'
import Product from '../../models/Product'
import { BsCartPlus } from 'react-icons/bs'
import { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const Slug = ({ product, addToCart, colorSizeSlug, buyNow }) => {

  const [Color, setColor] = useState(product.Color);
  const [Size, setSize] = useState(product.Size);

  const variantsRefresh = (color, size) => {
    let url = `/products/${colorSizeSlug[color][size]['Slug']}`
    Router.push({ pathname: url, query: { slug: colorSizeSlug[color][size]['Slug'] } }, `/products/${colorSizeSlug[color][size]['Slug']}`)

  }

  return <>
    <Head>
      <title>{product.Title}</title>
    </Head>
    <section className="text-neutral-600 body-font dark:text-white overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 mx-auto lg:h-[90vh]  object-contain  object-top rounded" src={`${product.Img}`} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-neutral-500 dark:text-white tracking-widest">{product.Category} </h2>
            <h1 className="text-neutral-900 dark:text-neutral-50 text-3xl title-font font-medium mb-1">{product.Title} ( {product.Size}/{product.Color} )</h1>

            <p className="leading-relaxed">{product.Desc}</p>

            {/* size and colors */}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-neutral-100 mb-5">
              {/* colors  */}
              <div className="flex">
                <span className="mr-3">Color</span>
                {
                  Object.keys(colorSizeSlug).map((data) => {
                    let variant = colorSizeSlug[data];

                    return <div key={data}>{Object.keys(variant).includes(Size) && <button onClick={() => {
                      setColor(data)
                      variantsRefresh(data, Size)
                    }} className={` ${Color === data && 'ring-2'} border-2 border-neutral-300 ml-1  bg-neutral-700 rounded-full w-6 h-6 focus:outline-none`} style={{ backgroundColor: data }} />}</div>

                  })

                }
              </div>
              {/* size  */}
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={Size} onChange={(e) => {
                    setSize(e.target.value);
                    variantsRefresh(Color, e.target.value)
                  }} className="rounded border appearance-none border-neutral-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                    {
                      Object.keys(colorSizeSlug[Color]).map((data) => {
                        return <option key={data}>{data}</option>
                      })
                    }

                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-neutral-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* buttons  */}
            <div className="flex">
              <span className="title-font font-medium text-2xl ">₹ {product.Price}</span>
              <button onClick={() => {
                buyNow(product.Slug, 1, product.Price, product.Title, Size, Color)
              }} className="flex ml-10 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Buy Now</button>
              <button onClick={() => {

                addToCart(product.Slug, 1, product.Price, product.Title, Size, Color, product.AvailableQty)
                toast.success('Item Added to Cart Successfully', {
                  position: "bottom-left",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                })
              }} className="rounded-full w-10 h-10 bg-neutral-200 p-0 border-0 inline-flex items-center justify-center text-neutral-500 ml-4">
                <BsCartPlus className='text-xl font-bold' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ToastContainer />
  </>
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let slug = context.query.slug;

  let product = await Product.findOne({ Slug: slug });
  let variants = await Product.find({ Title: product.Title });
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.Color)) {
      colorSizeSlug[item.Color][item.Size] = { Slug: item.Slug }
    } else {
      colorSizeSlug[item.Color] = {}
      colorSizeSlug[item.Color][item.Size] = { Slug: item.Slug }
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), colorSizeSlug: JSON.parse(JSON.stringify(colorSizeSlug)), }, // will be passed to the page component as props
  }
}
export default Slug