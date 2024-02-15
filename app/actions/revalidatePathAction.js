
'use server'
import { revalidatePath } from "next/cache"

export const handleRevalidate = async (path) => {
  
  
  revalidatePath(path)
}