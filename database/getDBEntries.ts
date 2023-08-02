import mongoose, { isValidObjectId } from "mongoose"
import { db } from ".";
import { EntryModel } from "@/models";


export const getEntryById = async (id: string) => {

  if (!isValidObjectId(id)) return null;

  db.connect()

  const entry = await EntryModel.findById(id).lean()

  db.disconnect()

}