import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (req.method === "POST") {
    if (username === "admin" && password === "admin") {
      res.status(200).json({
        message: "Login successful",
        user: {
          id: 1,
          username: username,
          token: "fake-jwt-token",
        },
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
