import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongo";
import Product from "@/models/Product";

type Data = {
  status: number;
  data?: any;
  message: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, cookies } = req;

  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    console.log("ini tanpa /id");

    try {
      const product = await Product.find();
      res.status(200).json({
        status: 200,
        message: "successfully get products",
        data: product,
      });
    } catch (error) {
      const e: Error = error as Error;
      console.log(e);
      res.status(500).json({ status: 500, message: e.message });
    }
  }
  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res
        .status(401)
        .json({ status: 401, message: "Not Authentication" });
    }

    try {
      const product = await Product.create(req.body);
      res.status(201).json({
        status: 201,
        message: "successfully create product",
        data: product,
      });
    } catch (err) {
      let e: Error = err as Error;
      return res.status(500).json({ status: 500, message: e.message });
    }
  }
}
