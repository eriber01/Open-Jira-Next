import { db } from '@/database'
import { EntryModel, IEntry } from '@/models'
import { isValidObjectId } from "mongoose"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | IEntry[] | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getEntry(req, res)
    case 'PUT':
      return updateEntry(req, res)
    case 'DELETE':
      return deleteEntryById(req, res)
    default:
      return res.status(400).json({ message: 'EndPoint Not Found' });
  }
}


const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = req.query

  try {
    await db.connect()
  } catch (error) {
    res.status(500).json({ message: 'Error connect to Database' })
  }

  const entry = await EntryModel.findById(id).lean()

  if (!entry) {
    await db.disconnect()
    return res.status(400).json({ message: 'Entry Not Found' });
  }

  db.disconnect()

  return res.status(200).json(entry);

}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  try {
    await db.connect()
    const entryToUpdate = await EntryModel.findById(id)

    if (!entryToUpdate) {
      await db.disconnect()
      return res.status(400).json({ message: 'Entry Not Found' });
    }

    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status
    } = req.body

    const updatedEntry = await EntryModel.findByIdAndUpdate(id, { description, status }, { new: true })

    await db.disconnect()

    return res.status(200).json(updatedEntry!)
  } catch (error) {
    return res.status(500).json({ message: 'Error actualizando la Entrada' })
  }

}



export const deleteEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  if (!isValidObjectId(id)) return res.status(500).json({ message: 'Entrada no encontrada' });

  try {

    await db.connect();
    const entry = await EntryModel.findByIdAndDelete({ _id: id })
    await db.disconnect()

    return res.status(200).json(entry!)
  } catch (error) {
    return res.status(500).json({ message: 'Error Borrando la Entrada' })
  }
}