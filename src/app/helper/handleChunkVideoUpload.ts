/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
// fileUpload.ts
// import fs from 'fs';
// import path from 'path';
// import { Request, Response } from 'express';

// export const handleChunkUpload = (req: Request, res: Response) => {
//   const chunk = req.file;
//   const { originalname, chunkIndex, totalChunks } = req.body;

//   const uploadDir = path.join(process.cwd(), 'uploads/video');
//   const filePath = path.join(uploadDir, originalname);
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   fs.appendFileSync(filePath, fs.readFileSync(chunk?.path as string));

//   fs.unlinkSync(chunk?.path as string);
//   if (chunk) {
//     if (Number(chunkIndex) + 1 === Number(totalChunks)) {
//       return res.json({
//         status: 'completed',
//         message: 'File uploaded successfully!',
//         videoUrl: `/uploads/video/${originalname}`,
//       });
//     } else {
//       return res.json({ status: 'chunkReceived', message: 'Chunk received!' });
//     }
//   } else {
//     return res
//       .status(400)
//       .json({ status: 'error', message: 'No chunk received' });
//   }
// };

import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { Request, Response } from 'express';

export const handleChunkUpload = (req: Request, res: Response) => {
  const chunk = req.file;
  const { originalname, chunkIndex, totalChunks } = req.body;

  const uploadDir = path.join(process.cwd(), 'uploads/video');
  const filePath = path.join(uploadDir, originalname);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Append the chunk to the file------------
  if (chunk) {
    fs.appendFileSync(filePath, fs.readFileSync(chunk?.path as string));

    // Delete the chunk after appending it
    fs.unlinkSync(chunk?.path as string);

    // Check if the last chunk is uploaded
    if (Number(chunkIndex) + 1 === Number(totalChunks)) {
      // Video compression after all chunks are uploaded
      compressVideo(filePath, originalname)
        .then((compressedFilePath) => {
          // Respond with the URL of the compressed video
          return res.json({
            status: 'completed',
            message: 'File uploaded and compressed successfully!',
            videoUrl: `/uploads/video/${compressedFilePath}`,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            status: 'error',
            message: 'Video compression failed',
            error: error.message,
          });
        });
    } else {
      return res.json({ status: 'chunkReceived', message: 'Chunk received!' });
    }
  } else {
    return res
      .status(400)
      .json({ status: 'error', message: 'No chunk received' });
  }
};

// Video compression function
const compressVideo = (
  filePath: string,
  originalname: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const outputFile = path.join(
      process.cwd(),
      'uploads/video',
      `compressed_${originalname}`,
    );

    // Using ffmpeg to compress the video
    ffmpeg(filePath)
      .output(outputFile)
      .videoCodec('libx264') // Use H.264 video codec
      .audioCodec('aac') // Use AAC audio codec
      .size('50%') // Compress the video to 50% of the original size
      .on('end', () => {
        // Delete the original file after compression
        fs.unlinkSync(filePath);
        resolve(outputFile);
      })
      .on('error', (err: any) => {
        reject(err);
      })
      .run();
  });
};
