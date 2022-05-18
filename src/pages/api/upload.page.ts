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
import pdfjson from "pdf2json";

const promFs = fs.promises;
const reader = new PdfReader();

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

apiRoute.post(async (req: FileRequest, res: NextApiResponse) => {
  const file = fs.readFileSync(req.file.path);

  const studentData = {};

  const arr = [];

  // new PdfReader().parseFileItems(req.file.path, (err, item) => {
  //   if (err) {
  //     console.error("error:", err);
  //   } else if (!item) {
  //     console.warn("end of file");
  //     return;
  //   } else if (item.text) {
  //     arr.push(item.text);
  //   }

  //   console.log(arr);
  // });

  const test = await promFs.readFile(req.file.path);

  let stuff;

  const pdfParser = new pdfjson();

  pdfParser.on("pdfParser_dataError", (errData) => console.error(errData.parserError));
  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    // fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
    console.log(pdfData);
  });

  pdfParser.loadPDF(req.file.path);

  // const filePromise = new Promise((resolve, reject) => {
  //   new PdfReader().parseBuffer(test, (err, item) => {
  //     if (err) reject();
  //     else if (!item) console.warn("end of buffer");
  //     else if (item.text) {
  //       arr.push(item.text);
  //       stuff = arr;
  //       // console.log(stuff);
  //     }
  //   });

  //   resolve(null);
  //   console.log(stuff);
  // });

  // new PdfReader().parseBuffer(test, (err, item) => {
  //   if (err) console.error("error:", err);
  //   else if (!item) console.warn("end of buffer");
  //   else if (item.text) arr.push(item.text);
  // });

  // filePromise
  //   .then(() => {
  //     res.status(200).json({ message: "yes", data: arr });
  //   })
  //   .catch(() => console.log("process ended"));

  // pdf(file).then(function (data) {
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
  //   stuff = data.text;
  // });

  res.json({ stuff });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
