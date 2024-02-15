import { connectToDB } from "@utils/connectDB"
import Collection from "@models/Collection"
import { getServerSession } from "next-auth"
import { authOptions } from "@api/auth/[...nextauth]/route"

export const GET = async (req, res) => {

  try {
    const session = await getServerSession(authOptions)
    console.log("call");
    await connectToDB()


    const collections = await Collection.find({
      userId: session?.user.id
    })
      .populate('userId')
    return new Response(JSON.stringify(collections), {
      status: 200
    })
  } catch (err) {
    return new Response(JSON.stringify({
      error: "Filed to fetch collections"
    }), { status: 500 })
  }
}