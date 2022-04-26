import { NextApiResponse, NextApiRequest } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      res.status(200).json({
        download_url:
          "https://drive.google.com/file/d/1fHnPtgyW4UB5W267leF1ckGgnvwZjrCW/view?usp=sharing",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
