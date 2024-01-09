// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from '../../models/Product'
import connectDB from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.length; i++) {

            
            
            let p = new Product({
                Title: req.body[i].Title,
                Slug: req.body[i].Slug,
                Desc: req.body[i].Desc,
                Img: req.body[i].Img, 
                Category: req.body[i].Category,
                Size: req.body[i].Size,
                Color: req.body[i].Color,
                Price: req.body[i].Price,
                AvailableQty: req.body[i].AvailableQty,
            })
            await p.save();
            res.status(200).json({ success: 'success' })

        }
    } else {
        res.status(400).json({ error: 'bad request' })
    }
}

export default connectDB(handler)