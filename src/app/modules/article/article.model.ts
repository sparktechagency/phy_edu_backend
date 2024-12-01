import { Schema, model } from 'mongoose';
import { IArticle } from './article.interface';

const ArticleSchema = new Schema<IArticle>(
  {
    category: { type: Schema.Types.ObjectId },
    title: { type: String, required: true },
    description: { type: String, required: true },
    article_images: { type: [String], required: true },
  },
  { timestamps: true },
);

export const Article = model<IArticle>('Article', ArticleSchema);
