import { Schema, model } from 'mongoose';
import { IVideo } from './video.interface';

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail_image: { type: String, required: true },
    video: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    totalView: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Video = model<IVideo>('Video', VideoSchema);
