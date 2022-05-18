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

const parsePdf = (file): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const result = [];

    new PdfReader().parseFileItems(file, function (err, item) {
      if (err) {
        console.log(err);
        reject(err);
      }

      // add text to page array
      if (item && item.text) {
        result.push(item.text.toLowerCase());
      }

      if (!item) {
        resolve(result);
        console.log("--successfully parsed pdf: ", file);
      }
    });
  });
};

apiRoute.post(async (req: FileRequest, res: NextApiResponse) => {
  const file = fs.readFileSync(req.file.path);

  const studentData = {
    name: "",
    dept: "",
    programme: "",
    matricNum: "",
    level: "",
    currentCgpa: "",
  };

  const arr = [];

  const pdfRes = await parsePdf(req.file.path);
  // console.log(pdfRes);

  const nameIndex = pdfRes.findIndex((word) => word.includes("student name"));
  const name = nameIndex > -1 ? pdfRes[nameIndex + 1] : "";

  res.json({ data: name });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
