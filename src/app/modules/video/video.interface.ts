import { Types } from 'mongoose';
import { ENUM_CONTENT_LANGUAGE } from '../../utilities/enum';

export interface IVideo {
  title: string;
  description: string;
  thumbnail_image: string;
  video: string;
  category: Types.ObjectId;
  totalView: number;
  language: (typeof ENUM_CONTENT_LANGUAGE)[keyof typeof ENUM_CONTENT_LANGUAGE];
}
