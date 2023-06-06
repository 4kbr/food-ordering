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
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token;

  if ((!token || token !== process.env.TOKEN) && method !== "GET") {
    return res.status(401).json({ status: 401, message: "Not Authentication" });
  }
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const order = await Order.findById(id);
        res.status(200).json({
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
    case "PUT":
      try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json({
          status: 200,
          message: "Successfully update order",
          data: order,
        });
      } catch (error) {
        res.status(500).json({ status: 500, message: error });
      }
      break;
    case "DELETE":
      try {
        await Order.findByIdAndDelete(id);
        res
          .status(200)
          .json({ status: 200, message: "Ther order has been deleted" });
      } catch (error) {
        res.status(500).json({ status: 500, message: error });
      }
      break;

    default:
      res
        .status(500)
        .json({ status: 500, message: "server can't handle request" });
      break;
  }
}
