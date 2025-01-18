import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import videoValidationSchema from './video.validation';
import VideoController from './video.controller';
import { uploadFile } from '../../helper/fileUploader';
import simpleAuth from '../../middlewares/simpleAuth';

const router = express.Router();

router.post(
  '/create-video',
  auth(USER_ROLE.superAdmin),
  uploadFile(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(videoValidationSchema.createVideoValidationSchema),
  VideoController.createVideo,
);

router.patch(
  '/update-video/:id',
  auth(USER_ROLE.superAdmin),
  uploadFile(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(videoValidationSchema.updateVideoValidationSchema),
  VideoController.updateVideo,
);

router.get('/get-all-videos', simpleAuth, VideoController.getAllVideo);
router.get('/get-single-video/:id', simpleAuth, VideoController.getSingleVideo);
router.delete('/delete-video/:id', VideoController.deleteVideo);

export const videoRoutes = router;
