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

app.use(express.json());
app.use(cookieParser());
// cors ----------------------
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://192.168.10.33:3003',
      'http://192.168.10.33:3002',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://192.168.12.97:3003',
      'http://localhost:3001',
      'http://192.168.12.97:3002',
      'http://10.0.60.44:3002',
      'http://10.0.60.44:3000/en',
      'http://10.0.60.44:3000',
      'http://10.0.60.44:3003',
      'http://143.198.25.100:3004',
      'http://143.198.25.100:3000',
      'http://143.198.25.100:4173',
    ],
    credentials: true,
  }),
);
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
