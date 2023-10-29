import { isValidObjectId } from "mongoose"

import { Entry, IEntry } from "../models";
import { db } from ".";


export const getEntryById = async (id: string):Promise<IEntry | null> => {
    if(!isValidObjectId(id)) return null;
    
    await db.connectDB();
    const entry = await Entry.findById(id).lean();  // lean() sirve para trabajar con menos informacion
    await db.disconnect();
    
    return JSON.parse(JSON.stringify(entry)); // Para serializar el objeto
} 
