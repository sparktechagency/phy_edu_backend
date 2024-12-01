import { Types } from 'mongoose';

export interface IArticle {
  category: Types.ObjectId;
  title: string;
  description: string;
  article_images: string[];
}
