import { Schema, model } from 'mongoose';
import { IArticle } from './article.interface';
import { ENUM_CONTENT_LANGUAGE } from '../../utilities/enum';

const ArticleSchema = new Schema<IArticle>(
  {
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    summery: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    article_images: { type: [String], required: true },
    language: {
      type: String,
      enum: Object.values(ENUM_CONTENT_LANGUAGE),
    },
  },
  { timestamps: true },
);

export const Article = model<IArticle>('Article', ArticleSchema);
