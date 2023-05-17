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
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      console.log("ini /id ");

      try {
        const product = await Product.findById(id);
        res.status(200).json({
          status: 200,
          message: "successfully get product",
          data: product,
        });
      } catch (error) {
        const e: Error = error as Error;
        console.log(e);
        return res.status(500).json({ status: 500, message: e.message });
      }
      break;

    case "POST":
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
      break;
    default:
      return res.status(500).json({
        status: 500,
        message: "Undefined Method",
      });
  }
}
