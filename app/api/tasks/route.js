import { connectToDB } from "@utils/connectDB"
import Task from "@models/Task"
import { getServerSession } from "next-auth"
import { authOptions } from "@api/auth/[...nextauth]/route"

export const GET = async (req, res) => {

  try {
    const session = await getServerSession(authOptions)
    await connectToDB()


    const tasks = await Task.find({
      userId: session?.user.id
    })
      .populate('userId')

    return new Response(JSON.stringify(tasks), {
      status: 200
    })
  } catch (err) {
    return new Response(JSON.stringify({
      error: "Filed to fetch tasks"
    }), { status: 500 })
  }
}