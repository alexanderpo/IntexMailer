import mongoose, { Schema } from 'mongoose';

const templateSchema = new Schema({
  title: String,
  category: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model('Templates', templateSchema);
