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
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const orders = await Order.find();
        res.status(200).json({
          status: 200,
          message: "successfully get orders",
          data: orders,
        });
      } catch (error) {
        const e: Error = error as Error;
        console.log(e);
        res.status(500).json({ status: 500, message: e });
      }
      break;
    case "POST":
      console.log("test ini post order");

      try {
        const order = await Order.create(req.body);
        res.status(201).json({
          status: 201,
          message: "successfully create order",
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
