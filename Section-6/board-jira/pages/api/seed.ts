// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { Entry } from "../../models";


type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      message: "No se puede ejecutar en producción",
    });
  }

  await db.connectDB();
  await Entry.deleteMany(); // Elimina todo lo de la base de datos de la coleccion de entrada
  await Entry.insertMany(seedData.entries); // Inserta los datos de la base de datos de la coleccion de entrada
  await db.disconnect();

  res.status(200).json({
    message: "Proceso de seed ejecutado correctamente",
  });
}
