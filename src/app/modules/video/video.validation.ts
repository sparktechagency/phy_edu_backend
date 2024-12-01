import { z } from 'zod';

const createVideoValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string({ required_error: 'category is required' }),
    thumbnail_image: z
      .string()
      .url('Thumbnail image must be a valid URL')
      .optional(),
    video: z.string({ required_error: 'Video is required' }).optional(),
  }),
});
const updateVideoValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    thumbnail_image: z
      .string()
      .url('Thumbnail image must be a valid URL')
      .optional(),
    video: z.string().optional(),
  }),
});

const videoValidationSchema = {
  createVideoValidationSchema,
  updateVideoValidationSchema,
};

export default videoValidationSchema;
