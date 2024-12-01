import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { ArticleBookmark, VideoBookmark } from './bookmark.model';
import { Article } from '../article/article.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Video } from '../video/video.model';

const articleBookmarkAddDelete = async (
  profileId: string,
  articleId: string,
) => {
  // check if article exists
  const article = await Article.findById(articleId);
  if (!article) {
    throw new AppError(httpStatus.NOT_FOUND, 'Article not found');
  }
  const bookmark = await ArticleBookmark.findOne({
    user: profileId,
    article: articleId,
  });
  if (bookmark) {
    const result = await ArticleBookmark.findOneAndDelete({
      user: profileId,
      article: articleId,
    });
    return result;
  } else {
    const result = await ArticleBookmark.create({
      user: profileId,
      article: articleId,
    });
    return result;
  }
};

const getAllArticleBookmark = async (query: Record<string, unknown>) => {
  const articleBookmarkQuery = new QueryBuilder(ArticleBookmark.find(), query)
    .search([''])
    .fields()
    .filter()
    .paginate()
    .sort();
  const meta = await articleBookmarkQuery.countTotal();
  const result = await articleBookmarkQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const videoBookmarkAddDelete = async (profileId: string, videoId: string) => {
  // Check if video exists
  const video = await Video.findById(videoId);
  if (!video) {
    throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
  }

  const bookmark = await VideoBookmark.findOne({
    user: profileId,
    video: videoId,
  });

  if (bookmark) {
    const result = await VideoBookmark.findOneAndDelete({
      user: profileId,
      video: videoId,
    });
    return result;
  } else {
    const result = await VideoBookmark.create({
      user: profileId,
      video: videoId,
    });
    return result;
  }
};

const getAllVideoBookmark = async (query: Record<string, unknown>) => {
  const videoBookmarkQuery = new QueryBuilder(VideoBookmark.find(), query)
    .search([''])
    .fields()
    .filter()
    .paginate()
    .sort();
  const meta = await videoBookmarkQuery.countTotal();
  const result = await videoBookmarkQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const BookmarkService = {
  articleBookmarkAddDelete,
  getAllArticleBookmark,
  videoBookmarkAddDelete,
  getAllVideoBookmark,
};

export default BookmarkService;
