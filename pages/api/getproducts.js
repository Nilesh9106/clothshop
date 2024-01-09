// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
  let cat;
  if (req.method == "POST") {
    cat = JSON.parse(req.body).cat
    // console.log(cat);
    let shirts = {};
    for (let item of products) {
      if (item.Category != cat && cat != "") {
        continue;
      }
      if (item.Title in shirts) {
        if (
          !shirts[item.Title].Color.includes(item.Color) &&
          item.AvailableQty > 0
        ) {
          shirts[item.Title].Color.push(item.Color);
        }
        if (
          !shirts[item.Title].Size.includes(item.Size) &&
          item.AvailableQty > 0
        ) {
          shirts[item.Title].Size.push(item.Size);
        }
      } else {
        shirts[item.Title] = JSON.parse(JSON.stringify(item));

        if (item.AvailableQty > 0) {
          shirts[item.Title].Color = [item.Color];
          shirts[item.Title].Size = [item.Size];
        }
      }
    }
    res.status(200).json({ shirts });
  } else {
    res.status(400).json({ err: "bad request!!" });
  }
};

export default connectDB(handler);
