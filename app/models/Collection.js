import { Schema, model, models } from "mongoose"


const CollectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
},
  {
    timestamps: true
  }
)


const Collection = models.Collection || model("Collection", CollectionSchema)

export default Collection