import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import BookmarkService from './bookmark.service';

const articleBookmarkAddDelete = catchAsync(async (req, res) => {
  const result = await BookmarkService.articleBookmarkAddDelete(
    req.user.profileId,
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result
      ? 'Bookmark added successfully'
      : 'Bookmark deleted successfully',
    data: result,
  });
});

const getAllArticleBookmark = catchAsync(async (req, res) => {
  const result = await BookmarkService.getAllArticleBookmark(
    req.user.profileId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookmarks retrieved successfully',
    data: result,
  });
});

const videoBookmarkAddDelete = catchAsync(async (req, res) => {
  const result = await BookmarkService.videoBookmarkAddDelete(
    req.user.profileId,
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result
      ? 'Bookmark added successfully'
      : 'Bookmark deleted successfully',
    data: result,
  });
});

const getAllVideoBookmark = catchAsync(async (req, res) => {
  const result = await BookmarkService.getAllVideoBookmark(
    req.user.profileId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookmarks retrieved successfully',
    data: result,
  });
});

const BookmarkController = {
  articleBookmarkAddDelete,
  getAllArticleBookmark,
  videoBookmarkAddDelete,
  getAllVideoBookmark,
};

export default BookmarkController;
