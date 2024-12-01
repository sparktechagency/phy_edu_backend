import { z } from 'zod';
import { ENUM_GENDER } from '../../utilities/enum';

export const createNormalUserSchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be 6 character' }),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(6, { message: 'Password must be 6 character' }),
    userData: z.object({
      username: z.string().nonempty('Username is required'),
      phone: z.string().optional(),
      email: z.string().email('Invalid email format'),
      profile_image: z.string().optional(),
      dateOfBirth: z.string().optional(),
      gender: z
        .enum(Object.values(ENUM_GENDER) as [string, ...string[]])
        .optional(),
    }),
  }),
});
export const updateNormalUserData = z.object({
  body: z.object({
    username: z.string().optional(),
    phone: z.string().optional(),
    profile_image: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z
      .enum(Object.values(ENUM_GENDER) as [string, ...string[]])
      .optional(),
  }),
});

const normalUserValidations = {
  createNormalUserSchema,
  updateNormalUserData,
};

export default normalUserValidations;
