// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../middleware/mongoose'
import User from '../../models/User';
import AES from 'crypto-js/aes'
import enc from 'crypto-js/enc-utf8'
import jwt from 'jsonwebtoken'
const handler = async (req, res) => {
    let { Email, Password } = JSON.parse(req.body);


    if (req.method == 'POST') {
        try {
            let user = await User.findOne({ Email: Email });


            if (user) {
                let correctPassword = AES.decrypt(user.Password, '@NILESH003');
                correctPassword = correctPassword.toString(enc);
                if (correctPassword == Password) {
                    var token = jwt.sign({ Email: Email, Name: user.Name, isAdmin: user.isAdmin }, '@NILESH003', { expiresIn: '2d' });
                    res.status(200).json({ success: true, token })
                } else {
                    res.status(200).json({ res: "Wrong Password", success: false })
                }
            } else {
                res.status(200).json({ res: "User Not Found", success: false })
            }

        } catch (error) {
            res.status(500).json({ res: error, success: false })
        }

    } else {
        res.status(400).json({ error: 'bad request' })
    }
}

export default connectDB(handler)