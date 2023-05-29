import Order from "@/models/Order";
import dbConnect from "@/utils/mongo";
import type { NextApiRequest, NextApiResponse } from "next";

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
        const order = await Order.findById(query.id);
        res
          .status(200)
          .json({
            status: 200,
            message: "successfully get order by id",
            data: order,
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
