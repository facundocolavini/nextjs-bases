// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(req, res);
    
    default:
      return res.status(400).json({
        message: "Metodo no soportado",
      });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connectDB();
  const entries: IEntry[] = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();

  return res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body;
  const newEntry = new Entry({ description, createdAt: Date.now() }); // Solo mandamos la descripcion porque el id se genera automaticamente
  try {
    await db.connectDB();
    await newEntry.save();
    await db.disconnect();
    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return res.status(500).json({ message: "Algo salio mal, revisar consola del servidor" });
  }
 
};
