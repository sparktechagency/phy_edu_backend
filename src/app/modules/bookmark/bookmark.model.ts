import { Schema, model } from 'mongoose';
import { IArticleBookmark, IVideoBookmark } from './bookmark.interface';

const ArticleBookmarkSchema = new Schema<IArticleBookmark>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'NormalUser', required: true },
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  },
  {
    timestamps: true,
  },
);

const VideoBookmarkSchema = new Schema<IVideoBookmark>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'NormalUser', required: true },
    video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  },
  {
    timestamps: true,
  },
);

export const ArticleBookmark = model<IArticleBookmark>(
  'ArticleBookmark',
  ArticleBookmarkSchema,
);

export const VideoBookmark = model<IVideoBookmark>(
  'VideoBookmark',
  VideoBookmarkSchema,
);
