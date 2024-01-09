import Item from '../components/item';
import Product from '../models/Product';
import mongoose from 'mongoose';
import Head from 'next/head';
const tShirts = ({ addToCart, products }) => {
    return (
        <>
            <Head>
                <title>T-tShirts</title>
            </Head>
            <section className="dark:text-neutral-400 text-black">
                <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center md:justify-start gap-5">
                    {
                        Object.keys(products).map((index) => {
                            let data = products[index];
                            return (
                                <Item key={data.Slug} src={data.Img} maxQty={data.AvailableQty} size={data.Size[0]} Color={data.Color[0]} addToCart={addToCart} title={data.Title} slug={data.Slug} price={data.Price} />
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    let products = await Product.find({ Category: 'tshirt' });
    let tshirts = {}
    for (let item of products) {
        if (item.Title in tshirts) {
            if (!tshirts[item.Title].Color.includes(item.Color) && item.AvailableQty > 0) {
                tshirts[item.Title].Color.push(item.Color)

            }
            if (!tshirts[item.Title].Size.includes(item.Size) && item.AvailableQty > 0) {
                tshirts[item.Title].Size.push(item.Size)

            }
        } else {
            tshirts[item.Title] = JSON.parse(JSON.stringify(item));

            if (item.AvailableQty > 0) {
                tshirts[item.Title].Color = [item.Color]
                tshirts[item.Title].Size = [item.Size]
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
    }
}

export default tShirts