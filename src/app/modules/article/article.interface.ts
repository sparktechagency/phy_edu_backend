import { Types } from 'mongoose';
import { ENUM_CONTENT_LANGUAGE } from '../../utilities/enum';

// interface for i article
export interface IArticle {
  category: Types.ObjectId;
  title: string;
  summery: string;
  description: string;
  article_images: string[];
  language: (typeof ENUM_CONTENT_LANGUAGE)[keyof typeof ENUM_CONTENT_LANGUAGE];
}
