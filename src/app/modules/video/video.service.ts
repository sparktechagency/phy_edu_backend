/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IVideo } from './video.interface';
import { Video } from './video.model';
import QueryBuilder from '../../builder/QueryBuilder';
import Category from '../category/category.model';
import { VideoBookmark } from '../bookmark/bookmark.model';
import unlinkFile from '../../helper/unLinkFile';
const createVideoIntoDB = async (payload: IVideo) => {
  const category = await Category.findById(payload.category);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  const result = await Video.create(payload);
  return result;
};

// update the video
const updateVideoIntoDB = async (id: string, payload: Partial<IVideo>) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
  }
  const result = await Video.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (payload.video) {
    unlinkFile(payload.video);
  }
  return result;
};

// get all videos
const getAllVideoFromDB = async (
  profileId: string,
  query: Record<string, unknown>,
) => {
  const videoQuery = new QueryBuilder(
    Video.find().populate({ path: 'category', select: 'name' }),
    query,
  )
    .search(['title'])
    .fields()
    .filter()
    .paginate()
    .sort();
  const meta = await videoQuery.countTotal();
  const result = await videoQuery.modelQuery;
  const bookmarks = await VideoBookmark.find({ user: profileId }).select(
    'video',
  );
  const bookmarkVideoIds = new Set(bookmarks.map((b) => b?.video?.toString()));
  // typw error -------------
  const enrichedResult = result.map((video) => ({
    ...video.toObject(),
    isBookmark: bookmarkVideoIds.has((video as any)._id.toString()),
  }));
  return {
    meta,
    result: enrichedResult,
  };
};

// get single article
const getSingleVideoFromDB = async (profileId: string, id: string) => {
  const video = await Video.findById(id);
  await Video.findByIdAndUpdate(
    id,
    { $inc: { totalView: 1 } },
    { new: true, runValidators: true },
  );
  if (!video) {
    throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
  }
  const bookmarkVideo = await VideoBookmark.findOne({
    video: video._id,
    user: profileId,
  });
  const videoWithBookmarkStatus = {
    ...video.toObject(),
    isBookmarked: !!bookmarkVideo,
  };

  return videoWithBookmarkStatus;
};

// delete video----------------
const deleteVideoFromDB = async (id: string) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
  }

  // delete associated files (video and thumbnail image)
  //!TODO: delete thumbnail and video file--------

  const result = await Video.findByIdAndDelete(id);
  if (video.video) {
    unlinkFile(video.video);
  }
  return result;
};

const VideoService = {
  createVideoIntoDB,
  updateVideoIntoDB,
  getAllVideoFromDB,
  deleteVideoFromDB,
  getSingleVideoFromDB,
};

export default VideoService;
