import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { uploadFile } from '../../helper/fileUploader';
import articleValidations from './article.validation';
import ArticleController from './article.controller';

const router = express.Router();

router.post(
  '/create-article',
  auth(USER_ROLE.superAdmin),
  uploadFile(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(articleValidations.createArticleValidationSchema),
  ArticleController.createArticle,
);

router.patch(
  '/update-article/:id',
  auth(USER_ROLE.superAdmin),
  uploadFile(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(articleValidations.updateArticleValidationSchema),
  ArticleController.updateArticle,
);

router.get('/get-all-article', ArticleController.getAllArticle);
router.get('/single-article/:id', ArticleController.getSingleArticle);
// delete article---
router.delete(
  '/delete-article/:id',
  auth(USER_ROLE.superAdmin),
  ArticleController.deleteArticle,
);

export const articleRoutes = router;
