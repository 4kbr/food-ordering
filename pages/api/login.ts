import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

type Data = {
  status: number;
  message: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      const { username, password } = req.body;
      if (
        username === process.env.USERNAME &&
        password === process.env.PASSWORD
      ) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", process.env.TOKEN, {
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json({ status: 200, message: "Successfully Login" });
      } else {
        res.status(400).json({ status: 400, message: "Wrong Credentials" });
      }
      break;
    default:
      res.status(500).json({ status: 500, message: "Can't Access" });
      break;
  }
}
