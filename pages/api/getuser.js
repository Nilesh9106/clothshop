// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../middleware/mongoose'
import Order from '../../models/Order';

const handler = async (req, res) => {
    let users = [];
    users =await Order.find();
    
    res.status(200).json({users })
    
}

export default connectDB(handler)