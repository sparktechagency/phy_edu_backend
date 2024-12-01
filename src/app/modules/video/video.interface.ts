import { Types } from 'mongoose';

export interface IVideo {
  title: string;
  description: string;
  thumbnail_image: string;
  video: string;
  category: Types.ObjectId;
  totalView: number;
}
