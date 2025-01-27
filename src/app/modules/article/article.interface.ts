import { Types } from 'mongoose';

// interface for i article
export interface IArticle {
  category: Types.ObjectId;
  title: string;
  description: string;
  article_images: string[];
}
