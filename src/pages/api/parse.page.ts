import type { NextApiRequest, NextApiResponse } from "next";
import { PdfReader } from "pdfreader";
import fs from "fs";
import pdf from "pdf-parse";
import getConfig from "next/config";
import path from "path";
const { serverRuntimeConfig } = getConfig();

const filePath = path.join(serverRuntimeConfig.PROJECT_ROOT, "/public/example.pdf");

const dataBuffer = fs.readFileSync(filePath);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      new PdfReader().parseFileItems(filePath, (err, item) => {
        if (err) console.error("error:", err);
        else if (!item) console.warn("end of file");
        else if (item.text) {
          console.log(typeof item.text);
        }
      });

      // pdf(dataBuffer).then(function (data) {
      //   // number of pages
      //   console.log(data.numpages);
      //   // number of rendered pages
      //   console.log(data.numrender);
      //   // PDF info
      //   console.log(data.info);
      //   // PDF metadata
      //   console.log(data.metadata);
      //   // PDF.js version
      //   // check https://mozilla.github.io/pdf.js/getting_started/
      //   console.log(data.version);
      //   // PDF text
      //   console.log(data.text);
      // });

      res.status(200).json({ message: "done" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
