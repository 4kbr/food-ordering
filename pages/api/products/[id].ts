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
    cookies,
  } = req;

  const token = cookies.token;

  if ((!token || token !== process.env.TOKEN) && method !== "GET") {
    return res.status(401).json({ status: 401, message: "Not Authentication" });
  }
  await dbConnect();

  switch (method) {
    case "GET":
      console.log("ini /id ");
      try {
        const product = await Product.findById(id);
        if (!product)
          return res.status(404).json({ status: 404, message: "Not found" });
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
    case "PUT":
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json({
          status: 200,
          message: "successfully update product",
          data: product,
        });
      } catch (err) {
        let e: Error = err as Error;
        return res.status(500).json({ status: 500, message: e.message });
      }
      break;

    case "DELETE":
      try {
        await Product.findByIdAndDelete(id);
        res
          .status(200)
          .json({ status: 200, message: "The product has been deleted" });
      } catch (error) {
        res.status(500).json({ status: 500, message: error });
      }
      break;
    default:
      return res.status(500).json({
        status: 500,
        message: "Undefined Method",
      });
  }
}
