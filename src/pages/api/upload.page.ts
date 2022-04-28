import type { NextApiRequest, NextApiResponse } from "next";
import { PdfReader } from "pdfreader";
import fs from "fs";
import pdf from "pdf-parse";
import getConfig from "next/config";
import path from "path";
const { serverRuntimeConfig } = getConfig();
import multer from "multer";
import os from "os";
import nextConnect from "next-connect";

const upload = multer({ dest: os.tmpdir() });

const filePath = path.join(serverRuntimeConfig.PROJECT_ROOT, "/public/example.pdf");

const dataBuffer = fs.readFileSync(filePath);
export interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}

interface FileRequest extends NextApiRequest {
  file: MulterFile;
}

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
  onError(error, req, res) {
    console.log(error);
    res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req: FileRequest, res: NextApiResponse) => {
  console.log(req.file);
  res.status(200).json({ message: "yes" });
});

// function handler(req: FileRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       // new PdfReader().parseFileItems(filePath, (err, item) => {
//       //   if (err) console.error("error:", err);
//       //   else if (!item) console.warn("end of file");
//       //   else if (item.text) {
//       //     console.log(typeof item.text);
//       //   }
//       // });

//       // pdf(dataBuffer).then(function (data) {
//       //   // number of pages
//       //   console.log(data.numpages);
//       //   // number of rendered pages
//       //   console.log(data.numrender);
//       //   // PDF info
//       //   console.log(data.info);
//       //   // PDF metadata
//       //   console.log(data.metadata);
//       //   // PDF.js version
//       //   // check https://mozilla.github.io/pdf.js/getting_started/
//       //   console.log(data.version);
//       //   // PDF text
//       //   console.log(data.text);
//       // });

//       res.status(200).json({ message: "done" });
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).json({ message: "Something went wrong" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
//   }
// }

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
