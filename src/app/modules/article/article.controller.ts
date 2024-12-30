import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import ArticleService from './article.service';

const createArticle = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'article_images' in files) {
    // req.body.profile_image = files['thumbnail_image'][0].path;
    req.body.article_images = files['article_images'].map(
      (file) => `${file.path}`,
    );
  }
  const result = await ArticleService.createArticleIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Article created successfully',
    data: result,
  });
});
const updateArticle = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'article_images' in files) {
    const newImages = files['article_images'].map((file) => `${file.path}`);

    req.body?.article_images?.push(...newImages);
  }
  const result = await ArticleService.updateArticleIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Article updated successfully',
    data: result,
  });
});

// get single article

const getSingleArticle = catchAsync(async (req, res) => {
  const result = await ArticleService.getSingleArticleFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Article retrieved successfully',
    data: result,
  });
});

// get all videos
const getAllArticle = catchAsync(async (req, res) => {
  const result = await ArticleService.getAllArticleFromDB(
    req?.user?.profileId,
    req?.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Article retrieved successfully',
    data: result,
  });
});
const deleteArticle = catchAsync(async (req, res) => {
  const result = await ArticleService.deleteArticleFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Article deleted successfully',
    data: result,
  });
});

const ArticleController = {
  createArticle,
  updateArticle,
  getAllArticle,
  deleteArticle,
  getSingleArticle,
};

export default ArticleController;
