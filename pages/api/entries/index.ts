import { db } from "@/database";
import { EntryModel, IEntry } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry[] | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntry(req, res)
    default:
      return res.status(400).json({ message: 'EndPoint Not Found' });
  }

}


const getEntries = async (res: NextApiResponse<Data>) => {

  await db.connect()
  const entries = await EntryModel.find().sort({ createdAt: 'ascending' })
  res.status(200).json(entries)

  await db.disconnect()

}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body

  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
    status: 'pending'
  })

  try {
    await db.connect()

    await newEntry.save()

    await db.disconnect()

    return res.status(201).json(newEntry)
  } catch (error) {
    await db.disconnect()
    return res.status(500).json({ message: 'Algo salio mal!' })
  }
}
