import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import VideoService from './video.service';

const createVideo = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'thumbnail_image' in files) {
    req.body.thumbnail_image = files['thumbnail_image'][0].path;
  }
  const result = await VideoService.createVideoIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Video created successfully',
    data: result,
  });
});
const updateVideo = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'thumbnail_image' in files) {
    req.body.thumbnail_image = files['thumbnail_image'][0].path;
  }
  const result = await VideoService.updateVideoIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Video updated successfully',
    data: result,
  });
});

// get all videos
const getAllVideo = catchAsync(async (req, res) => {
  const result = await VideoService.getAllVideoFromDB(
    req?.user?.profileId,
    req?.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Videos retrieved successfully',
    data: result,
  });
});

// get single video
const getSingleVideo = catchAsync(async (req, res) => {
  const result = await VideoService.getSingleVideoFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Video retrieved successfully',
    data: result,
  });
});

const deleteVideo = catchAsync(async (req, res) => {
  const result = await VideoService.deleteVideoFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Videos deleted successfully',
    data: result,
  });
});

const VideoController = {
  createVideo,
  updateVideo,
  getAllVideo,
  deleteVideo,
  getSingleVideo,
};

export default VideoController;
