import { db } from "@/database";
import { seedData } from "@/database/seed-data";
import { EntryModel } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso al servicio' })
  }

  await db.connect();
  await EntryModel.deleteMany()

  await EntryModel.insertMany(seedData.entries)

  await db.disconnect();

  res.status(200).json({
    message: 'Proceso realizado'
  })
}