import { z } from 'zod';

const createArticleValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
  }),
});

const updateArticleValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
  }),
});

const articleValidations = {
  createArticleValidationSchema,
  updateArticleValidationSchema,
};

export default articleValidations;
