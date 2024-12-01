import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { ArticleBookmark } from './bookmark.model';
import { Article } from '../article/article.model';
import QueryBuilder from '../../builder/QueryBuilder';

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
