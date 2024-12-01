import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';

import { bannerRoutes } from '../modules/banner/banner.routes';
import { ManageRoutes } from '../modules/manage-web/manage.routes';
import { feedbackRoutes } from '../modules/feedback/feedback.routes';
import { normalUserRoutes } from '../modules/normalUser/normalUser.routes';
import { superAdminRoutes } from '../modules/superAdmin/superAdmin.routes';
import { videoRoutes } from '../modules/video/video.routes';
import { articleRoutes } from '../modules/article/article.routes';
import { categoryRoutes } from '../modules/category/category.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    router: authRoutes,
  },
  {
    path: '/user',
    router: userRoutes,
  },
  {
    path: '/normal-user',
    router: normalUserRoutes,
  },

  {
    path: '/banner',
    router: bannerRoutes,
  },
  {
    path: '/manage',
    router: ManageRoutes,
  },
  {
    path: '/feedback',
    router: feedbackRoutes,
  },
  {
    path: '/super-admin',
    router: superAdminRoutes,
  },
  {
    path: '/video',
    router: videoRoutes,
  },
  {
    path: '/article',
    router: articleRoutes,
  },
  {
    path: '/category',
    router: categoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
