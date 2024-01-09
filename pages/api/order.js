// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../middleware/mongoose'
import Order from '../../models/Order';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let { Email, Cart, Address, Pincode, Phone, subTotal } = JSON.parse(req.body);
        let oid = Math.floor(Math.random() * Date.now());
        let order = new Order({
            OrderId: oid,
            Email: Email,
            Products: Cart,
            Address: Address,
            PinCode: Pincode,
            Phone: Phone,
            Amount: subTotal,
        })
        await order.save()


        res.status(200).json({ id: oid })
    } else if (req.method == 'PUT') {
        let { id, status } = JSON.parse(req.body);
        let order = await Order.findOne({ OrderId: id })
        order.Status = status
        await order.save()
        res.status(200).json({ id: id })
    } else {
        res.status(400).json({ error: 'bad request' })
    }
}

export default connectDB(handler)