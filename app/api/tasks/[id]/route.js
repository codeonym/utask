import { connectToDB } from "@utils/connectDB"
import Task from "@models/Task"
import { getServerSession } from "next-auth"
import { authOptions } from "@api/auth/[...nextauth]/route"

export const POST = async (req) => {

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
      })
    }
    await connectToDB()
    const { taskId } = await req.json()
    const task = await Task.findOne({
      _id: taskId,
    }).populate('userId')


    return new Response(JSON.stringify(task), {
      status: 200
    })
  } catch (err) {
    // console.log(err);
    return new Response(JSON.stringify({
      error: "Failed to fetch task"
    }), { status: 500 })
  }
}
