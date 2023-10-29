// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "El Id no es valido" + id,
    });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({
        message: "Metodo no soportado",
      });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connectDB();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(404).json({ message: "No se encontro la entrada" + id });
  }
  // Si recibimos la descripcion o status en el body, actualizamos la entrada sino utiliza el valor anterior.
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    ); // Para que corra las validaciones del modelo y nos devuelva el objeto actualizado
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connectDB();
  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    return res.status(404).json({ message: "No se encontro la entrada" + id });
  }

  return res.status(200).json(entry);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connectDB();
  const entry = await Entry.findByIdAndDelete(id);
  await db.disconnect();

  if (!entry) {
    return res.status(404).json({ message: "No se encontro la entrada" + id });
  }

  return res.status(200).json(entry);
};
