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
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case "GET":
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
      break;
    default:
      res
        .status(500)
        .json({ status: 500, message: "server can't handle request" });
      break;
  }
}
