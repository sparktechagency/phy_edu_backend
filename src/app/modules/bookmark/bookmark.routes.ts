import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import BookmarkController from './bookmark.controller';

const router = express.Router();

router.post(
  '/add-delete-article-bookmark/:id',
  auth(USER_ROLE.user),
  BookmarkController.articleBookmarkAddDelete,
);
router.post(
  '/add-delete-video-bookmark/:id',
  auth(USER_ROLE.user),
  BookmarkController.videoBookmarkAddDelete,
);

router.get(
  '/get-article-bookmark',
  auth(USER_ROLE.user),
  BookmarkController.getAllArticleBookmark,
);
router.get(
  '/get-video-bookmark',
  auth(USER_ROLE.user),
  BookmarkController.getAllVideoBookmark,
);

export const bookmarkRoutes = router;
