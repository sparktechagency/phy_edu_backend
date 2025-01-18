/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import QueryBuilder from '../../builder/QueryBuilder';
import Category from '../category/category.model';
import fs from 'fs/promises';
import path from 'path';
import { IArticle } from './article.interface';
import { Article } from './article.model';
import { ArticleBookmark } from '../bookmark/bookmark.model';
const createArticleIntoDB = async (payload: IArticle) => {
  const category = await Category.findById(payload.category);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  const result = await Article.create(payload);
  return result;
};

// update the video----------------------------
const updateArticleIntoDB = async (id: string, payload: Partial<IArticle>) => {
  const article = await Article.findById(id);
  if (!article) {
    throw new AppError(httpStatus.NOT_FOUND, 'Article not found');
  }
  const result = await Article.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// get all videos------------------------------

const getAllArticleFromDB = async (
  profileId: string,
  query: Record<string, unknown>,
) => {
  const articleQuery = new QueryBuilder(Article.find().lean(), query)
    .search(['title'])
    .fields()
    .filter()
    .paginate()
    .sort();
  const meta = await articleQuery.countTotal();
  const result = await articleQuery.modelQuery;

  const bookmarks = await ArticleBookmark.find({ user: profileId }).select(
    'article',
  );
  const bookmarkArticleIds = new Set(
    bookmarks.map((b) => b?.article?.toString()),
  );

  const enrichedResult = result.map((article) => ({
    ...article,
    isBookmark: bookmarkArticleIds.has((article as any)._id.toString()),
  }));

  return {
    meta,
    result: enrichedResult,
  };
};

// get single article------------------
const getSingleArticleFromDB = async (profileId: string, id: string) => {
  const result = await Article.findById(id).populate('category');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Article not found');
  }

  const bookmarkArticle = await ArticleBookmark.findOne({
    article: result._id,
    user: profileId,
  });

  const articleWithBookmarkStatus = {
    ...result.toObject(),
    isBookmarked: !!bookmarkArticle,
  };

  return articleWithBookmarkStatus;
};

// delete video----------------

const deleteArticleFromDB = async (id: string) => {
  const article = await Article.findById(id);
  if (!article) {
    throw new AppError(httpStatus.NOT_FOUND, 'Article not found');
  }

  // the associated article images
  const rootPath = process.cwd();

  const deletionPromises = article.article_images.map(async (image) => {
    const articleImagePath = path.join(rootPath, image); // Construct the full image path

    try {
      await fs.unlink(articleImagePath);
    } catch (error) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Error deleting associated file: ${image}`,
      );
    }
  });
  await Promise.all(deletionPromises);

  const result = await Article.findByIdAndDelete(id);
  return result;
};

const ArticleService = {
  createArticleIntoDB,
  updateArticleIntoDB,
  getAllArticleFromDB,
  deleteArticleFromDB,
  getSingleArticleFromDB,
};

export default ArticleService;
