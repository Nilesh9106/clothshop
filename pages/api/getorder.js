// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from '../../models/Order'
import connectDB from '../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let Email = JSON.parse(req.body).Email;
        
        let order = await Order.find({Email:Email});

        res.status(200).json({order})
    }else{
        
        res.status(400).json({error : 'bad request'})
    }
    
}

export default connectDB(handler)