// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../middleware/mongoose'
import Order from '../../models/Order';

const handler = async (req, res) => {
    let orders = await Order.find();
    // console.log(products);

    res.status(200).json({ orders: orders })
}

export default connectDB(handler)