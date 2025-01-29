import { Types } from 'mongoose';

// interface for i article
export interface IArticle {
  category: Types.ObjectId;
  title: string;
  summery: string;
  description: string;
  article_images: string[];
}
