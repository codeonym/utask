"use server"
import { BASE_URL } from "@config"
import { getServerSession } from "next-auth"
import { authOptions } from "@api/auth/[...nextauth]/route"

export const createAction = async (formData) => {
  const session = await getServerSession(authOptions)
  console.log(session);
  if (!session?.user) {
    return
  }
  const data = {
    userId: session.user.id,
    title: formData.get('title'),
    description: formData.get('description')
  }
  const res = await fetch(`${BASE_URL}/api/collections/new`, {
    method: "POST",
    body: JSON.stringify(data),
  })
  return res.json()
}