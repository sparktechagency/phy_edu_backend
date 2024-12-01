/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IVideo } from './video.interface';
import { Video } from './video.model';
import QueryBuilder from '../../builder/QueryBuilder';
import Category from '../category/category.model';
import fs from 'fs/promises';
import path from 'path';
import { VideoBookmark } from '../bookmark/bookmark.model';
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
  return result;
};

// get all videos

const getAllVideoFromDB = async (
  profileId: string,
  query: Record<string, unknown>,
) => {
  const videoQuery = new QueryBuilder(Video.find().lean(), query)
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

  const enrichedResult = result.map((video) => ({
    ...video,
    isBookmark: bookmarkVideoIds.has((video as any)._id.toString()),
  }));
  return {
    meta,
    result: enrichedResult,
  };
};

// get single article

const getSingleVideoFromDB = async (id: string) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
  }
  return video;
};

// delete video----------------
const deleteVideoFromDB = async (id: string) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
  }

  // delete associated files (video and thumbnail image)
  //!TODO: delete thumbnail and video file--------
  const rootPath = process.cwd();
  const videoPath = path.join(rootPath, video.video);
  const thumbnailPath = path.join(rootPath, video.thumbnail_image);

  try {
    // await fs.unlink(videoPath);
    await fs.unlink(thumbnailPath);
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error deleting associated files',
    );
  }

  const result = await Video.findByIdAndDelete(id);
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
