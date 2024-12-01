import { Types } from 'mongoose';

export interface IArticleBookmark {
  user: Types.ObjectId;
  article: Types.ObjectId;
}

export interface IVideoBookmark {
  user: Types.ObjectId;
  video: Types.ObjectId;
}
