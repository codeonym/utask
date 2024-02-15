import { connectToDB } from "@utils/connectDB"
import Collection from "@models/Collection"
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
    const { collectionId } = await req.json()
    const collection = await Collection.findOne({
      _id: collectionId,
    }).populate('userId')


    return new Response(JSON.stringify(collection), {
      status: 200
    })
  } catch (err) {
    // console.log(err);
    return new Response(JSON.stringify({
      error: "Failed to fetch collection"
    }), { status: 500 })
  }
}
