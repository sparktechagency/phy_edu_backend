/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response, application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
const app: Application = express();
import multer from 'multer';
import sendContactUsEmail from './app/helper/sendContactUsEmail';
import { handleChunkUpload } from './app/helper/handleChunkVideoUpload';
const upload = multer({ dest: 'uploads/' });
// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use('/uploads', express.static('uploads'));
// application routers ----------------
app.use('/', router);
app.post('/upload-video', upload.single('chunk'), handleChunkUpload);
app.post('/contact-us', sendContactUsEmail);

// global error handler
app.use(globalErrorHandler);
// not found
app.use(notFound);

export default app;
