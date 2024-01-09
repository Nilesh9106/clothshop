// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../middleware/mongoose'
import User from '../../models/User';
import AES from 'crypto-js/aes'
const handler = async (req, res) => {
    if (req.method == 'POST') {
        let {Name,Email,Password} = JSON.parse(req.body);

        try {
            let u = new User({
                Name:Name,
                Email:Email,
                Password:AES.encrypt(Password,'@NILESH003').toString()
            })
            await u.save();
            res.status(200).json({ res: "success" })
        } catch (error) {
            res.status(200).json({ res: "error" })
        }

    } else {
        res.status(400).json({ error: 'bad request' })
    }
}

export default connectDB(handler)